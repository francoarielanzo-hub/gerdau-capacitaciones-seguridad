/**
 * training.js – Lógica de página interna de capacitación
 * Maneja tabs, PPT, videos, casos reales, galería y evaluación.
 */

// --- Sidebar navigation ---
document.querySelectorAll(".sidebar-btn").forEach(btn => {
  btn.addEventListener("click", function () {
    const target = this.dataset.tab;
    document.querySelectorAll(".sidebar-btn").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".tab-panel").forEach(p => p.classList.remove("active"));
    this.classList.add("active");
    document.getElementById("tab-" + target)?.classList.add("active");
  });
});

// --- Visor de presentación (PDF embebido o PPTX) ---
(function () {
  const fileInput = document.getElementById("ppt-file-input");
  const frameContainer = document.getElementById("ppt-frame");
  const placeholder = document.getElementById("ppt-placeholder");
  const toolbar = document.getElementById("ppt-toolbar");
  const replaceBtn = document.getElementById("ppt-replace-btn");
  const moduleId = document.body.dataset.moduleId;

  // Función para mostrar iframe de Google Drive o URL directa
  function showUrlViewer(url) {
    let embedUrl = url;
    // Convertir link de Google Drive a embed
    const driveMatch = url.match(/drive\.google\.com\/file\/d\/([^/]+)/);
    if (driveMatch) {
      embedUrl = `https://drive.google.com/file/d/${driveMatch[1]}/preview`;
    }
    if (placeholder) placeholder.style.display = "none";
    if (toolbar) toolbar.style.display = "flex";
    if (frameContainer) {
      frameContainer.style.display = "block";
      frameContainer.innerHTML = `<iframe src="${embedUrl}" style="width:100%;height:700px;border:none;display:block;" allowfullscreen></iframe>`;
    }
  }

  // Botón cargar URL de Drive
  const driveBtn = document.getElementById("drive-url-btn");
  const driveInput = document.getElementById("drive-url-input");
  if (driveBtn && driveInput) {
    driveBtn.addEventListener("click", () => {
      const url = driveInput.value.trim();
      if (!url) return;
      localStorage.setItem(`drive-url-${moduleId}`, url);
      localStorage.removeItem(`pdf-data-${moduleId}`);
    localStorage.removeItem(`drive-url-${moduleId}`);
      localStorage.removeItem(`ppt-name-${moduleId}`);
      showUrlViewer(url);
    });
  }

  // Restaurar URL de Drive guardada
  const storedDriveUrl = localStorage.getItem(`drive-url-${moduleId}`);
  if (storedDriveUrl) {
    showUrlViewer(storedDriveUrl);
  }

  // Intentar restaurar PDF guardado en base64
  const storedPdf = localStorage.getItem(`pdf-data-${moduleId}`);
  const storedName = localStorage.getItem(`ppt-name-${moduleId}`);

  if (storedPdf && storedName && storedName.endsWith(".pdf")) {
    showPdfViewer(storedPdf, storedName);
  } else if (storedName) {
    showPptxInfo(storedName);
  }

  function showPdfViewer(dataUrl, name) {
    if (placeholder) placeholder.style.display = "none";
    if (toolbar) toolbar.style.display = "flex";
    if (!frameContainer) return;
    frameContainer.style.display = "block";
    frameContainer.innerHTML = `
      <div id="pdf-canvas-container" style="width:100%;background:#525659;padding:16px;box-sizing:border-box;max-height:700px;overflow-y:auto;"></div>
    `;
    const label = document.getElementById("ppt-file-label");
    if (label) label.textContent = "\u{1F4C4} " + name;

    // Cargar PDF con PDF.js
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
    script.onload = function() {
      pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
      pdfjsLib.getDocument(dataUrl).promise.then(function(pdf) {
        const container = document.getElementById("pdf-canvas-container");
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          pdf.getPage(pageNum).then(function(page) {
            const scale = (container.clientWidth - 32) / page.getViewport({scale:1}).width;
            const viewport = page.getViewport({scale});
            const canvas = document.createElement("canvas");
            canvas.style.display = "block";
            canvas.style.margin = "0 auto 12px";
            canvas.style.boxShadow = "0 2px 8px rgba(0,0,0,0.4)";
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            container.appendChild(canvas);
            page.render({canvasContext: canvas.getContext("2d"), viewport});
          });
        }
      }).catch(function(err) {
        const container = document.getElementById("pdf-canvas-container");
        container.innerHTML = \`<div style="padding:40px;text-align:center;color:#fff;font-size:14px;">
          \u26A0\uFE0F No se pudo cargar el PDF.<br><br>
          <a href="${dataUrl}" download="${name}" style="background:#FFB800;color:#002855;padding:12px 24px;border-radius:8px;font-weight:800;text-decoration:none;">\u2B07 Descargar PDF</a>
        </div>\`;
      });
    };
    document.head.appendChild(script);
  }

  function showPptxInfo(name) {
    if (placeholder) placeholder.style.display = "none";
    if (toolbar) toolbar.style.display = "flex";
    if (frameContainer) {
      frameContainer.style.display = "flex";
      frameContainer.style.cssText = "display:flex;align-items:center;justify-content:center;background:#1a1a2e;color:#9AA0AB;flex-direction:column;gap:12px;font-size:14px;height:300px;";
      frameContainer.innerHTML = `<div style="font-size:40px">📊</div><div style="font-weight:700;color:#fff">${name}</div><div>Archivo .pptx cargado · Para visualizarlo en la app, convertilo a PDF primero</div>`;
    }
  }

  if (fileInput) {
    fileInput.addEventListener("change", function () {
      const file = this.files[0];
      if (!file) return;
      localStorage.setItem(`ppt-name-${moduleId}`, file.name);

      if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
        const reader = new FileReader();
        reader.onload = function (e) {
          localStorage.setItem(`pdf-data-${moduleId}`, e.target.result);
          showPdfViewer(e.target.result, file.name);
          showToast("✅ PDF cargado y visible en pantalla");
        };
        reader.readAsDataURL(file);
      } else {
        localStorage.removeItem(`pdf-data-${moduleId}`);
    localStorage.removeItem(`drive-url-${moduleId}`);
        showPptxInfo(file.name);
        showToast("✅ Presentación registrada: " + file.name);
      }
    });
  }

  if (replaceBtn) {
    replaceBtn.addEventListener("click", () => {
    localStorage.removeItem(`pdf-data-${moduleId}`);
    localStorage.removeItem(`drive-url-${moduleId}`);
    localStorage.removeItem(`ppt-name-${moduleId}`);
    if (frameContainer) frameContainer.innerHTML = "";
    if (toolbar) toolbar.style.display = "none";
    if (placeholder) placeholder.style.display = "";
    fileInput?.click();
  });
  }
})();

// --- Videos ---
(function () {
  const moduleId = document.body.dataset.moduleId;
  const videoList = document.getElementById("video-list");
  const addVideoBtn = document.getElementById("add-video-btn");
  const videoUrlInput = document.getElementById("video-url-input");
  const videoTitleInput = document.getElementById("video-title-input");

  let videos = getStoredData(`videos-${moduleId}`, []);

  function youtubeId(url) {
    const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([a-zA-Z0-9_-]{11})/);
    return m ? m[1] : null;
  }

  function renderVideos() {
    if (!videoList) return;
    videoList.innerHTML = "";
    if (videos.length === 0) {
      videoList.innerHTML = `<div style="color:var(--gray-400);font-size:14px;padding:20px 0;">No hay videos agregados todavía.</div>`;
      return;
    }
    videos.forEach((vid, i) => {
      const div = document.createElement("div");
      div.className = "video-item";
      const ytId = youtubeId(vid.url);
      const embedHtml = ytId
        ? `<iframe src="https://www.youtube.com/embed/${ytId}" allowfullscreen></iframe>`
        : `<video controls src="${vid.url}"></video>`;

      div.innerHTML = `
        <div class="video-item-header">
          <span class="video-item-title">${vid.title || "Video " + (i + 1)}</span>
          <button class="video-remove-btn" data-index="${i}">✕ Eliminar</button>
        </div>
        <div class="video-embed">${embedHtml}</div>
      `;
      videoList.appendChild(div);
    });

    videoList.querySelectorAll(".video-remove-btn").forEach(btn => {
      btn.addEventListener("click", function () {
        const idx = parseInt(this.dataset.index);
        videos.splice(idx, 1);
        setStoredData(`videos-${moduleId}`, videos);
        renderVideos();
        showToast("Video eliminado");
      });
    });
  }

  if (addVideoBtn) {
    addVideoBtn.addEventListener("click", () => {
      const url = videoUrlInput?.value.trim();
      const title = videoTitleInput?.value.trim();
      if (!url) { showToast("⚠️ Ingresá una URL o ruta de video"); return; }
      videos.push({ url, title: title || "Video sin título" });
      setStoredData(`videos-${moduleId}`, videos);
      if (videoUrlInput) videoUrlInput.value = "";
      if (videoTitleInput) videoTitleInput.value = "";
      renderVideos();
      showToast("✅ Video agregado");
    });
  }

  renderVideos();
})();

// --- Casos Reales ---
(function () {
  const moduleId = document.body.dataset.moduleId;
  const casosList = document.getElementById("casos-list");
  const addCasoBtn = document.getElementById("add-caso-btn");

  const fallback = CASOS_INICIALES?.[moduleId] || [];
  let casos = getStoredData(`casos-${moduleId}`, fallback);

  function renderCasos() {
    if (!casosList) return;
    casosList.innerHTML = "";
    if (casos.length === 0) {
      casosList.innerHTML = `<div style="color:var(--gray-400);font-size:14px;padding:20px 0;">No hay casos cargados para este módulo todavía.</div>`;
      return;
    }
    casos.forEach((caso, i) => {
      const div = document.createElement("div");
      div.className = "caso-card";
      div.innerHTML = `
        <div class="caso-inner">
          <div class="caso-header">
            <div class="caso-title">${caso.titulo}</div>
            <span class="caso-badge">Caso real</span>
          </div>
          <div class="caso-desc">${caso.descripcion}</div>
          <div class="caso-aprendizaje">
            <strong>🎯 Aprendizaje</strong>
            ${caso.aprendizaje}
          </div>
        </div>
        ${caso.imagen ? `<img class="caso-img" src="${caso.imagen}" alt="Imagen del caso"/>` : ''}
      `;
      casosList.appendChild(div);
    });
  }

  if (addCasoBtn) {
    addCasoBtn.addEventListener("click", () => {
      const titulo = document.getElementById("caso-titulo")?.value.trim();
      const desc = document.getElementById("caso-desc")?.value.trim();
      const apr = document.getElementById("caso-aprendizaje")?.value.trim();
      if (!titulo || !desc || !apr) {
        showToast("⚠️ Completá todos los campos del caso");
        return;
      }
      casos.push({ id: "caso-" + Date.now(), titulo, descripcion: desc, aprendizaje: apr, imagen: null });
      setStoredData(`casos-${moduleId}`, casos);
      ["caso-titulo","caso-desc","caso-aprendizaje"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = "";
      });
      renderCasos();
      showToast("✅ Caso real agregado");
    });
  }

  renderCasos();
})();

// --- Galería ---
(function () {
  const moduleId = document.body.dataset.moduleId;
  const gallery = document.getElementById("gallery-grid");
  const galleryInput = document.getElementById("gallery-file-input");

  let images = getStoredData(`gallery-${moduleId}`, []);

  function renderGallery() {
    if (!gallery) return;
    gallery.innerHTML = "";
    images.forEach((img, i) => {
      const div = document.createElement("div");
      div.className = "gallery-item";
      div.innerHTML = `
        <img src="${img.src}" alt="${img.name}"/>
        <div class="gallery-item-label">${img.name}</div>
      `;
      gallery.appendChild(div);
    });
    // Add button
    const addBtn = document.createElement("label");
    addBtn.className = "gallery-add-btn";
    addBtn.htmlFor = "gallery-file-input";
    addBtn.innerHTML = `<span class="gallery-add-icon">📷</span><span>Agregar imagen</span>`;
    gallery.appendChild(addBtn);
  }

  if (galleryInput) {
    galleryInput.addEventListener("change", function () {
      const files = Array.from(this.files);
      let loaded = 0;
      files.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          images.push({ src: e.target.result, name: file.name });
          loaded++;
          if (loaded === files.length) {
            setStoredData(`gallery-${moduleId}`, images);
            renderGallery();
            showToast(`✅ ${files.length} imagen(es) agregada(s)`);
          }
        };
        reader.readAsDataURL(file);
      });
      this.value = "";
    });
  }

  renderGallery();
})();

// --- Evaluación ---
(function () {
  const moduleId = document.body.dataset.moduleId;
  const evalContainer = document.getElementById("eval-container");
  const questions = getStoredData(`eval-${moduleId}`, []);

  function renderEval() {
    if (!evalContainer) return;
    if (questions.length === 0) {
      evalContainer.innerHTML = `
        <div class="eval-empty">
          <div class="eval-empty-icon">📝</div>
          <h3>Evaluación en preparación</h3>
          <p>Las preguntas de este módulo se están desarrollando. Próximamente disponible con opción múltiple, verdadero/falso y casos prácticos.</p>
        </div>
      `;
      return;
    }
    evalContainer.innerHTML = "";
    questions.forEach((q, i) => {
      const div = document.createElement("div");
      div.className = "eval-question";
      const optionsHtml = q.options.map((opt, j) => `
        <label class="eval-option">
          <input type="radio" name="q${i}" value="${j}"/>
          ${opt}
        </label>
      `).join("");
      div.innerHTML = `
        <div class="eval-question-num">Pregunta ${i + 1}</div>
        <div class="eval-question-text">${q.text}</div>
        <div class="eval-options">${optionsHtml}</div>
      `;
      evalContainer.appendChild(div);
    });
  }

  renderEval();
})();

// Toast (re-declarado para páginas internas que no cargan main.js)
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
