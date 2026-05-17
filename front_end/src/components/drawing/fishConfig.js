// ============================================================
// fishConfig.js
// Fish names and model paths from your AppRouter
// ============================================================

export const FISH_CONFIG = {
  "conicaltunicate": {
    label: "Conical Sea Squirt (Koničasti Plaščar)",
    species: "Aplidium conicum",
    model: "/FishModels/conicaltunicate.glb",
    slug: "conicaltunicate",
    color: "#00cfff",
    emoji: "🌊",
    description: "A colonial sea squirt commonly found on rocky coastal habitats.",
  },

  "crnik": {
    label: "Damselfish (Črnik)",
    species: "Mediterranean chromis",
    model: "/FishModels/crnik.glb",
    slug: "crnik",
    color: "#ff6b6b",
    emoji: "🐟",
    description: "A small Mediterranean reef fish often swimming in schools.",
  },

  "blackeyedgrandmother": {
    label: "Longstriped Blenny (Črnoboka babica)",
    species: "Parablennius rouxi",
    model: "/FishModels/blackeyedgrandmother.glb",
    slug: "blackeyedgrandmother",
    color: "#ffd93d",
    emoji: "🐠",
    description: "A blenny species recognized by its elongated striped appearance.",
  },

  "flathead": {
    label: "Flat Head (Ploščata Glava)",
    species: "Triglidae",
    model: "/FishModels/flathead.glb",
    slug: "flathead",
    color: "#6bcb77",
    emoji: "🐡",
    description: "A bottom-dwelling fish with a broad flattened head.",
  },

  "commoncuttlefish": {
    label: "Common Cuttle Fish (Navadna Sipa)",
    species: "Sepia officinalis",
    model: "/FishModels/commoncuttlefish.glb",
    slug: "commoncuttlefish",
    color: "#c77dff",
    emoji: "🦑",
    description: "An intelligent cephalopod known for camouflage abilities.",
  },

  "pisanica": {
    label: "Pisanica",
    species: "Labridae",
    model: "/FishModels/pisanica.glb",
    slug: "pisanica",
    color: "#ff9f43",
    emoji: "🐠",
    description: "A colorful wrasse species commonly found near rocky reefs.",
  },

  "stripedcroaker": {
    label: "Striped Croaker (Progasti Gruntar)",
    species: "Sciaenidae",
    model: "/FishModels/stripedcroaker.glb",
    slug: "stripedcroaker",
    color: "#48dbfb",
    emoji: "🐟",
    description: "A croaker fish distinguished by its striped body pattern.",
  },

  "modrak": {
    label: "Modrak",
    species: "Sparidae",
    model: "/FishModels/modrak.glb",
    slug: "modrak",
    color: "#ff6b9d",
    emoji: "🐬",
    description: "A sea bream species found in coastal Mediterranean waters.",
  },

  "gentlehuntress": {
    label: "Gentle Huntress (Nežna Lovka)",
    species: "Scorpaenidae",
    model: "/FishModels/gentlehuntress.glb",
    slug: "gentlehuntress",
    color: "#54a0ff",
    emoji: "🦂",
    description: "A scorpionfish relative adapted for stealth and ambush hunting.",
  },
};

// ============================================================
// IMPORTANT: Replace with your Teachable Machine model URL
// ============================================================

export const TEACHABLE_MACHINE_URL =
  "https://teachablemachine.withgoogle.com/models/fkLtWAaPu/"; 