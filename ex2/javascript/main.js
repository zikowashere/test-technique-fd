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

  window.addEventListener("load", () => {
    const current =
      document.querySelector(".nav__link.is-active") || navLinks[0];
    if (current) setActiveLink(current);
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
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) return;

        const id = `#${visible.target.id}`;
        const active = navLinks.find((a) => a.getAttribute("href") === id);
        if (active) setActiveLink(active);
      },
      {
        root: null,
        threshold: [0.2, 0.35, 0.5, 0.65],
        rootMargin: "-80px 0px -55% 0px",
      }
    );

    sections.forEach((s) => io.observe(s));
  }

  const carousels = Array.from(document.querySelectorAll("[data-carousel]"));

  carousels.forEach((carousel) => {
    const viewport = carousel.querySelector(".carousel__viewport");
    const track = carousel.querySelector(".carousel__track");
    const prevBtn = carousel.querySelector("[data-carousel-prev]");
    const nextBtn = carousel.querySelector("[data-carousel-next]");

    if (!viewport || !track) return;

    function getStep() {
      const firstCard = track.querySelector(".card");
      if (!firstCard) return 280;
      const cardRect = firstCard.getBoundingClientRect();
      return Math.round(cardRect.width + 18);
    }

    function scrollByCards(direction) {
      viewport.scrollBy({ left: direction * getStep(), behavior: "smooth" });
    }

    prevBtn?.addEventListener("click", () => scrollByCards(-1));
    nextBtn?.addEventListener("click", () => scrollByCards(1));

    viewport.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") scrollByCards(-1);
      if (e.key === "ArrowRight") scrollByCards(1);
    });

    viewport.setAttribute("tabindex", "0");
  });
})();
