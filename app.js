// --- DIGITAL KUYAVAN SPA APPLICATIONS STATE ---

// Showcase Database
const SHOWCASE_ITEMS = [
  {
    id: 1,
    title: "Aether Voronoi Lamp",
    category: "decor",
    material: "PLA Wood Fill",
    layerHeight: "120 Microns",
    duration: "14h 30m",
    infill: "15% Gyroid",
    image: "assets/lamp.png",
    description: "An intricate hollow-body lamp utilizing customized cellular patterns to scatter light in geometric grids. The organic texture is achieved using premium sawdust-infused PLA filament, which can be sanded and stained like real pine.",
    specs: {
      "Printer Type": "FDM (Fused Deposition Modeling)",
      "Layer Resolution": "0.12 mm",
      "Print Speed": "50 mm/s",
      "Dimensions": "150 x 150 x 240 mm",
      "Estimated Weight": "240g",
      "Infill Pattern": "Gyroid (for light diffusion)"
    }
  },
  {
    id: 2,
    title: "Emerald Dragon Wyvern",
    category: "miniature",
    material: "SLA Clear Resin",
    layerHeight: "50 Microns",
    duration: "6h 15m",
    infill: "100% Solid",
    image: "assets/dragon.png",
    description: "High-fidelity miniature figurine of a nesting wyvern. Printed in emerald-green translucent UV-cured resin. This piece displays microscopic organic scale detail and sharp claw features down to 50-micron layer levels.",
    specs: {
      "Printer Type": "SLA (Stereolithography)",
      "Layer Resolution": "0.05 mm (50 microns)",
      "Light Source": "405nm UV Laser",
      "Dimensions": "85 x 90 x 75 mm",
      "Estimated Weight": "65g",
      "Post-Processing": "Isopropyl alcohol bath & UV chamber cure"
    }
  },
  {
    id: 3,
    title: "Biomorphic Face Sculpture",
    category: "decor",
    material: "Stone PLA / Enamel",
    layerHeight: "200 Microns",
    duration: "18h 45m",
    infill: "10% Honeycomb",
    image: "assets/sculpture.png",
    description: "Abstract human facial features seamlessly integrating with helical modern curves. Printed in premium marble-infused PLA for a stone-cold heavy feel, then hand-polished and highlighted with high-gloss gold enamel lining.",
    specs: {
      "Printer Type": "FDM (Fused Deposition)",
      "Layer Resolution": "0.20 mm",
      "Dimensions": "180 x 160 x 290 mm",
      "Estimated Weight": "420g",
      "Finish Type": "Stone-textured sanding & metallic paint fill",
      "Infill Pattern": "Honeycomb (High structural strength)"
    }
  },
  {
    id: 4,
    title: "Helical Planar Gearbox",
    category: "functional",
    material: "Tough Copper PLA",
    layerHeight: "160 Microns",
    duration: "11h 20m",
    infill: "40% Grid",
    image: "assets/gears.png",
    description: "A fully interlocking planetary gear kinetic sculpture. Printed in single-pass copper and carbon-fiber PLA blends. The model utilizes print-in-place tolerances (0.25mm margins), rotating freely without requiring any post-assembly.",
    specs: {
      "Printer Type": "FDM Multi-material",
      "Layer Resolution": "0.16 mm",
      "Infill Density": "40% Grid (Mechanical load rated)",
      "Dimensions": "120 x 120 x 40 mm",
      "Estimated Weight": "185g",
      "Nozzle Diameter": "0.4 mm hardened steel"
    }
  }
];

// Configurator Physics Coefficients
const CONFIG_MATH = {
  models: {
    vase: { name: "Spiral Vase", baseWeight: 80, baseTime: 6.5, baseCost: 10.0, layerCount: 20 },
    prism: { name: "Geometric Prism", baseWeight: 120, baseTime: 8.0, baseCost: 15.0, layerCount: 6 },
    gear: { name: "Helical Gear", baseWeight: 95, baseTime: 10.0, baseCost: 12.0, layerCount: 5 }
  },
  materials: {
    pla: { name: "Premium PLA", density: 1.24, costPerGram: 0.06, timeMultiplier: 1.0 },
    abs: { name: "Tough ABS", density: 1.04, costPerGram: 0.08, timeMultiplier: 1.2 },
    resin: { name: "HD Resin", density: 1.12, costPerGram: 0.16, timeMultiplier: 0.8 }
  }
};

