export function renderAlertGuide(level, value) {
  document.getElementById("water-level").textContent = value.toFixed(2) + " m";

  const txt = document.getElementById("alert-level");
  const desc = document.getElementById("alert-description");

  const presets = {
    green: {
      title: "LEVEL 1 GREEN — SAFE",
      color: "text-green-600",
      desc: "The river is normal. No immediate danger."
    },
    yellow: {
      title: "LEVEL 2 YELLOW — CAUTION",
      color: "text-yellow-600",
      desc: "Water level is rising. Stay alert."
    },
    orange: {
      title: "LEVEL 3 ORANGE — PREPARE",
      color: "text-orange-600",
      desc: "Flooding possible. Ready to evacuate."
    },
    red: {
      title: "LEVEL 4 RED — EVACUATE NOW!",
      color: "text-red-600",
      desc: "Critical flood level. Evacuate immediately."
    }
  };

  txt.className = "text-lg font-semibold " + presets[level].color;
  txt.textContent = presets[level].title;
  desc.textContent = presets[level].desc;
}
