import { useEffect, useRef, useState, useCallback } from "react";
import { useParams } from "react-router";import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import modelMap from './assets/modelMap';

export default function FishDetails() {
  const { slug } = useParams();
  const modelPath = modelMap[slug] ?? null;
  const mountRef = useRef(null);
  const frameRef = useRef(null);
  const fishRef = useRef(null);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [modelError, setModelError] = useState(false);
  const [fishData, setFishData] = useState(null);
  const [fetchError, setFetchError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("info");
  
  // Fetch fish info from proxy
  useEffect(() => {
    setLoading(true);
    setFetchError(false);
    setFishData(null);

    fetch(`http://localhost:4000/fish?slug=${slug}`)
      .then((r) => {
        if (!r.ok) throw new Error("Server error");
        return r.json();
      })
      .then((data) => {
        setFishData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setFetchError(true);
        setLoading(false);
      });
  }, [slug]);

  // Three.js scene
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const width = container.clientWidth;
    const height = container.clientHeight;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.01, 1000);
    camera.position.set(0, 0.5, 3);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xfff4e0, 1.2));
    const key = new THREE.DirectionalLight(0xffd580, 2.5);
    key.position.set(3, 4, 3);
    key.castShadow = true;
    scene.add(key);
    const fill = new THREE.DirectionalLight(0x80c8ff, 1.0);
    fill.position.set(-3, 1, -2);
    scene.add(fill);
    const rim = new THREE.DirectionalLight(0xff9040, 0.8);
    rim.position.set(0, -2, -3);
    scene.add(rim);

    let cancelled = false;
    const loader = new GLTFLoader();
    loader.load(
      modelPath,
      (gltf) => {
        if (cancelled) return;
        const model = gltf.scene;
        const box = new THREE.Box3().setFromObject(model);
        const centre = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        model.position.sub(centre);
        model.scale.setScalar(2.0 / maxDim);
        model.traverse((child) => {
          if (child.isMesh) { child.castShadow = true; child.receiveShadow = true; }
        });
        scene.add(model);
        fishRef.current = model;
        setModelLoaded(true);
      },
      undefined,
      (err) => { console.error(err); if (!cancelled) setModelError(true); }
    );

    let t = 0;
    function animate() {
      frameRef.current = requestAnimationFrame(animate);
      t += 0.016;
      if (fishRef.current) {
        fishRef.current.rotation.y = t * 0.6;
        fishRef.current.position.y = Math.sin(t * 0.8) * 0.08;
      }
      renderer.render(scene, camera);
    }
    animate();

    function onResize() {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    window.addEventListener("resize", onResize);

    return () => {
      cancelled = true;
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(frameRef.current);
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, [modelPath]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #05111f; font-family: 'DM Sans', sans-serif; color: #e8dfc8; min-height: 100vh; }

        .page {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: auto 1fr;
          background: linear-gradient(135deg, #05111f 0%, #0a1e35 50%, #071525 100%);
          position: relative;
          overflow: hidden;
        }
        .page::before {
          content: '';
          position: fixed; inset: 0;
          background:
            radial-gradient(ellipse 80% 50% at 20% 80%, rgba(255,165,40,0.06) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 80% 20%, rgba(20,100,180,0.08) 0%, transparent 60%);
          pointer-events: none; z-index: 0;
        }

        .bubbles { position: fixed; inset: 0; pointer-events: none; z-index: 0; overflow: hidden; }
        .bubble { position: absolute; border-radius: 50%; border: 1px solid rgba(255,200,100,0.15); animation: rise linear infinite; }
        @keyframes rise {
          from { transform: translateY(110vh) scale(0.8); opacity: 0.6; }
          to   { transform: translateY(-10vh) scale(1.1); opacity: 0; }
        }

        .header {
          grid-column: 1 / -1;
          padding: 2rem 3rem 0;
          display: flex; align-items: baseline; gap: 1.2rem;
          position: relative; z-index: 2;
        }
        .header-tag {
          font-size: 0.65rem; letter-spacing: 0.25em; text-transform: uppercase;
          color: rgba(255,180,60,0.6); border: 1px solid rgba(255,180,60,0.2);
          padding: 0.3em 0.8em; border-radius: 2px;
        }
        .header-title {
          font-family: 'Playfair Display', serif; font-size: 0.95rem;
          color: rgba(232,223,200,0.4); font-weight: 400;
        }

        .viewport {
          grid-column: 1; grid-row: 2;
          position: relative; z-index: 1; min-height: 520px;
          display: flex; align-items: center; justify-content: center;
        }
        .canvas-wrap { width: 100%; height: 520px; position: relative; }

        .overlay {
          position: absolute; inset: 0;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: 1rem; z-index: 5;
        }
        .fish-loader { font-size: 2.5rem; animation: swim 1.4s ease-in-out infinite; }
        @keyframes swim {
          0%,100% { transform: translateX(-8px) rotate(-5deg); }
          50%      { transform: translateX(8px) rotate(5deg); }
        }
        .overlay-text { font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(255,180,60,0.5); }
        .overlay-hint { font-size: 0.7rem; color: rgba(255,255,255,0.3); margin-top: 0.3rem; }

        .viewport-badge {
          position: absolute; bottom: 2rem; left: 50%; transform: translateX(-50%);
          font-size: 0.6rem; letter-spacing: 0.2em; text-transform: uppercase;
          color: rgba(255,180,60,0.4);
          display: flex; align-items: center; gap: 0.5rem; z-index: 3;
        }
        .viewport-badge::before, .viewport-badge::after {
          content: ''; width: 24px; height: 1px; background: rgba(255,180,60,0.2);
        }

        /* Info panel */
        .info-panel {
          grid-column: 2; grid-row: 2;
          padding: 2.5rem 3rem 2.5rem 2rem;
          display: flex; flex-direction: column; gap: 1.8rem;
          position: relative; z-index: 2; overflow-y: auto;
        }

        .name-block { border-left: 2px solid rgba(255,165,40,0.5); padding-left: 1.2rem; }
        .common-name {
          font-family: 'Playfair Display', serif; font-size: 3rem; font-weight: 700;
          line-height: 1; color: #f5c842; letter-spacing: -0.02em;
        }
        .scientific-name {
          font-family: 'Playfair Display', serif; font-style: italic;
          font-size: 1rem; color: rgba(232,223,200,0.45); margin-top: 0.4rem;
        }
        .slovenian-name {
          font-size: 0.7rem; letter-spacing: 0.1em; color: rgba(232,223,200,0.3);
          margin-top: 0.3rem;
        }

        /* Tabs */
        .tabs { display: flex; gap: 0; border-bottom: 1px solid rgba(255,180,60,0.15); }
        .tab {
          padding: 0.5rem 1.2rem; font-size: 0.65rem; letter-spacing: 0.18em;
          text-transform: uppercase; color: rgba(232,223,200,0.35);
          cursor: pointer; border-bottom: 2px solid transparent;
          margin-bottom: -1px; transition: all 0.2s;
          background: none; border-top: none; border-left: none; border-right: none;
        }
        .tab:hover { color: rgba(232,223,200,0.7); }
        .tab.active { color: #f5c842; border-bottom-color: #f5c842; }

        .tab-content { display: flex; flex-direction: column; gap: 1.4rem; }

        /* Stats grid */
        .stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.7rem 1.5rem; }
        .stat-item { display: flex; flex-direction: column; gap: 0.25rem; }
        .stat-label { font-size: 0.6rem; letter-spacing: 0.18em; text-transform: uppercase; color: rgba(255,180,60,0.5); }
        .stat-value { font-size: 0.88rem; color: rgba(232,223,200,0.9); }

        .divider { height: 1px; background: linear-gradient(90deg, rgba(255,165,40,0.3) 0%, transparent 100%); }

        /* Description */
        .description-text { font-size: 0.85rem; line-height: 1.75; color: rgba(232,223,200,0.65); }

        /* Fun fact */
        .fun-fact {
          background: rgba(255,165,40,0.05); border: 1px solid rgba(255,165,40,0.12);
          border-left: 3px solid rgba(255,165,40,0.4); padding: 1rem 1.2rem;
          border-radius: 0 4px 4px 0;
        }
        .fun-fact-label { font-size: 0.58rem; letter-spacing: 0.22em; text-transform: uppercase; color: rgba(255,165,40,0.5); margin-bottom: 0.5rem; }
        .fun-fact-text { font-size: 0.85rem; line-height: 1.6; color: rgba(232,223,200,0.7); }

        /* Taxonomy */
        .taxonomy { display: flex; flex-direction: column; gap: 0.5rem; }
        .taxon-row { display: flex; justify-content: space-between; align-items: center; padding: 0.4rem 0; border-bottom: 1px solid rgba(255,255,255,0.04); }
        .taxon-rank { font-size: 0.6rem; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(255,180,60,0.4); }
        .taxon-name { font-size: 0.82rem; font-style: italic; color: rgba(232,223,200,0.8); }

        /* Loading skeleton */
        .skeleton { background: rgba(255,255,255,0.05); border-radius: 4px; animation: shimmer 1.5s ease-in-out infinite; }
        @keyframes shimmer { 0%,100% { opacity: 0.4; } 50% { opacity: 0.8; } }

        /* Source link */
        .source-link { font-size: 0.65rem; color: rgba(255,180,60,0.35); text-decoration: none; }
        .source-link:hover { color: rgba(255,180,60,0.7); }

        @media (max-width: 768px) {
          .page { grid-template-columns: 1fr; grid-template-rows: auto auto auto; }
          .header { padding: 1.5rem 1.5rem 0; }
          .viewport { grid-column: 1; grid-row: 2; }
          .canvas-wrap { height: 300px; }
          .info-panel { grid-column: 1; grid-row: 3; padding: 1.5rem; }
          .common-name { font-size: 2.2rem; }
        }
      `}</style>

      <div className="page">
        {/* Bubbles */}
        <div className="bubbles">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="bubble" style={{
              width: `${6 + (i % 4) * 5}px`, height: `${6 + (i % 4) * 5}px`,
              left: `${8 + i * 7.5}%`,
              animationDuration: `${6 + (i % 5) * 2}s`,
              animationDelay: `${(i * 1.1) % 7}s`,
            }} />
          ))}
        </div>

        {/* Header */}
        <header className="header">
          <span className="header-tag">Aquarium</span>
          <span className="header-title">Species Detail</span>
        </header>

        {/* 3D Viewport */}
        <div className="viewport">
          <div className="canvas-wrap" ref={mountRef}>
            {!modelLoaded && !modelError && (
              <div className="overlay">
                <div className="fish-loader">🐠</div>
                <div className="overlay-text">Loading model…</div>
              </div>
            )}
            {modelError && (
              <div className="overlay">
                <div style={{ fontSize: "2rem" }}>🐟</div>
                <div className="overlay-text" style={{ color: "rgba(255,100,100,0.6)" }}>Could not load model</div>
                <div className="overlay-hint">Place your .glb file in /public</div>
              </div>
            )}
          </div>
          <div className="viewport-badge">3D Interactive Model</div>
        </div>

        {/* Info Panel */}
        <aside className="info-panel">
          {/* Name block */}
          <div className="name-block">
            {loading ? (
              <>
                <div className="skeleton" style={{ height: "3rem", width: "70%", marginBottom: "0.5rem" }} />
                <div className="skeleton" style={{ height: "1rem", width: "50%" }} />
              </>
            ) : fetchError ? (
              <p style={{ color: "rgba(255,100,100,0.7)", fontSize: "0.9rem" }}>
                Could not load fish data. Is the proxy server running?<br />
                <code style={{ fontSize: "0.75rem", opacity: 0.6 }}>node server.js</code>
              </p>
            ) : (
              <>
                <h1 className="common-name">{fishData?.commonName}</h1>
                <p className="scientific-name">{fishData?.scientificName}</p>
                <p className="slovenian-name">SL: {fishData?.commonNameSl}</p>
              </>
            )}
          </div>

          {/* Tabs */}
          {!loading && !fetchError && fishData && (
            <>
              <div className="tabs">
                {["info", "description", "taxonomy"].map((tab) => (
                  <button key={tab} className={`tab ${activeTab === tab ? "active" : ""}`} onClick={() => setActiveTab(tab)}>
                    {tab}
                  </button>
                ))}
              </div>

              <div className="tab-content">
                {activeTab === "info" && (
                  <>
                    <div className="stats-grid">
                      {[
                        ["Size", fishData.size],
                        ["Habitat", fishData.habitat],
                        ["Diet", "Carnivore"],
                        ["Source", "yoursea.org"],
                      ].map(([label, value]) => (
                        <div className="stat-item" key={label}>
                          <span className="stat-label">{label}</span>
                          <span className="stat-value">{value}</span>
                        </div>
                      ))}
                    </div>

                    <div className="divider" />

                    {fishData.behaviour && (
                      <div className="fun-fact">
                        <div className="fun-fact-label">✦ Behaviour</div>
                        <p className="fun-fact-text">{fishData.behaviour}</p>
                      </div>
                    )}

                    {fishData.funFact && (
                      <div className="fun-fact">
                        <div className="fun-fact-label">✦ Did you know</div>
                        <p className="fun-fact-text">{fishData.funFact}</p>
                      </div>
                    )}

                    <a href={fishData.sourceUrl} target="_blank" rel="noreferrer" className="source-link">
                      ↗ View original source (yoursea.org)
                    </a>
                  </>
                )}

                {activeTab === "description" && (
                  <p className="description-text">{fishData.description || "No description available."}</p>
                )}

                {activeTab === "taxonomy" && (
                  <div className="taxonomy">
                    {[
                      ["Kingdom", "Animalia"],
                      ["Phylum", "Chordata"],
                      ["Class", "Teleostei"],
                      ["Order", "Perciformes"],
                      ["Family", "Serranidae"],
                      ["Species", fishData.scientificName],
                    ].map(([rank, name]) => (
                      <div className="taxon-row" key={rank}>
                        <span className="taxon-rank">{rank}</span>
                        <span className="taxon-name">{name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </aside>
      </div>
    </>
  );
}
