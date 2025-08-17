    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    });

    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, observerOptions);

    document.querySelectorAll(".section").forEach((section) => {
      observer.observe(section);
    });

    document.querySelectorAll(".fade-in-up").forEach((element, index) => {
      element.style.transitionDelay = `${index * 0.1}s`;
      observer.observe(element);
    });
    window.addEventListener("scroll", () => {
      const header = document.querySelector("header");
      if (window.scrollY > 100) {
        header.style.background = "linear-gradient(135deg, rgba(255,215,0,0.95), rgba(255,165,0,0.95), rgba(255,140,0,0.95))";
      } else {
        header.style.background = "linear-gradient(135deg, #FFD700, #FFA500, #FF8C00)";
      }
    });

    document.querySelectorAll(".card").forEach((card) => {
      card.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-10px) scale(1.02)";
      });

      card.addEventListener("mouseleave", function () {
        this.style.transform = "translateY(0) scale(1)";
      });
    });
    function animateCounter(element, target, duration = 2000) {
      let start = 0;
      const increment = target / (duration / 16);

      function updateCounter() {
        start += increment;
        if (start < target) {
          element.textContent = Math.floor(start);
          requestAnimationFrame(updateCounter);
        } else {
          element.textContent = target;
        }
      }
      updateCounter();
    }
    const infoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll(".info-number");
            counters.forEach((counter, index) => {
              // Add some variety in animation timing
              setTimeout(() => {
                counter.style.transform = "scale(1.2)";
                setTimeout(() => {
                  counter.style.transform = "scale(1)";
                }, 300);
              }, index * 200);
            });
          }
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll(".info-grid").forEach((grid) => {
      infoObserver.observe(grid);
    });

    // Add parallax effect to hero section
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset;
      const parallax = document.querySelector(".hero");
      const speed = scrolled * 0.5;
      parallax.style.transform = `translateY(${speed}px)`;
    });

    // Mobile menu toggle (if needed)
    const mobileMenuToggle = () => {
      // This would be implemented if we had a mobile menu button
      console.log("Mobile menu functionality ready");
    };

    // Loading animation complete
    window.addEventListener("load", () => {
      document.body.style.opacity = "1";
      document.body.style.transition = "opacity 0.5s ease-in-out";
    });

    // Add click effect to CTA button
    document.querySelector(".cta-button").addEventListener("click", function (e) {
      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = x + "px";
      ripple.style.top = y + "px";
      ripple.style.position = "absolute";
      ripple.style.borderRadius = "50%";
      ripple.style.background = "rgba(255,255,255,0.3)";
      ripple.style.transform = "scale(0)";
      ripple.style.animation = "ripple 0.6s linear";
      ripple.style.pointerEvents = "none";

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });

    const style = document.createElement("style");
    style.textContent = `
          @keyframes ripple {
              to {
                  transform: scale(4);
                  opacity: 0;
              }
          }
      `;
    document.head.appendChild(style);