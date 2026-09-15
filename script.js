(() => {
	"use strict";

	const initializePage = () => {
		const navigationLinks = [...document.querySelectorAll('nav a[href^="#"]')];
		const backToTopLink = document.querySelector('footer a[href="#"]');
		const sections = navigationLinks
			.map((link) => document.querySelector(link.getAttribute("href")))
			.filter(Boolean);

		const updateActiveSection = () => {
			const activeSection = sections.find((section) => {
				const sectionBounds = section.getBoundingClientRect();
				return sectionBounds.top <= 140 && sectionBounds.bottom > 140;
			});

			navigationLinks.forEach((link) => {
				const isActive = activeSection?.id === link.getAttribute("href").slice(1);
				link.toggleAttribute("aria-current", isActive);
			});
		};

		navigationLinks.forEach((link) => {
			link.addEventListener("click", (event) => {
				const target = document.querySelector(link.getAttribute("href"));

				if (!target) {
					return;
				}

				event.preventDefault();
				target.scrollIntoView({ behavior: "smooth", block: "start" });
				window.history.replaceState(null, "", link.getAttribute("href"));
			});
		});

		backToTopLink?.addEventListener("click", (event) => {
			event.preventDefault();
			window.scrollTo({ top: 0, behavior: "smooth" });
			window.history.replaceState(null, "", window.location.pathname);
		});

		if (sections.length > 0) {
			window.addEventListener("scroll", updateActiveSection, { passive: true });
			updateActiveSection();
		}
	};

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", initializePage, { once: true });
	} else {
		initializePage();
	}
})();
// alert("Hello, World!");
