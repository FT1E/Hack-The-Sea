import { useState } from "react";

const FISH = [
  {
    id: "modrak",
    name: "Modra",
    species: "Blotched Picarel",
    emoji: "🐟",
    color: "#1a8fcb",
    sos: "The sea is changing. I keep getting lost.",
    pos: { top: "78%", left: "72%" },
    questions: [
      {
        q: "What causes ocean acidification?",
        options: [
          "Chemicals dumped by factories",
          "CO₂ dissolving into seawater",
          "Too much sunlight on the ocean",
          "Overfishing removing key species",
        ],
        correct: 1,
        fact: "The ocean absorbs ~30% of all CO₂ humans release. It turns into carbonic acid, lowering the ocean's pH and disrupting chemical signals fish depend on.",
      },
      {
        q: "How do fish like Modra find their shoal?",
        options: [
          "By following the current",
          "By colour recognition",
          "By chemical smell signals in the water",
          "By echolocation like bats",
        ],
        correct: 2,
        fact: "Fish use chemical cues dissolved in water to recognise family and find their group. Ocean acidification disrupts these signals, causing fish to get lost.",
      },
      {
        q: "What is a 'shoal' of fish?",
        options: [
          "A fish nest on the seabed",
          "A group of fish swimming together",
          "A shallow sandy area of the sea",
          "A type of fish migration route",
        ],
        correct: 1,
        fact: "A shoal is a social group of fish. Swimming together confuses predators — a hundred fish moving as one is much harder to target than a single fish.",
      },
    ],
  },
  {
    id: "crnik",
    name: "Črnko",
    species: "Saddled Bream",
    emoji: "🐠",
    color: "#2aaa7a",
    sos: "The rocks where I lay my eggs are disappearing.",
    pos: { top: "58%", left: "32%" },
    questions: [
      {
        q: "What does the black spot on Črnko's tail do?",
        options: [
          "Attracts mates during spawning",
          "Confuses predators about which end is the head",
          "Absorbs sunlight for warmth",
          "Signals danger to other fish",
        ],
        correct: 1,
        fact: "False eye spots near the tail trick predators into attacking the wrong end — giving the fish a split second to escape in the other direction.",
      },
      {
        q: "What is overfishing?",
        options: [
          "Fishing in water that is too deep",
          "Using too large a fishing boat",
          "Catching fish faster than they can reproduce",
          "Fishing during bad weather",
        ],
        correct: 2,
        fact: "When fish are caught faster than they can breed, populations collapse. This affects the entire food web — predators starve, prey species explode.",
      },
      {
        q: "What is a Marine Protected Area?",
        options: [
          "A zone where only tourists can swim",
          "An area where fishing is restricted so ecosystems can recover",
          "A military zone off-limits to all boats",
          "An underwater museum for shipwrecks",
        ],
        correct: 1,
        fact: "Inside MPAs, fish populations recover and biodiversity increases. Fish even 'spill over' into surrounding areas, benefiting local fishermen.",
      },
    ],
  },
  {
    id: "blackeyedgrandmother",
    name: "Baka",
    species: "Black-eyed Wrasse",
    emoji: "🐡",
    color: "#a04060",
    sos: "I've lived here 18 years. The sea is warmer every summer.",
    pos: { top: "60%", left: "14%" },
    questions: [
      {
        q: "How does climate change affect where fish live?",
        options: [
          "Fish grow faster so they don't need to move",
          "Fish shift toward the poles to stay in cooler water",
          "Fish migrate to the equator where food is richer",
          "Marine species are unaffected by temperature",
        ],
        correct: 1,
        fact: "Marine species are shifting their ranges toward the poles at ~72km per decade — faster than land animals. Species that can't move get left behind.",
      },
      {
        q: "Why is the Mediterranean warming faster than other seas?",
        options: [
          "It is shallower than other seas",
          "It has more ships creating engine heat",
          "It is a semi-enclosed sea with less mixing from cold ocean currents",
          "Mediterranean countries burn more fossil fuels",
        ],
        correct: 2,
        fact: "The Mediterranean warms 20% faster than the global ocean average. As a semi-enclosed sea it doesn't benefit from the same cold-water circulation as open oceans.",
      },
      {
        q: "Why do older fish matter for conservation?",
        options: [
          "They produce more offspring than young fish",
          "They carry knowledge of migration routes and food locations",
          "They are immune to disease",
          "They look more impressive to tourists",
        ],
        correct: 1,
        fact: "Old fish carry irreplaceable ecological knowledge. Old females also produce more and higher-quality eggs. Losing the oldest fish means losing the species' memory.",
      },
    ],
  },
  {
    id: "gentlehuntress",
    name: "Lovka",
    species: "European Sea Bass",
    emoji: "🦈",
    color: "#2c5f7a",
    sos: "I am the sea wolf. Wild ones like me are almost gone.",
    pos: { top: "43%", left: "70%" },
    questions: [
      {
        q: "What does 'sustainable fishing' mean?",
        options: [
          "Only fishing on certain days of the week",
          "Catching fish at rates that allow populations to naturally replenish",
          "Using only wooden boats with no engines",
          "Eating only fish from supermarkets",
        ],
        correct: 1,
        fact: "Sustainable fishing means not catching more than a population can replace, using gear that minimises damage, and respecting size and season limits.",
      },
      {
        q: "Why are apex predators like sea bass important?",
        options: [
          "They produce nutrients when they die",
          "They scare away invasive species",
          "They control prey populations, keeping the ecosystem balanced",
          "Their sharp teeth cut through fishing nets",
        ],
        correct: 2,
        fact: "Remove apex predators and prey species explode, eating all the plankton, collapsing the whole food web. This is called a 'trophic cascade.'",
      },
      {
        q: "What percentage of sea bass sold in restaurants is now farmed?",
        options: ["Around 20%", "Around 50%", "Around 75%", "Around 90%"],
        correct: 3,
        fact: "Wild sea bass has become so rare that ~90% sold today is farmed. Responsible aquaculture reduces pressure on wild populations — but wild fish still play a vital ecological role.",
      },
    ],
  },
];

