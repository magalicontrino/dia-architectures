/* ==========================================================================
   DIA architectures — interactions
   Vanilla JS, no build step. Progressive: the page reads fine without it.
   ========================================================================== */

(function () {
  "use strict";

  /* ---------------------------------------------------------------------
     The image set. `alt` describes the photograph; `kind` is the field of
     work it illustrates. Titles are descriptive of the image itself — they
     are not project records.
     --------------------------------------------------------------------- */
  var WORK = [
    { file: "facade-noire.png",        w: 1290, h: 1895, name: "Façade sombre",        kind: "Réhabilitation", hero: true,
      alt: "Façade enduite sombre percée de deux grandes baies, porte de garage ouverte sur un intérieur blanc." },
    { file: "escalier-helicoidal.jpg", w: 2250, h: 3000, name: "Escalier hélicoïdal",  kind: "Équipement", hero: true,
      alt: "Escalier hélicoïdal en acier devant un mur de brique peint en blanc, sous une charpente industrielle." },
    { file: "couloir-miroir.png",      w: 1375, h: 2021, name: "Couloir miroir",       kind: "Logement", hero: true,
      alt: "Couloir entièrement blanc bordé d'un miroir toute hauteur, éclairé par une gorge lumineuse." },
    { file: "mur-courbe.jpeg",         w: 736,  h: 1104, name: "Mur courbe",           kind: "Logement", hero: true,
      alt: "Mur enduit courbe et embrasure sombre ouvrant sur une porte noire, sol en béton ciré." },
    { file: "facade-mailles.jpg",      w: 996,  h: 671,  name: "Façade en mailles",    kind: "Équipement", hero: true,
      alt: "Rue urbaine bordée de maisons anciennes et d'une longue façade en maille métallique claire." },

    { file: "puits-de-lumiere.jpg",    w: 1150, h: 1150, name: "Puits de lumière",     kind: "Logement",
      alt: "Vue en contre-plongée d'un puits de lumière blanc traversant plusieurs niveaux." },
    { file: "assemblage-bois.jpg",     w: 736,  h: 1104, name: "Assemblage bois",      kind: "Mobilier",
      alt: "Détail d'un assemblage à mi-bois en bois clair, ombres nettes sur fond blanc." },
    { file: "charpente-chene.jpg",     w: 642,  h: 1004, name: "Charpente de chêne",   kind: "Réhabilitation",
      alt: "Comble aménagé, poutre de chêne apparente et volume de rangement en bois clair." },
    { file: "bain-carrele.png",        w: 666,  h: 981,  name: "Bain carrelé",         kind: "Logement",
      alt: "Douche à l'italienne circulaire entièrement carrelée de mosaïque claire." },
    { file: "auvent-metal.jpg",        w: 404,  h: 682,  name: "Auvent métallique",    kind: "Équipement",
      alt: "Auvent et paroi en tôle perforée blanche, structure métallique fine sur une cour." },
    { file: "escalier-blanc.png",      w: 1375, h: 2021, name: "Escalier blanc",       kind: "Logement",
      alt: "Escalier blanc aux arêtes anguleuses ; une silhouette en mouvement le gravit." },
    { file: "bois-et-pave.jpg",        w: 539,  h: 824,  name: "Bois et pavé",         kind: "Réhabilitation",
      alt: "Angle d'un volume en bois posé sur un sol de pavés de pierre irréguliers." },
    { file: "maison-verre.jpg",        w: 704,  h: 1006, name: "Maison de verre",      kind: "Logement",
      alt: "Façade vitrée d'une maison sur deux niveaux, reflets d'arbres dans les vitrages." },
    { file: "faille-lumiere.jpg",      w: 736,  h: 1104, name: "Faille de lumière",    kind: "Logement",
      alt: "Faille de lumière entre deux murs enduits, marche en pierre au sol." },
    { file: "escalier-brique.jpg",     w: 683,  h: 1024, name: "Escalier de brique",   kind: "Réhabilitation",
      alt: "Escalier maçonné en briques posées de chant, contre un mur de pierre chaulé." },
    { file: "menuiserie-brique.jpg",   w: 555,  h: 777,  name: "Menuiserie en brique", kind: "Réhabilitation",
      alt: "Menuiserie en bois insérée dans une embrasure de mur de brique ancienne." },
    { file: "seuil-bois.jpg",          w: 330,  h: 491,  name: "Seuil de bois",        kind: "Mobilier",
      alt: "Détail d'un seuil et d'un montant en bois clair, rainures du plancher." }
  ];

  var BASE = "assets/projects/";
  var pad = function (n) { return String(n).padStart(2, "0"); };
  var $ = function (id) { return document.getElementById(id); };

  /* ---------------------------------------------------------------------
     Hero slideshow
     --------------------------------------------------------------------- */
  var heroSet = WORK.filter(function (w) { return w.hero; });

  (function buildHero() {
    var stage = $("heroStage");
    var count = $("heroCount");
    if (!stage) return;

    heroSet.forEach(function (item, i) {
      var slide = document.createElement("div");
      slide.className = "hero__slide";
      slide.dataset.active = i === 0 ? "true" : "false";

      var img = document.createElement("img");
      img.src = BASE + item.file;
      img.alt = i === 0 ? item.alt : "";
      img.width = item.w;
      img.height = item.h;
      img.decoding = "async";
      if (i > 0) { img.loading = "lazy"; img.setAttribute("aria-hidden", "true"); }

      slide.appendChild(img);
      stage.appendChild(slide);
    });

    if (count) count.textContent = pad(1) + " / " + pad(heroSet.length);

    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || heroSet.length < 2) return;

    var idx = 0;
    var slides = stage.children;

    setInterval(function () {
      if (document.hidden) return;
      slides[idx].dataset.active = "false";
      idx = (idx + 1) % slides.length;
      slides[idx].dataset.active = "true";
      if (count) count.textContent = pad(idx + 1) + " / " + pad(slides.length);
    }, 5200);
  })();

  /* ---------------------------------------------------------------------
     Work grid
     --------------------------------------------------------------------- */
  (function buildGrid() {
    var grid = $("grid");
    if (!grid) return;

    var frag = document.createDocumentFragment();

    WORK.forEach(function (item, i) {
      var tile = document.createElement("button");
      tile.type = "button";
      tile.className = "tile reveal";
      tile.dataset.index = String(i);
      tile.setAttribute("aria-label", "Ouvrir : " + item.name);

      var frame = document.createElement("div");
      frame.className = "tile__frame";

      var img = document.createElement("img");
      img.src = BASE + item.file;
      img.alt = item.alt;
      img.width = item.w;
      img.height = item.h;
      img.loading = i < 4 ? "eager" : "lazy";
      img.decoding = "async";
      frame.appendChild(img);

      var cap = document.createElement("div");
      cap.className = "tile__caption";
      cap.innerHTML =
        '<span class="tile__index">' + pad(i + 1) + "</span>" +
        '<span class="tile__name"></span>' +
        '<span class="tile__kind"></span>';
      cap.querySelector(".tile__name").textContent = item.name;
      cap.querySelector(".tile__kind").textContent = item.kind;

      tile.appendChild(frame);
      tile.appendChild(cap);
      frag.appendChild(tile);
    });

    grid.appendChild(frag);

    var wc = $("workCount");
    if (wc) wc.textContent = String(WORK.length);

    observeReveals();
  })();

  /* ---------------------------------------------------------------------
     Lightbox
     --------------------------------------------------------------------- */
  (function lightbox() {
    var box = $("lightbox");
    var img = $("lbImg");
    var title = $("lbTitle");
    var pos = $("lbPos");
    var caption = $("lbCaption");
    if (!box || !img) return;

    var current = 0;
    var lastFocus = null;

    function show(i) {
      current = (i + WORK.length) % WORK.length;
      var item = WORK[current];
      img.src = BASE + item.file;
      img.alt = item.alt;
      title.textContent = item.name;
      pos.textContent = pad(current + 1) + " / " + pad(WORK.length);
      caption.textContent = item.kind + " — " + item.alt;
    }

    function open(i) {
      lastFocus = document.activeElement;
      show(i);
      box.dataset.open = "true";
      document.body.dataset.lightbox = "open";
      document.body.style.overflow = "hidden";
      $("lbClose").focus();
    }

    function close() {
      box.dataset.open = "false";
      delete document.body.dataset.lightbox;
      document.body.style.overflow = "";
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    document.addEventListener("click", function (e) {
      var tile = e.target.closest ? e.target.closest(".tile") : null;
      if (tile) { open(Number(tile.dataset.index)); }
    });

    $("lbPrev").addEventListener("click", function () { show(current - 1); });
    $("lbNext").addEventListener("click", function () { show(current + 1); });
    $("lbClose").addEventListener("click", close);

    box.addEventListener("click", function (e) {
      // Click on the empty backdrop closes; clicks on the image or controls don't.
      if (e.target === box || e.target.classList.contains("lightbox__stage")) close();
    });

    document.addEventListener("keydown", function (e) {
      if (box.dataset.open !== "true") return;
      if (e.key === "Escape") { close(); }
      else if (e.key === "ArrowLeft") { show(current - 1); }
      else if (e.key === "ArrowRight") { show(current + 1); }
    });

    /* Touch: swipe between images. */
    var startX = null;
    box.addEventListener("touchstart", function (e) { startX = e.touches[0].clientX; }, { passive: true });
    box.addEventListener("touchend", function (e) {
      if (startX === null) return;
      var dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 50) { show(dx < 0 ? current + 1 : current - 1); }
      startX = null;
    }, { passive: true });
  })();

  /* ---------------------------------------------------------------------
     Reveal on scroll
     --------------------------------------------------------------------- */
  function observeReveals() {
    var items = document.querySelectorAll(".reveal:not([data-shown])");

    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.dataset.shown = "true"; });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.dataset.shown = "true";
        io.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.06 });

    items.forEach(function (el, i) {
      el.style.transitionDelay = (Math.min(i, 6) * 55) + "ms";
      io.observe(el);
    });
  }

  observeReveals();

  /* ---------------------------------------------------------------------
     Header state + active section + year
     --------------------------------------------------------------------- */
  (function chrome() {
    var head = $("masthead");
    var year = $("year");
    if (year) year.textContent = String(new Date().getFullYear());

    var onScroll = function () {
      if (head) head.dataset.scrolled = window.scrollY > 40 ? "true" : "false";
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    var links = Array.prototype.slice.call(document.querySelectorAll(".nav a"));
    var sections = links
      .map(function (a) { return document.querySelector(a.getAttribute("href")); })
      .filter(Boolean);

    if (!sections.length || !("IntersectionObserver" in window)) return;

    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) {
          a.setAttribute("aria-current", a.getAttribute("href") === "#" + entry.target.id ? "true" : "false");
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });

    sections.forEach(function (s) { spy.observe(s); });
  })();
})();