// State variables
let currentConfig = {
  model: "vase",
  material: "pla",
  color: "hsl(180, 100%, 48%)",
  scale: 100, // percentage
  infill: 20  // percentage
};

let uploadedFiles = [];

// --- DOM ELEMENTS ---
document.addEventListener("DOMContentLoaded", () => {
  initHeaderScroll();
  initMobileMenu();
  initPortfolio();
  initConfigurator();
  initFileUploader();
  initFormHandler();
  initAdminPanel();
  initSmoothScrollSpy();
});

// --- HEADER SCROLL EFFECT ---
function initHeaderScroll() {
  const header = document.getElementById("main-header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}

// --- MOBILE MENU ---
function initMobileMenu() {
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");
  
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  // Close when clicking nav items
  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
    });
  });
}

// --- PORTFOLIO & GALLERY MODAL ---
function initPortfolio() {
  const galleryGrid = document.getElementById("gallery-grid");
  const filterButtons = document.querySelectorAll(".filter-btn");
  
  const projectModal = document.getElementById("project-modal");
  const btnCloseProject = document.getElementById("btn-close-project");
  
  const modalMainImage = document.getElementById("modal-main-image");
  const modalThumbs = document.getElementById("modal-thumbs");
  const modalProjectTag = document.getElementById("modal-project-tag");
  const modalProjectTitle = document.getElementById("modal-project-title");
  const modalProjectDesc = document.getElementById("modal-project-desc");
  const modalSpecMaterial = document.getElementById("modal-spec-material");
  const modalSpecLayer = document.getElementById("modal-spec-layer");
  const modalSpecTime = document.getElementById("modal-spec-time");
  const modalSpecInfill = document.getElementById("modal-spec-infill");
  const btnOrderPiece = document.getElementById("btn-order-piece");

  // Category Filtering
  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      // Toggle active classes
      filterButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      
      const filterValue = btn.getAttribute("data-filter");
      const cards = galleryGrid.querySelectorAll(".gallery-card");
      
      cards.forEach(card => {
        const cardCategory = card.getAttribute("data-category");
        if (filterValue === "all" || cardCategory === filterValue) {
          card.style.display = "flex";
          setTimeout(() => { card.style.opacity = "1"; card.style.transform = "scale(1)"; }, 50);
        } else {
          card.style.opacity = "0";
          card.style.transform = "scale(0.95)";
          setTimeout(() => { card.style.display = "none"; }, 300);
        }
      });
    });
  });

  // Event delegation for opening cards
  galleryGrid.addEventListener("click", (e) => {
    const card = e.target.closest(".gallery-card");
    if (!card) return;
    
    const itemId = parseInt(card.getAttribute("data-id"));
    const itemData = SHOWCASE_ITEMS.find(item => item.id === itemId);
    
    if (itemData) {
      openProjectModal(itemData);
    }
  });

  function openProjectModal(item) {
    modalMainImage.src = item.image;
    modalMainImage.alt = item.title;
    modalProjectTitle.textContent = item.title;
    modalProjectDesc.textContent = item.description;
    
    // Tag formatting
    const tagNames = { decor: "Decor & Art", miniature: "Miniatures", functional: "Functional" };
    modalProjectTag.textContent = tagNames[item.category] || item.category;
    
    // Spec table filling
    modalSpecMaterial.textContent = item.material;
    modalSpecLayer.textContent = item.layerHeight;
    modalSpecTime.textContent = item.duration;
    modalSpecInfill.textContent = item.infill;
    
    // Spec table details - empty original and render extra specs
    const existingTableBody = projectModal.querySelector(".specs-table tbody");
    // Clear custom rows (rows beyond first 4)
    while (existingTableBody.rows.length > 4) {
      existingTableBody.deleteRow(4);
    }
    
    // Add custom spec rows from db
    Object.entries(item.specs).forEach(([key, val]) => {
      const row = document.createElement("tr");
      row.innerHTML = `<td class="spec-name">${key}</td><td class="spec-val">${val}</td>`;
      existingTableBody.appendChild(row);
    });

    // Populate thumb gallery (main image + 2 simulated close-ups)
    modalThumbs.innerHTML = "";
    const images = [item.image, item.image, item.image]; // In real case different close-ups
    images.forEach((imgSrc, idx) => {
      const thumb = document.createElement("div");
      thumb.className = `project-modal-thumb ${idx === 0 ? 'active' : ''}`;
      thumb.innerHTML = `<img src="${imgSrc}" alt="${item.title} angle ${idx + 1}">`;
      thumb.addEventListener("click", () => {
        modalThumbs.querySelectorAll(".project-modal-thumb").forEach(t => t.classList.remove("active"));
        thumb.classList.add("active");
        modalMainImage.src = imgSrc;
      });
      modalThumbs.appendChild(thumb);
    });

    // Handle Order button
    btnOrderPiece.onclick = () => {
      const typeSelect = document.getElementById("form-type");
      const messageText = document.getElementById("form-message");
      
      typeSelect.value = "gallery";
      messageText.value = `I am interested in acquiring a custom production of the "${item.title}" from your showcase.\n\nSpecs requested:\n- Material: ${item.material}\n- Layer resolution: ${item.layerHeight}`;
      
      // Close modal and scroll
      projectModal.classList.remove("active");
      document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
    };

    projectModal.classList.add("active");
  }

  // Close modals
  btnCloseProject.addEventListener("click", () => {
    projectModal.classList.remove("active");
  });

  projectModal.addEventListener("click", (e) => {
    if (e.target === projectModal) {
      projectModal.classList.remove("active");
    }
  });
}