export default function OceanGame() {
  const [activeFish, setActiveFish] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showFact, setShowFact] = useState(false);
  const [solved, setSolved] = useState([]);

  const openQuiz = (fish) => {
    if (solved.includes(fish.id)) return;
    setActiveFish(fish);
    setQuestionIndex(0);
    setSelected(null);
    setShowFact(false);
  };

  const handleAnswer = (idx) => {
    if (selected !== null) return;
    setSelected(idx);
    setShowFact(true);
  };

  const handleNext = () => {
    const isLast = questionIndex === activeFish.questions.length - 1;
    if (isLast) {
      setSolved((s) => [...s, activeFish.id]);
      setActiveFish(null);
    } else {
      setQuestionIndex((i) => i + 1);
      setSelected(null);
      setShowFact(false);
    }
  };

  const currentQ = activeFish ? activeFish.questions[questionIndex] : null;
  const allSolved = solved.length === FISH.length;

  return (
    // ── Outer wrapper fills the whole page ──────────────────────────
    <div style={s.page}>

      {/*
        ── KEY FIX: this inner container is position:relative
           The iframe AND the labels are both children of this div.
           So label percentages are always relative to the iframe area,
           not the whole browser window — works in both normal & fullscreen.
      */}
      <div style={s.gameContainer}>

        {/* Unity iframe */}
        <iframe
          id="unity-frame"
          src="/unity-build/index.html"
          style={s.iframe}
          title="Unity Ocean"
          allow="fullscreen"
        />

        {/* Floating fish labels — positioned inside gameContainer */}
        {FISH.map((fish) => {
          const isSolved = solved.includes(fish.id);
          return (
            <button
              key={fish.id}
              style={{
                ...s.label,
                top: fish.pos.top,
                left: fish.pos.left,
                borderColor: fish.color,
                background: isSolved
                  ? "rgba(30,180,100,0.85)"
                  : "rgba(0,20,40,0.75)",
                cursor: isSolved ? "default" : "pointer",
                animation: isSolved ? "none" : "pulse 2s infinite",
              }}
              onClick={() => openQuiz(fish)}
            >
              <span style={{ fontSize: 16 }}>{fish.emoji}</span>
              <span style={s.labelName}>{fish.name}</span>
              {isSolved
                ? <span style={s.solvedTick}>✓</span>
                : <span style={{ ...s.sosBadge, background: fish.color }}>SOS</span>
              }
            </button>
          );
        })}

        {/* Progress counter — inside gameContainer so it stays on the scene */}
        <div style={s.counter}>
          {solved.length} / {FISH.length} helped
        </div>

        {/* All solved banner */}
        {allSolved && (
          <div style={s.allSolvedBanner}>
            🌊 You saved all creatures! The Adriatic thanks you.
          </div>
        )}

        {/* Quiz overlay — also inside gameContainer */}
        {activeFish && currentQ && (
          <div style={s.overlay}>
            <div style={{ ...s.modal, borderTop: `4px solid ${activeFish.color}` }}>

              <div style={s.modalHeader}>
                <span style={{ fontSize: 28 }}>{activeFish.emoji}</span>
                <div>
                  <div style={s.modalName}>{activeFish.name}</div>
                  <div style={s.modalSpecies}>{activeFish.species}</div>
                </div>
                <button style={s.closeBtn} onClick={() => setActiveFish(null)}>✕</button>
              </div>

              <div style={{ ...s.sosBox, borderColor: activeFish.color, color: activeFish.color }}>
                "{activeFish.sos}"
              </div>

              <div style={s.dots}>
                {activeFish.questions.map((_, i) => (
                  <div key={i} style={{
                    ...s.dot,
                    background: i < questionIndex ? "#28a745" : i === questionIndex ? activeFish.color : "#ddd",
                  }} />
                ))}
                <span style={s.dotsLabel}>{questionIndex + 1} / {activeFish.questions.length}</span>
              </div>

              <div style={s.question}>{currentQ.q}</div>

              {currentQ.options.map((opt, i) => {
                const isCorrect = i === currentQ.correct;
                const isSelected = i === selected;
                let bg = "#f8f9fa", border = "1.5px solid #dee2e6", color = "#333";
                if (selected !== null) {
                  if (isCorrect) { bg = "#d4edda"; border = "1.5px solid #28a745"; color = "#155724"; }
                  else if (isSelected) { bg = "#f8d7da"; border = "1.5px solid #dc3545"; color = "#721c24"; }
                }
                return (
                  <button key={i} style={{ ...s.option, background: bg, border, color }} onClick={() => handleAnswer(i)}>
                    <span style={s.optLetter}>{["A","B","C","D"][i]}</span>
                    {opt}
                    {selected !== null && isCorrect && <span style={{ marginLeft: "auto" }}>✓</span>}
                    {isSelected && !isCorrect && <span style={{ marginLeft: "auto" }}>✗</span>}
                  </button>
                );
              })}

              {showFact && (
                <div style={{ ...s.fact, borderColor: activeFish.color }}>
                  <div style={{ ...s.factTitle, color: activeFish.color }}>🔬 Did you know?</div>
                  <div style={s.factText}>{currentQ.fact}</div>
                  <button style={{ ...s.nextBtn, background: activeFish.color }} onClick={handleNext}>
                    {questionIndex < activeFish.questions.length - 1 ? "Next question →" : "✓ Mark as helped"}
                  </button>
                </div>
              )}

            </div>
          </div>
        )}

      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(255,255,255,0.4); }
          50% { box-shadow: 0 0 0 8px rgba(255,255,255,0); }
        }
      `}</style>
    </div>
  );
}

const s = {
  // Fills the whole viewport
  page: {
    width: "100vw",
    height: "100vh",
    overflow: "hidden",
    background: "#000",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
  },
  // This is the key: position relative so children use THIS as their offset parent
  gameContainer: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
  iframe: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    border: "none",
  },
  label: {
    position: "absolute",      // relative to gameContainer, not the page
    display: "flex",
    alignItems: "center",
    gap: 6,
    padding: "7px 12px",
    borderRadius: 99,
    border: "1.5px solid",
    color: "#fff",
    fontSize: 13,
    fontWeight: 600,
    backdropFilter: "blur(6px)",
    transition: "transform 0.15s, background 0.3s",
    transform: "translate(-50%, -50%)",
    whiteSpace: "nowrap",
    zIndex: 10,
  },
  labelName: { fontSize: 13 },
  sosBadge: {
    fontSize: 10, fontWeight: 700,
    padding: "2px 6px", borderRadius: 99,
    color: "#fff", letterSpacing: "0.05em",
  },
  solvedTick: { fontSize: 14, color: "#fff" },
  counter: {
    position: "absolute", top: 16, right: 16,
    background: "rgba(0,20,40,0.75)", color: "#fff",
    padding: "6px 14px", borderRadius: 99,
    fontSize: 13, fontWeight: 600,
    backdropFilter: "blur(6px)", zIndex: 10,
  },
  allSolvedBanner: {
    position: "absolute", bottom: 32, left: "50%",
    transform: "translateX(-50%)",
    background: "rgba(20,160,80,0.9)", color: "#fff",
    padding: "12px 28px", borderRadius: 99,
    fontSize: 15, fontWeight: 700,
    backdropFilter: "blur(8px)", zIndex: 10,
  },
  overlay: {
    position: "absolute", inset: 0,
    background: "rgba(0,20,40,0.6)",
    display: "flex", alignItems: "center", justifyContent: "center",
    padding: 16, backdropFilter: "blur(4px)", zIndex: 100,
  },
  modal: {
    background: "#fff", borderRadius: 16,
    width: "100%", maxWidth: 520, maxHeight: "88vh", overflowY: "auto",
    padding: 24, boxShadow: "0 24px 80px rgba(0,40,80,0.45)",
  },
  modalHeader: { display: "flex", alignItems: "center", gap: 12, marginBottom: 14 },
  modalName: { fontWeight: 700, fontSize: 17, color: "#1a2a3a" },
  modalSpecies: { fontSize: 12, color: "#888", fontStyle: "italic" },
  closeBtn: {
    marginLeft: "auto", background: "none", border: "none",
    fontSize: 18, cursor: "pointer", color: "#aaa", padding: "0 4px",
  },
  sosBox: {
    fontSize: 13, fontStyle: "italic", lineHeight: 1.6,
    padding: "10px 14px", borderRadius: 8, border: "1.5px solid",
    background: "#f8fbff", marginBottom: 16,
  },
  dots: { display: "flex", alignItems: "center", gap: 6, marginBottom: 14 },
  dot: { width: 10, height: 10, borderRadius: "50%", transition: "background 0.3s" },
  dotsLabel: { fontSize: 12, color: "#888", marginLeft: 4 },
  question: {
    fontSize: 15, fontWeight: 600, color: "#1a2a3a",
    lineHeight: 1.5, marginBottom: 12,
  },
  option: {
    display: "flex", alignItems: "center", gap: 10,
    width: "100%", padding: "11px 14px", borderRadius: 8,
    fontSize: 14, cursor: "pointer", textAlign: "left",
    marginBottom: 8, transition: "all 0.15s", lineHeight: 1.4,
  },
  optLetter: {
    width: 26, height: 26, borderRadius: "50%",
    background: "rgba(0,0,0,0.07)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 12, fontWeight: 700, flexShrink: 0,
  },
  fact: {
    background: "#f0fbf6", border: "1.5px solid",
    borderRadius: 10, padding: 14, marginTop: 6,
  },
  factTitle: { fontWeight: 700, fontSize: 13, marginBottom: 6 },
  factText: { fontSize: 13, color: "#333", lineHeight: 1.7, marginBottom: 12 },
  nextBtn: {
    color: "#fff", border: "none", borderRadius: 8,
    padding: "10px 20px", fontSize: 14, fontWeight: 600,
    cursor: "pointer", width: "100%",
  },
};
