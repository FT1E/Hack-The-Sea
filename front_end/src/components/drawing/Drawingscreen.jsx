// ============================================================
// DrawingScreen.jsx
// Drop this in: src/pages/DrawingScreen.jsx
//
// Dependencies to install:
//   npm install @react-three/fiber @react-three/drei @tensorflow/tfjs @teachablemachine/image
//
// Then add a route in your App.jsx / router:
//   <Route path="/draw/:fishId" element={<DrawingScreen />} />
// ============================================================

import { useEffect, useRef, useState, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { FISH_CONFIG, TEACHABLE_MACHINE_URL } from "./fishConfig";
import "./DrawingScreen.css";
import { Box3, Vector3 } from "three";

// ─── Constants ────────────────────────────────────────────────
const BRUSH_COLORS = ["#1a1a2e", "#e63946", "#f4a261", "#2a9d8f", "#457b9d", "#6d4c41", "#ffffff"];
const BRUSH_SIZES  = [4, 8, 14, 22];
const PEEK_OPACITY_IDLE   = 0.12;
const PEEK_OPACITY_ACTIVE = 0.50;

// ─── Fish 3D model sub-component ─────────────────────────────
// Isolated so useGLTF and useFrame live inside the Canvas context.
function FishModel({ modelPath }) {
  const groupRef = useRef();
  const { scene } = useGLTF(modelPath);

  useEffect(() => {
    if (!scene) return;

    // Now uses the top-level imports instead of require()
    const box    = new Box3().setFromObject(scene);
    const centre = box.getCenter(new Vector3());
    const size   = box.getSize(new Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale  = 1.8 / maxDim;
    scene.scale.setScalar(scale);
    scene.position.sub(centre.multiplyScalar(scale));

    scene.traverse((child) => {
      if (child.isMesh) {
        child.material = child.material.clone();
        child.material.transparent = true;
        child.material.opacity = 1;
      }
    });
  }, [scene]);

  useFrame(() => {
    if (groupRef.current) groupRef.current.rotation.y += 0.006;
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  );
}

// ─── Component ────────────────────────────────────────────────
export default function DrawingScreen() {
  const fishId = new URLSearchParams(window.location.search).get("fish")
    || window.location.pathname.split("/").pop()
    || "Fish1";

  const fish = FISH_CONFIG[fishId] || Object.values(FISH_CONFIG)[0];

  // ── Canvas refs ────────────────────────────────────────────
  const drawCanvasRef = useRef(null);

  // ── Drawing state ─────────────────────────────────────────
  const isDrawingRef  = useRef(false);
  const lastPointRef  = useRef(null);
  const [brushColor, setBrushColor] = useState("#1a1a2e");
  const [brushSize,  setBrushSize]  = useState(8);
  const [isEraser,   setIsEraser]   = useState(false);

  // ── Peek / AI state ───────────────────────────────────────
  const [isPeeking,     setIsPeeking]     = useState(false);
  const [tmModel,       setTmModel]       = useState(null);
  const [modelLoading,  setModelLoading]  = useState(false);
  const [isIdentifying, setIsIdentifying] = useState(false);
  const [result,        setResult]        = useState(null);
  const [showResult,    setShowResult]    = useState(false);

  // ── Canvas size ───────────────────────────────────────────
  const CANVAS_SIZE = Math.min(
    typeof window !== "undefined" ? Math.floor(window.innerWidth  * 0.82) : 500,
    typeof window !== "undefined" ? Math.floor(window.innerHeight * 0.60) : 500,
    520
  );

  // ──────────────────────────────────────────────────────────
  // 1. Initialise drawing canvas (white background for AI)
  // ──────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = drawCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }, [CANVAS_SIZE]);

  // ── Drawing helpers ────────────────────────────────────────
  const getPos = (e, canvas) => {
    const rect   = canvas.getBoundingClientRect();
    const scaleX = canvas.width  / rect.width;
    const scaleY = canvas.height / rect.height;
    const touch  = e.touches ? e.touches[0] : e;
    return {
      x: (touch.clientX - rect.left) * scaleX,
      y: (touch.clientY - rect.top)  * scaleY,
    };
  };

  const startDraw = useCallback((e) => {
    e.preventDefault();
    const canvas = drawCanvasRef.current;
    const ctx    = canvas.getContext("2d");
    const pos    = getPos(e, canvas);
    isDrawingRef.current = true;
    lastPointRef.current = pos;
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, (isEraser ? brushSize * 2 : brushSize) / 2, 0, Math.PI * 2);
    ctx.fillStyle = isEraser ? "#ffffff" : brushColor;
    ctx.fill();
  }, [brushColor, brushSize, isEraser]);

  const draw = useCallback((e) => {
    e.preventDefault();
    if (!isDrawingRef.current) return;
    const canvas = drawCanvasRef.current;
    const ctx    = canvas.getContext("2d");
    const pos    = getPos(e, canvas);
    const last   = lastPointRef.current;
    ctx.beginPath();
    ctx.moveTo(last.x, last.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = isEraser ? "#ffffff" : brushColor;
    ctx.lineWidth   = isEraser ? brushSize * 2 : brushSize;
    ctx.lineCap     = "round";
    ctx.lineJoin    = "round";
    ctx.stroke();
    lastPointRef.current = pos;
  }, [brushColor, brushSize, isEraser]);

  const stopDraw = useCallback(() => {
    isDrawingRef.current = false;
    lastPointRef.current = null;
  }, []);

  const clearCanvas = useCallback(() => {
    const canvas = drawCanvasRef.current;
    const ctx    = canvas.getContext("2d");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setResult(null);
    setShowResult(false);
  }, []);

  // ──────────────────────────────────────────────────────────
  // 2. Teachable Machine — lazy load
  // ──────────────────────────────────────────────────────────
  const loadTMModel = useCallback(async () => {
    if (tmModel || modelLoading) return tmModel;
    setModelLoading(true);
    try {
      const tmImage  = await import("@teachablemachine/image");
      const loaded   = await tmImage.load(
        TEACHABLE_MACHINE_URL + "model.json",
        TEACHABLE_MACHINE_URL + "metadata.json"
      );
      setTmModel(loaded);
      setModelLoading(false);
      return loaded;
    } catch (err) {
      console.error("Teachable Machine load error:", err);
      setModelLoading(false);
      return null;
    }
  }, [tmModel, modelLoading]);

  // ──────────────────────────────────────────────────────────
  // 3. Identify the drawing
  // ──────────────────────────────────────────────────────────
  const identify = useCallback(async () => {
    setIsIdentifying(true);
    setShowResult(false);
    const model = tmModel || await loadTMModel();
    if (!model) {
      alert("Could not load the AI model. Check your Teachable Machine URL in fishConfig.js.");
      setIsIdentifying(false);
      return;
    }
    try {
      const predictions = await model.predict(drawCanvasRef.current);
      const sorted = [...predictions].sort((a, b) => b.probability - a.probability);
      const top    = sorted[0];
      setResult({
        fishId:     top.className,
        confidence: Math.round(top.probability * 100),
        allGuesses: sorted.slice(0, 3).map((p) => ({
          fishId:     p.className,
          confidence: Math.round(p.probability * 100),
        })),
      });
      setShowResult(true);
    } catch (err) {
      console.error("Prediction error:", err);
      alert("Something went wrong with the identification. Try again!");
    }
    setIsIdentifying(false);
  }, [tmModel, loadTMModel]);

  // ── Peek handlers ─────────────────────────────────────────
  const onPeekStart = (e) => { e.preventDefault(); setIsPeeking(true);  };
  const onPeekEnd   = (e) => { e.preventDefault(); setIsPeeking(false); };

  const resultFish = result ? (FISH_CONFIG[result.fishId] || fish) : null;

  // ──────────────────────────────────────────────────────────
  // Render
  // ──────────────────────────────────────────────────────────
  return (
    <div className="ds-root">
      {/* Animated bubbles background */}
      <div className="ds-bubbles" aria-hidden="true">
        {[...Array(12)].map((_, i) => <span key={i} className="ds-bubble" />)}
      </div>

      {/* Header */}
      <header className="ds-header">
        <div className="ds-header-text">
          <p className="ds-header-sub">Draw the</p>
          <h1 className="ds-header-title">{fish.label}</h1>
        </div>
      </header>

      {/* ── Canvas row — 3-D model panel + drawing panel side by side ── */}
      <div className="ds-canvas-wrapper">

        {/* Panel 1 — R3F ghost model */}
        <div
          className="ds-three-panel"
          style={{ width: CANVAS_SIZE, height: CANVAS_SIZE }}
        >
          <div
            className="ds-three-canvas"
            style={{
              opacity: isPeeking ? PEEK_OPACITY_ACTIVE : PEEK_OPACITY_IDLE,
              transition: isPeeking ? "opacity 0.15s ease-out" : "opacity 0.35s ease-in",
            }}
          >
            <Canvas
              camera={{ position: [0, 0, 3], fov: 45 }}
              gl={{ alpha: true, antialias: true }}
              style={{ background: "transparent" }}
            >
              <ambientLight intensity={0.6} />
              <directionalLight position={[2, 2, 3]} intensity={1.2} />
              <FishModel modelPath={fish.model} />
              <OrbitControls enabled={false} />
            </Canvas>
          </div>
          <div className="ds-canvas-border" />
        </div>

        {/* Panel 2 — Drawing canvas */}
        <div
          className="ds-draw-panel"
          style={{ width: CANVAS_SIZE, height: CANVAS_SIZE }}
        >
          <canvas
            ref={drawCanvasRef}
            width={CANVAS_SIZE}
            height={CANVAS_SIZE}
            className="ds-draw-canvas"
            onMouseDown={startDraw}
            onMouseMove={draw}
            onMouseUp={stopDraw}
            onMouseLeave={stopDraw}
            onTouchStart={startDraw}
            onTouchMove={draw}
            onTouchEnd={stopDraw}
          />
          <div className="ds-canvas-border" />
        </div>

      </div>

      {/* Toolbar */}
      <div className="ds-toolbar">
        <div className="ds-tool-group">
          <span className="ds-tool-label">Color</span>
          <div className="ds-colors">
            {BRUSH_COLORS.map((c) => (
              <button
                key={c}
                className={`ds-color-btn ${brushColor === c && !isEraser ? "active" : ""}`}
                style={{ "--c": c }}
                onClick={() => { setBrushColor(c); setIsEraser(false); }}
                aria-label={`Color ${c}`}
              />
            ))}
          </div>
        </div>

        <div className="ds-tool-group">
          <span className="ds-tool-label">Size</span>
          <div className="ds-sizes">
            {BRUSH_SIZES.map((s) => (
              <button
                key={s}
                className={`ds-size-btn ${brushSize === s && !isEraser ? "active" : ""}`}
                onClick={() => { setBrushSize(s); setIsEraser(false); }}
                aria-label={`Brush size ${s}`}
              >
                <span style={{ width: s * 0.9, height: s * 0.9 }} />
              </button>
            ))}
          </div>
        </div>

        <div className="ds-tool-group ds-tool-group--right">
          <button
            className={`ds-eraser-btn ${isEraser ? "active" : ""}`}
            onClick={() => setIsEraser((v) => !v)}
          >
            🧹 Eraser
          </button>
          <button className="ds-clear-btn" onClick={clearCanvas}>
            🗑️ Clear
          </button>
        </div>
      </div>

      {/* Peek button */}
      <button
        className={`ds-peek-btn ${isPeeking ? "peeking" : ""}`}
        onPointerDown={onPeekStart}
        onPointerUp={onPeekEnd}
        onPointerLeave={onPeekEnd}
        onPointerCancel={onPeekEnd}
        aria-label="Hold to see the fish"
      >
        <span className="ds-peek-icon">{isPeeking ? "👁️" : "👉"}</span>
        <span>{isPeeking ? "Seeing the fish…" : "Hold to peek!"}</span>
      </button>

      {/* Identify button */}
      <button
        className={`ds-identify-btn ${isIdentifying ? "loading" : ""}`}
        onClick={identify}
        disabled={isIdentifying}
      >
        {isIdentifying ? "🔍 Thinking…" : modelLoading ? "⏳ Loading AI…" : "✨ What fish is this?"}
      </button>

      {/* Result overlay */}
      {showResult && resultFish && (
        <div className="ds-result-overlay" onClick={() => setShowResult(false)}>
          <div
            className="ds-result-card"
            style={{ "--fish-color": resultFish.color }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="ds-result-emoji">{resultFish.emoji}</div>
            <h2 className="ds-result-title">
              {result.confidence >= 60 ? `It's a ${resultFish.label}!` : `Maybe a ${resultFish.label}?`}
            </h2>
            <div className="ds-result-confidence">
              <div className="ds-confidence-bar">
                <div className="ds-confidence-fill" style={{ width: `${result.confidence}%` }} />
              </div>
              <span>{result.confidence}% sure</span>
            </div>

            {result.allGuesses.length > 1 && (
              <div className="ds-other-guesses">
                <p className="ds-guesses-label">Other possibilities:</p>
                {result.allGuesses.slice(1).map((g) => {
                  const gFish = FISH_CONFIG[g.fishId];
                  return gFish ? (
                    <div key={g.fishId} className="ds-guess-row">
                      <span>{gFish.emoji} {gFish.label}</span>
                      <span>{g.confidence}%</span>
                    </div>
                  ) : null;
                })}
              </div>
            )}

            <p className="ds-result-desc">{resultFish.description}</p>

            <div className="ds-result-actions">
              <button
                className="ds-result-view-btn"
                style={{ "--fish-color": resultFish.color }}
                onClick={() => { window.location.href = `/fish/${result.fishId}`; }}
              >
                🐟 See full 3D model!
              </button>
              <button
                className="ds-result-again-btn"
                onClick={() => { setShowResult(false); clearCanvas(); }}
              >
                Draw again
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}