// --- 3D PRINT CONFIGURATOR ---
function initConfigurator() {
  const modelBtns = document.querySelectorAll(".option-btn[data-model]");
  const materialBtns = document.querySelectorAll(".option-btn[data-material]");
  const colorSwatches = document.querySelectorAll(".color-swatch");
  const inputScale = document.getElementById("input-scale");
  const scaleValue = document.getElementById("scale-value");
  const inputInfill = document.getElementById("input-infill");
  const infillValue = document.getElementById("infill-value");
  
  const estTime = document.getElementById("est-time");
  const estWeight = document.getElementById("est-weight");
  const estCost = document.getElementById("est-cost");
  
  const virtualModel = document.getElementById("virtual-model");
  const btnInquireCustom = document.getElementById("btn-inquire-custom");

  // Model Selection
  modelBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      modelBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentConfig.model = btn.getAttribute("data-model");
      updateModelGeometry();
      calculateEstimates();
    });
  });

  // Material Selection
  materialBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      materialBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentConfig.material = btn.getAttribute("data-material");
      calculateEstimates();
    });
  });

  // Color Selection
  colorSwatches.forEach(swatch => {
    swatch.addEventListener("click", () => {
      colorSwatches.forEach(s => s.classList.remove("active"));
      swatch.classList.add("active");
      currentConfig.color = swatch.getAttribute("data-color");
      
      // Update visualizer CSS variables
      document.documentElement.style.setProperty("--model-color", currentConfig.color);
    });
  });

  // Scale Slider
  inputScale.addEventListener("input", (e) => {
    currentConfig.scale = parseInt(e.target.value);
    scaleValue.textContent = `${currentConfig.scale}%`;
    
    // Scale representation (range 50% to 200% maps to 0.5 to 1.7 scale transform)
    const scaleFactor = (currentConfig.scale / 100).toFixed(2);
    document.documentElement.style.setProperty("--model-scale", scaleFactor);
    calculateEstimates();
  });

  // Infill Slider
  inputInfill.addEventListener("input", (e) => {
    currentConfig.infill = parseInt(e.target.value);
    infillValue.textContent = `${currentConfig.infill}%`;
    calculateEstimates();
  });

  // Inquire Custom Config
  btnInquireCustom.addEventListener("click", () => {
    const typeSelect = document.getElementById("form-type");
    const materialSelect = document.getElementById("form-material");
    const messageText = document.getElementById("form-message");

    const mModel = CONFIG_MATH.models[currentConfig.model].name;
    const mMat = CONFIG_MATH.materials[currentConfig.material].name;
    
    // Map material config key to select value
    typeSelect.value = "custom";
    materialSelect.value = currentConfig.material;
    
    // Generate detail string
    messageText.value = `I want to request a custom print quote for the following simulated configuration:
- Model Shape: ${mModel}
- Selected Material: ${mMat}
- Selected Color: ${currentConfig.color}
- Scale Factor: ${currentConfig.scale}%
- Infill Density: ${currentConfig.infill}%

Live estimates calculated:
- Weight: ${estWeight.textContent}
- Print Time: ${estTime.textContent}
- Cost Quote: ${estCost.textContent}`;

    document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
  });

  function updateModelGeometry() {
    virtualModel.className = `virtual-model model-${currentConfig.model}`;
    virtualModel.innerHTML = "";
    
    const geom = CONFIG_MATH.models[currentConfig.model];
    
    if (currentConfig.model === "vase") {
      // Build layers for vase
      for (let i = 1; i <= geom.layerCount; i++) {
        const layer = document.createElement("div");
        layer.className = `cylinder-layer layer-${i}`;
        virtualModel.appendChild(layer);
      }
    } else if (currentConfig.model === "prism") {
      // Build prism faces
      const faces = ["bottom", "top", "front", "back", "left", "right"];
      faces.forEach(f => {
        const face = document.createElement("div");
        face.className = `prism-face face-${f}`;
        if (f !== "bottom" && f !== "top") {
          face.textContent = "▲";
        }
        virtualModel.appendChild(face);
      });
    } else if (currentConfig.model === "gear") {
      // Build gears layers
      for (let i = 1; i <= geom.layerCount; i++) {
        const layer = document.createElement("div");
        layer.className = `gear-layer gear-layer-${i}`;
        virtualModel.appendChild(layer);
      }
    }
  }

  function calculateEstimates() {
    const model = CONFIG_MATH.models[currentConfig.model];
    const mat = CONFIG_MATH.materials[currentConfig.material];
    
    // Scale modifier math: weight is volume (cubic), time is area (quadratic)
    const scaleFactor3D = Math.pow(currentConfig.scale / 100, 3);
    const scaleFactor2D = Math.pow(currentConfig.scale / 100, 1.8);
    
    // Infill modifier math
    const infillRatio = currentConfig.infill / 100;
    const infillWeightCoeff = 0.2 + (infillRatio * 0.8); // 20% weight at 0% infill (shell only), up to 100%
    const infillTimeCoeff = 0.5 + (infillRatio * 0.5);   // infill speeds time slightly at low rates
    
    // Weight: modelBase * scaleModifier * materialDensity * infillModifier
    const finalWeight = Math.round(model.baseWeight * scaleFactor3D * mat.density * infillWeightCoeff);
    
    // Time: modelBase * scaleModifier * materialTimeMultiplier * infillModifier
    const timeHours = (model.baseTime * scaleFactor2D * mat.timeMultiplier * infillTimeCoeff).toFixed(1);
    
    // Cost: BaseSetupCost + MaterialCost(Weight * costPerGram)
    const finalCost = (model.baseCost + (finalWeight * mat.costPerGram)).toFixed(2);
    
    // Update labels
    estWeight.textContent = `${finalWeight} g`;
    estTime.textContent = `${timeHours} hrs`;
    estCost.textContent = `$${finalCost}`;
  }

  // Initial calculation
  calculateEstimates();
}

