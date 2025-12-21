(function () {
  const navLinks = Array.from(document.querySelectorAll("[data-nav]"));
  const indicator = document.querySelector(".nav__indicator");
  let isScrolling = false;

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (!href || !href.startsWith("#")) return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      isScrolling = true;
      setActiveLink(link);
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.pushState(null, "", href);

      setTimeout(() => {
        isScrolling = false;
      }, 800);
    });
  });

  function setActiveLink(activeLink) {
    navLinks.forEach((a) => a.classList.remove("is-active"));
    activeLink.classList.add("is-active");

    const rect = activeLink.getBoundingClientRect();
    const parentRect = activeLink
      .closest(".nav__inner")
      .getBoundingClientRect();

    indicator.style.transform = `translateX(${rect.left - parentRect.left}px)`;
    indicator.style.width = `${rect.width}px`;
  }

  window.addEventListener("load", () => {
    const hash = window.location.hash;
    const active =
      navLinks.find((a) => a.getAttribute("href") === hash) || navLinks[0];

    if (active) setActiveLink(active);
  });

  const sectionIds = navLinks
    .map((a) => a.getAttribute("href"))
    .filter((h) => h && h.startsWith("#"));

  const sections = sectionIds
    .map((id) => document.querySelector(id))
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    const io = new IntersectionObserver(
      (entries) => {
        if (isScrolling) return;

        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) return;

        const id = `#${visible.target.id}`;
        const active = navLinks.find((a) => a.getAttribute("href") === id);
        if (active) setActiveLink(active);
      },
      {
        threshold: [0.3, 0.5, 0.7],
        rootMargin: "-80px 0px -55% 0px",
      }
    );

    sections.forEach((s) => io.observe(s));
  }
})();
