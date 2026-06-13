/**
 * main.js – Lógica de pantalla principal
 */

document.addEventListener("DOMContentLoaded", function () {
  buildCardGrid();
});

function buildCardGrid() {
  const grid = document.getElementById("card-grid");
  if (!grid) return;

  const modules = getStoredData("gerdau-modules", TRAINING_MODULES);

  grid.innerHTML = "";
  modules.forEach(mod => {
    const a = document.createElement("a");
    a.href = `capacitaciones/${mod.id}.html`;
    a.className = "module-card";
    a.innerHTML = `
      <div class="card-icon">${mod.icon}</div>
      <div class="card-name">${mod.name}</div>
      <span class="card-arrow">→</span>
    `;
    grid.appendChild(a);
  });
}

// ---- Toast utility ----
function showToast(msg) {
  let toast = document.getElementById("global-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "global-toast";
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove("show"), 2800);
}
