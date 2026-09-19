(() => {
	"use strict";

	// Keep behavior progressive: the pages remain usable when JavaScript is disabled.
	const ACTIVE_SECTION_OFFSET = 140;
	// These selectors centralize the markup contract used by the page behavior.
	const NAVIGATION_LINK_SELECTOR = 'nav a[href^="#"]';
	const BACK_TO_TOP_SELECTOR = 'footer a[href="#main-content"]';
	const CONTACT_FORM_SELECTOR = "#contact-form";
	const FORM_STATUS_SELECTOR = "#form-status";
	const CURRENT_YEAR_SELECTOR = "#current-year";

	// Set up optional enhancements after the document has finished loading.
	const initializePage = () => {
		const navigationLinks = [
			...document.querySelectorAll(NAVIGATION_LINK_SELECTOR),
		];
		const backToTopLink = document.querySelector(BACK_TO_TOP_SELECTOR);
		const contactForm = document.querySelector(CONTACT_FORM_SELECTOR);
		const formStatus = document.querySelector(FORM_STATUS_SELECTOR);
		const currentYear = document.querySelector(CURRENT_YEAR_SELECTOR);
		const navigationItems = navigationLinks
			.map((link) => {
				const targetSelector = link.getAttribute("href");
				const target = document.querySelector(targetSelector);

				return target ? { link, target, targetSelector } : null;
			})
			.filter(Boolean);

		// The section crossing the reading threshold determines the current nav link.
		const updateActiveSection = () => {
			const activeItem = navigationItems.find(({ target }) => {
				const { bottom, top } = target.getBoundingClientRect();

				return (
					top <= ACTIVE_SECTION_OFFSET &&
					bottom > ACTIVE_SECTION_OFFSET
				);
			});

			navigationItems.forEach(({ link, target }) => {
				if (target === activeItem?.target) {
					link.setAttribute("aria-current", "true");
				} else {
					link.removeAttribute("aria-current");
				}
			});
		};

		// Preserve the URL fragment while replacing the abrupt native jump with smooth scrolling.
		const handleNavigationClick = (event, target, targetSelector) => {
			event.preventDefault();
			target.scrollIntoView({ behavior: "smooth", block: "start" });
			window.history.replaceState(null, "", targetSelector);
		};

		navigationItems.forEach(({ link, target, targetSelector }) => {
			link.addEventListener("click", (event) => {
				handleNavigationClick(event, target, targetSelector);
			});
		});

		// The footer link returns the reader to the document start without a visible jump.
		backToTopLink?.addEventListener("click", (event) => {
			event.preventDefault();
			window.scrollTo({ top: 0, behavior: "smooth" });
			window.history.replaceState(null, "", window.location.pathname);
		});

		// This is a demo submission until the project has a server endpoint.
		const demoForms = document.querySelectorAll("[data-demo-form]");
		demoForms.forEach((form) => {
			form.addEventListener("submit", (event) => {
				event.preventDefault();
				const statusElement =
					form.querySelector(".form-status") ??
					formStatus;

				if (statusElement) {
					statusElement.textContent =
						"Thanks for the message. This demo is ready for a real backend connection.";
				}

				form.reset();
			});
		});

		if (currentYear) {
			currentYear.textContent = String(new Date().getFullYear());
		}

		// About pages have no section navigation, so there is no scroll listener to install.
		if (navigationItems.length === 0) {
			return;
		}

		window.addEventListener("scroll", updateActiveSection, {
			passive: true,
		});
		updateActiveSection();
	};

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", initializePage, {
			once: true,
		});
		return;
	}

	initializePage();
})();