// --- FILE UPLOADER SIMULATOR ---
function initFileUploader() {
  const dropzone = document.getElementById("file-dropzone");
  const fileInput = document.getElementById("form-file-input");
  const fileList = document.getElementById("file-list");

  dropzone.addEventListener("click", () => {
    fileInput.click();
  });

  fileInput.addEventListener("change", (e) => {
    handleFiles(e.target.files);
  });

  // Drag over states
  ["dragenter", "dragover"].forEach(eventName => {
    dropzone.addEventListener(eventName, (e) => {
      e.preventDefault();
      dropzone.classList.add("dragover");
    }, false);
  });

  ["dragleave", "drop"].forEach(eventName => {
    dropzone.addEventListener(eventName, (e) => {
      e.preventDefault();
      dropzone.classList.remove("dragover");
    }, false);
  });

  dropzone.addEventListener("drop", (e) => {
    const dt = e.dataTransfer;
    handleFiles(dt.files);
  }, false);

  function handleFiles(files) {
    const filesArray = Array.from(files);
    
    filesArray.forEach(file => {
      // Filter extensions
      const ext = file.name.split('.').pop().toLowerCase();
      if (['stl', 'obj', '3mf', 'zip'].includes(ext)) {
        // Size validation < 25MB
        if (file.size <= 25 * 1024 * 1024) {
          uploadedFiles.push(file);
          renderFileList();
        } else {
          alert(`File "${file.name}" exceeds the 25MB limits.`);
        }
      } else {
        alert(`File format ".${ext}" is not supported. Use STL, OBJ, or 3MF.`);
      }
    });
  }

  function renderFileList() {
    fileList.innerHTML = "";
    uploadedFiles.forEach((file, index) => {
      const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
      const fileItem = document.createElement("div");
      fileItem.className = "file-item";
      fileItem.innerHTML = `
        <span>📁 ${file.name} (${sizeMB} MB)</span>
        <button type="button" class="file-remove" data-index="${index}">&times;</button>
      `;
      
      fileItem.querySelector(".file-remove").addEventListener("click", () => {
        uploadedFiles.splice(index, 1);
        renderFileList();
      });
      
      fileList.appendChild(fileItem);
    });
  }
}

