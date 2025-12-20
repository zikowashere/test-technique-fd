(function () {
  const navLinks = Array.from(document.querySelectorAll("[data-nav]"));
  const indicator = document.querySelector(".nav__indicator");

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (!href || !href.startsWith("#")) return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.pushState(null, "", href);
    });
  });

  function setActiveLink(activeLink) {
    navLinks.forEach((a) => a.classList.remove("is-active"));
    activeLink.classList.add("is-active");

    const rect = activeLink.getBoundingClientRect();
    const parentRect = activeLink
      .closest(".nav__inner")
      .getBoundingClientRect();
    const left = rect.left - parentRect.left;
    indicator.style.transform = `translateX(${left}px)`;
    indicator.style.width = `${rect.width}px`;
  }
})();
