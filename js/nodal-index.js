(function () {
  const SVG_NS = "http://www.w3.org/2000/svg";
  const CX = 450, CY = 340, RADIUS = 230;

  function buildNodalMap() {
    const linesLayer = document.getElementById("lines-layer");
    const nodesLayer = document.getElementById("nodes-layer");
    if (!linesLayer || !nodesLayer) return;

    const modules = getStoredData("gerdau-modules", TRAINING_MODULES);
    const total = modules.length;

    modules.forEach((mod, i) => {
      const angle = (2 * Math.PI * i / total) - Math.PI / 2;
      const nx = CX + RADIUS * Math.cos(angle);
      const ny = CY + RADIUS * Math.sin(angle);

      const line = document.createElementNS(SVG_NS, "line");
      line.setAttribute("x1", CX); line.setAttribute("y1", CY);
      line.setAttribute("x2", nx); line.setAttribute("y2", ny);
      linesLayer.appendChild(line);

      const g = document.createElementNS(SVG_NS, "g");
      g.setAttribute("class", "node-group");
      g.setAttribute("tabindex", "0");
      g.setAttribute("cursor", "pointer");

      const circle = document.createElementNS(SVG_NS, "circle");
      circle.setAttribute("cx", nx); circle.setAttribute("cy", ny);
      circle.setAttribute("r", 62);
      circle.setAttribute("fill", "#002855");
      circle.setAttribute("stroke", "#FFB800");
      circle.setAttribute("stroke-width", "2.5");
      circle.setAttribute("class", "node-circle");

      const icon = document.createElementNS(SVG_NS, "text");
      icon.setAttribute("x", nx); icon.setAttribute("y", ny - 6);
      icon.setAttribute("text-anchor", "middle");
      icon.setAttribute("dominant-baseline", "middle");
      icon.setAttribute("font-size", "26");
      icon.textContent = mod.icon;

      const words = mod.name.split(" ");
      const mid = Math.ceil(words.length / 2);
      const line1 = words.slice(0, mid).join(" ");
      const line2 = words.slice(mid).join(" ");

      const lbl1 = document.createElementNS(SVG_NS, "text");
      lbl1.setAttribute("x", nx);
      lbl1.setAttribute("y", line2 ? ny + 18 : ny + 22);
      lbl1.setAttribute("text-anchor", "middle");
      lbl1.setAttribute("font-family", "Inter,sans-serif");
      lbl1.setAttribute("font-weight", "700");
      lbl1.setAttribute("font-size", "10");
      lbl1.setAttribute("fill", "#fff");
      lbl1.textContent = line1;

      g.appendChild(circle);
      g.appendChild(icon);
      g.appendChild(lbl1);

      if (line2) {
        const lbl2 = document.createElementNS(SVG_NS, "text");
        lbl2.setAttribute("x", nx); lbl2.setAttribute("y", ny + 28);
        lbl2.setAttribute("text-anchor", "middle");
        lbl2.setAttribute("font-family", "Inter,sans-serif");
        lbl2.setAttribute("font-weight", "700");
        lbl2.setAttribute("font-size", "10");
        lbl2.setAttribute("fill", "#fff");
        lbl2.textContent = line2;
        g.appendChild(lbl2);
      }

      const navigate = () => { window.location.href = `capacitaciones/${mod.id}.html`; };
      g.addEventListener("click", navigate);
      g.addEventListener("keydown", (e) => { if (e.key === "Enter") navigate(); });
      g.addEventListener("mouseenter", () => { circle.setAttribute("stroke", "#fff"); circle.setAttribute("fill", "#0055A5"); });
      g.addEventListener("mouseleave", () => { circle.setAttribute("stroke", "#FFB800"); circle.setAttribute("fill", "#002855"); });

      nodesLayer.appendChild(g);
    });
  }

  document.addEventListener("DOMContentLoaded", buildNodalMap);
})();