// --- FORM HANDLING & SUBMISSION ---
function initFormHandler() {
  const form = document.getElementById("inquiry-form");
  const successModal = document.getElementById("success-modal");
  const btnCloseSuccess = document.getElementById("btn-close-success");
  const btnSuccessOk = document.getElementById("btn-success-ok");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    // Validation
    const name = document.getElementById("form-name").value.trim();
    const email = document.getElementById("form-email").value.trim();
    const type = document.getElementById("form-type").value;
    const material = document.getElementById("form-material").value;
    const message = document.getElementById("form-message").value.trim();
    
    if (!name || !email || !message) {
      alert("Please fill out Name, Email, and Project Description.");
      return;
    }
    
    if (!validateEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Save Inquiry
    const fileNames = uploadedFiles.map(f => f.name).join(", ") || "None";
    const newInquiry = {
      id: Date.now(),
      date: new Date().toLocaleDateString("en-IN"),
      name,
      email,
      type,
      material,
      message,
      attachments: fileNames
    };

    saveInquiry(newInquiry);

    // Show Success Modal
    successModal.classList.add("active");

    // Reset Form
    form.reset();
    uploadedFiles = [];
    document.getElementById("file-list").innerHTML = "";
  });

  // Modal Closures
  const closeSuccess = () => successModal.classList.remove("active");
  btnCloseSuccess.addEventListener("click", closeSuccess);
  btnSuccessOk.addEventListener("click", closeSuccess);
  successModal.addEventListener("click", (e) => {
    if (e.target === successModal) closeSuccess();
  });

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function saveInquiry(inquiry) {
    let list = JSON.parse(localStorage.getItem("dk_inquiries")) || [];
    list.unshift(inquiry); // Newest first
    localStorage.setItem("dk_inquiries", JSON.stringify(list));
  }
}

