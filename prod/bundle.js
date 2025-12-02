/* Compiled from STAGE on 2025-12-02 10:33 */
(() => {
  function pgServices() {
    const body = document.body;
    if (!body.classList.contains("page__services")) return;
    const topBodySection = document.querySelector(".top-body-section");
    if (!topBodySection || topBodySection.dataset.service !== "phase-2") return;
    body.classList.add("phase-2");
    const legacyContainer = document.querySelector(".services-search .container .row .col");
    const rowContainer = legacyContainer.closest(".row");
    const popularServLnks = document.querySelector(".region-featured-services-search");
    if (legacyContainer && topBodySection && topBodySection.parentNode !== legacyContainer) {
      legacyContainer.appendChild(topBodySection);
    }
    if (popularServLnks && rowContainer && popularServLnks.parentNode !== rowContainer) {
      rowContainer.appendChild(popularServLnks);
    }
    if (popularServLnks) {
      ["container", "margin-vertical"].forEach((cls) => {
        const wrapper = popularServLnks.querySelector(`.${cls}`);
        if (wrapper && wrapper.parentNode) {
          const parent = wrapper.parentNode;
          while (wrapper.firstChild) parent.insertBefore(wrapper.firstChild, wrapper);
          parent.removeChild(wrapper);
        }
      });
    }
    const finalContent = document.querySelector(".region-featured-services-search");
    if (finalContent && finalContent.parentElement && !finalContent.parentElement.classList.contains("col")) {
      const colWrapper = document.createElement("div");
      colWrapper.className = "col";
      finalContent.parentNode.insertBefore(colWrapper, finalContent);
      colWrapper.appendChild(finalContent);
    }
    const marquee = document.querySelector(".marquee-title");
    const eyebrow = document.querySelector(".marquee-title-eyebrow");
    if (marquee && eyebrow && eyebrow.nextSibling !== marquee) {
      marquee.before(eyebrow);
    }
    if (rowContainer) {
      rowContainer.addEventListener(
        "click",
        (e) => {
          const btn = e.target.closest(".show-more-btn");
          if (!btn) return;
          e.preventDefault();
          const container = btn.closest(".region-featured-services-search") || rowContainer;
          const list = container.querySelector(".hgm-list-group");
          if (!list) return;
          const expanded = list.classList.toggle("expanded");
          const more = btn.getAttribute("data-btn-more");
          const less = btn.getAttribute("data-btn-less");
          if (more && less) btn.textContent = expanded ? less : more;
          btn.setAttribute("aria-expanded", String(expanded));
        },
        { passive: false }
      );
    }
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", pgServices, { once: true });
  } else {
    pgServices();
  }
})();
(function() {
  function matchHeights() {
    const groups = document.querySelectorAll('[class*="cmp-matchheight-"]');
    const viewportWidth = window.innerWidth;
    groups.forEach((group) => {
      const className = Array.from(group.classList).find((cls) => cls.startsWith("cmp-matchheight-")).replace("cmp-matchheight-", "");
      const children = group.querySelectorAll(`.${className}`);
      children.forEach((el) => el.style.height = "");
      if (viewportWidth > 768 && children.length > 1) {
        let maxHeight = 0;
        children.forEach((el) => {
          const h = el.offsetHeight;
          if (h > maxHeight) maxHeight = h;
        });
        children.forEach((el) => el.style.height = `${maxHeight}px`);
      }
    });
  }
  let resizeTimeout;
  window.addEventListener("resize", () => {
    if (resizeTimeout) cancelAnimationFrame(resizeTimeout);
    resizeTimeout = requestAnimationFrame(matchHeights);
  });
  document.addEventListener("DOMContentLoaded", matchHeights);
})();