// --- ADMIN PANEL CONTROLS ---
function initAdminPanel() {
  const adminBtn = document.getElementById("btn-admin-panel");
  const adminModal = document.getElementById("admin-modal");
  const btnCloseAdmin = document.getElementById("btn-close-admin");
  const btnClearInquiries = document.getElementById("btn-clear-inquiries");
  const listBody = document.getElementById("inquiries-list-body");
  const emptyState = document.getElementById("admin-empty-state");

  adminBtn.addEventListener("click", () => {
    renderInquiries();
    adminModal.classList.add("active");
  });

  btnCloseAdmin.addEventListener("click", () => {
    adminModal.classList.remove("active");
  });

  adminModal.addEventListener("click", (e) => {
    if (e.target === adminModal) adminModal.classList.remove("active");
  });

  btnClearInquiries.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete ALL logged inquiries?")) {
      localStorage.removeItem("dk_inquiries");
      renderInquiries();
    }
  });

  function renderInquiries() {
    listBody.innerHTML = "";
    const list = JSON.parse(localStorage.getItem("dk_inquiries")) || [];
    
    if (list.length === 0) {
      emptyState.style.display = "block";
      return;
    }
    
    emptyState.style.display = "none";
    
    const typeBadges = {
      custom: '<span class="inquiry-badge badge-custom">Custom Print</span>',
      gallery: '<span class="inquiry-badge badge-gallery">Gallery Order</span>',
      consult: '<span class="inquiry-badge badge-design">Consultancy</span>'
    };

    const materialLabels = {
      pla: "Premium PLA",
      abs: "Tough ABS",
      resin: "HD Resin",
      undecided: "Undecided"
    };

    list.forEach(inq => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${inq.date}</td>
        <td><strong>${escapeHtml(inq.name)}</strong><br><span style="color:var(--text-muted);font-size:0.75rem;">${escapeHtml(inq.email)}</span></td>
        <td>${typeBadges[inq.type] || inq.type}</td>
        <td>${materialLabels[inq.material] || inq.material}</td>
        <td><div style="max-height:80px;overflow-y:auto;white-space:pre-wrap;line-height:1.4;">${escapeHtml(inq.message)}</div></td>
        <td><span style="color:var(--accent-cyan);font-weight:500;">📎 ${escapeHtml(inq.attachments)}</span></td>
        <td style="text-align:center;">
          <button class="admin-delete-btn" data-id="${inq.id}" title="Delete Inquiry">&times;</button>
        </td>
      `;
      
      row.querySelector(".admin-delete-btn").addEventListener("click", (e) => {
        const targetId = parseInt(e.target.getAttribute("data-id"));
        deleteInquiry(targetId);
      });

      listBody.appendChild(row);
    });
  }

  function deleteInquiry(id) {
    let list = JSON.parse(localStorage.getItem("dk_inquiries")) || [];
    list = list.filter(item => item.id !== id);
    localStorage.setItem("dk_inquiries", JSON.stringify(list));
    renderInquiries();
  }

  function escapeHtml(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
}

// --- SMOOTH SCROLL SPY ---
function initSmoothScrollSpy() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", () => {
    let currentId = "";
    const scrollPosition = window.scrollY + 160; // offset

    sections.forEach(sec => {
      const secTop = sec.offsetTop;
      const secHeight = sec.offsetHeight;
      if (scrollPosition >= secTop && scrollPosition < secTop + secHeight) {
        currentId = sec.getAttribute("id");
      }
    });

    if (currentId) {
      navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${currentId}`) {
          link.classList.add("active");
        }
      });
    }
  });

  // Soft smooth scroll to anchor
  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const targetSec = document.querySelector(targetId);
      if (targetSec) {
        window.scrollTo({
          top: targetSec.offsetTop - 80, // header spacing
          behavior: "smooth"
        });
      }
    });
  });

  // Home brand link smooth scroll
  document.getElementById("logo-link").addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
