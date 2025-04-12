document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.getElementById("mobile-menu-button");
  const closeButton = document.getElementById("mobile-menu-close");
  const mobileMenu = document.getElementById("mobile-menu");

  // Initial setup - hide the close button and the menu
  closeButton.style.display = "none";

  // Setup the mobile menu styling with absolute positioning
  mobileMenu.style.display = "none";
  mobileMenu.style.transition =
    "opacity 0.3s ease-in-out, transform 0.3s ease-in-out";
  mobileMenu.style.opacity = "0";
  mobileMenu.style.transform = "translateX(100%)";

  // Position the menu over the body content
  mobileMenu.style.position = "fixed";
  mobileMenu.style.top = "120px"; // Adjust based on your header height
  mobileMenu.style.right = "0";
  mobileMenu.style.width = "100%";
  mobileMenu.style.zIndex = "999";
  mobileMenu.style.backgroundColor = "white"; // Ensure menu is visible over content
  mobileMenu.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
  mobileMenu.style.paddingTop = "10px";
  mobileMenu.style.paddingBottom = "10px";

  // Function to close the menu
  function closeMenu() {
    // Only close if menu is currently open
    if (mobileMenu.style.display === "block") {
      // Listen for the transition end to hide the menu
      mobileMenu.addEventListener("transitionend", function hideMenu() {
        mobileMenu.style.display = "none";
        menuButton.style.display = "block";
        closeButton.style.display = "none";
        // Remove the event listener to prevent multiple calls
        mobileMenu.removeEventListener("transitionend", hideMenu);
      });

      // Start the transition
      mobileMenu.style.opacity = "0";
      mobileMenu.style.transform = "translateX(100%)"; // Slide out to right
    }
  }

  // Open menu with ease-in-out transition
  menuButton.addEventListener("click", function () {
    // Make it visible and start transition
    mobileMenu.style.display = "block";
    mobileMenu.offsetHeight; // Force reflow
    mobileMenu.style.opacity = "1";
    mobileMenu.style.transform = "translateX(0)"; // Slide in from right
    menuButton.style.display = "none";
    closeButton.style.display = "block";
  });

  // Close menu with close button
  closeButton.addEventListener("click", closeMenu);

  // Close menu when scrolling
  window.addEventListener("scroll", function () {
    // Add a small delay to make the experience smoother
    setTimeout(closeMenu, 100);
  });
});

// Client Reviews Swiper with blur effect
document.addEventListener("DOMContentLoaded", function () {
  // Initialize the reviews swiper if it exists on the page
  if (document.querySelector(".reviews-swiper")) {
    const swiper = new Swiper(".reviews-swiper", {
      slidesPerView: 1,
      spaceBetween: 20,
      centeredSlides: true,
      loop: true,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      breakpoints: {
        // Mobile (default)
        0: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        // Tablet
        768: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        // Laptop
        1024: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        // Desktop
        1280: {
          slidesPerView: 5,
          spaceBetween: 40,
        },
      },
      on: {
        slideChange: applyBlurEffect,
        resize: function () {
          // Trigger the blur effect on resize
          this.emit("slideChange");
        },
        init: function () {
          // Initial blur setup
          this.emit("slideChange");
        },
      },
    });

    // Function to apply blur effect to non-active slides
    function applyBlurEffect() {
      // Add a small delay to allow the slide transition to complete
      setTimeout(() => {
        // Get all slides
        const slides = document.querySelectorAll(".swiper-slide");

        // Reset all slides (remove blur)
        slides.forEach((slide) => {
          slide.style.filter = "";
        });

        // Apply blur based on screen size
        if (window.innerWidth >= 1280) {
          // On large desktop, keep 5 slides clear, blur the rest
          const activeIndex = this.activeIndex;
          slides.forEach((slide, index) => {
            // In loop mode, need to handle the slide indices carefully
            const normalizedIndex = (index - this.loopedSlides) % slides.length;
            const activeNormalizedIndex =
              (activeIndex - this.loopedSlides) % slides.length;

            // Keep active and 4 more slides clear (2 on each side of active)
            const isInViewport =
              normalizedIndex === activeNormalizedIndex ||
              normalizedIndex === (activeNormalizedIndex + 1) % slides.length ||
              normalizedIndex === (activeNormalizedIndex + 2) % slides.length ||
              normalizedIndex ===
                (activeNormalizedIndex - 1 + slides.length) % slides.length ||
              normalizedIndex ===
                (activeNormalizedIndex - 2 + slides.length) % slides.length;

            if (!isInViewport) {
              slide.style.filter = "blur(4px)";
            }
          });
        } else if (window.innerWidth >= 1024) {
          // On laptop, keep 3 slides clear, blur the rest
          const activeIndex = this.activeIndex;
          slides.forEach((slide, index) => {
            const normalizedIndex = (index - this.loopedSlides) % slides.length;
            const activeNormalizedIndex =
              (activeIndex - this.loopedSlides) % slides.length;

            // Keep active and 2 more slides clear (1 on each side of active)
            const isInViewport =
              normalizedIndex === activeNormalizedIndex ||
              normalizedIndex === (activeNormalizedIndex + 1) % slides.length ||
              normalizedIndex ===
                (activeNormalizedIndex - 1 + slides.length) % slides.length;

            if (!isInViewport) {
              slide.style.filter = "blur(4px)";
            }
          });
        } else if (window.innerWidth >= 768) {
          // On tablet, keep 2 slides clear, blur the rest
          const activeIndex = this.activeIndex;
          slides.forEach((slide, index) => {
            const normalizedIndex = (index - this.loopedSlides) % slides.length;
            const activeNormalizedIndex =
              (activeIndex - this.loopedSlides) % slides.length;

            // Keep active and 1 more slide clear (on the right side of active)
            const isInViewport =
              normalizedIndex === activeNormalizedIndex ||
              normalizedIndex === (activeNormalizedIndex + 1) % slides.length;

            if (!isInViewport) {
              slide.style.filter = "blur(4px)";
            }
          });
        } else {
          // On mobile, only keep active slide clear
          const activeSlide = document.querySelector(".swiper-slide-active");
          slides.forEach((slide) => {
            if (slide !== activeSlide) {
              slide.style.filter = "blur(4px)";
            }
          });
        }
      }, 100);
    }
  }
});

/*counter section */
// Counter animation script
document.addEventListener("DOMContentLoaded", function () {
  // Define target values for each counter
  const counterTargets = [90, 40, 65, 50]; // Values in K+

  // Get counter elements
  const counters = [
    document.querySelector(".counter1 span"),
    document.querySelector(".counter2 span"),
    document.querySelector(".counter3 span"),
    document.querySelector(".counter4 span"),
  ];

  // Function to animate a counter
  function animateCounter(counter, target) {
    let current = 0;
    const duration = 3000; // Animation duration in milliseconds
    const increment = Math.ceil(target / (duration / 30)); // Increment per frame

    return new Promise((resolve) => {
      const timer = setInterval(() => {
        current += increment;

        if (current >= target) {
          current = target;
          clearInterval(timer);
          resolve();
        }

        counter.textContent = current + "K+";
      }, 30);
    });
  }

  // Function to reset counters to zero
  function resetCounters() {
    counters.forEach((counter) => {
      counter.textContent = "0K+";
    });
  }

  // Function to animate all counters
  async function animateAllCounters() {
    const animationPromises = counters.map((counter, index) =>
      animateCounter(counter, counterTargets[index])
    );

    await Promise.all(animationPromises);

    // Pause at the final values for a few seconds
    setTimeout(() => {
      resetCounters();
      // Start the animation again after reset
      setTimeout(animateAllCounters, 500);
    }, 3000);
  }

  // Start the animation
  animateAllCounters();

  // Optional: Restart animation when section is in viewport
  const counterSection = document.querySelector(".counter");

  function checkVisibility() {
    const rect = counterSection.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

    if (isVisible) {
      // If you want to restart animation only when it comes into view again
      // You would need to add additional logic here
    }
  }

  // Check visibility on scroll
  window.addEventListener("scroll", checkVisibility);
});

/**articale section */
document.addEventListener("DOMContentLoaded", function () {
  const articlesSwiper = new Swiper(".articles-swiper-container", {
    // Enable responsive breakpoints
    breakpoints: {
      // When window width is >= 320px
      320: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      // When window width is >= 768px
      768: {
        slidesPerView: 2,
        spaceBetween: 15,
      },
      // When window width is >= 1024px
      1024: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
    },

    // Enable loop mode
    loop: true,

    // Enable autoplay
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },



    // Enable CSS mode for better performance on mobile
    cssMode: true,

  });
});


/*********GOOGLE SHEET FORM  */

 document.getElementById("businessForm").onsubmit = function (e) {
   e.preventDefault(); // منع إعادة تحميل الصفحة عند إرسال الفورم

   var form = e.target;
   var formData = new FormData(form);

   // إرسال البيانات إلى Google Apps Script باستخدام fetch
   fetch(
     "https://script.google.com/macros/s/AKfycbw2f6x3EPupxPei1cf9ajM_axebeUCpGWAT3kCUA6CUGG_A0POzBA5NRcuriFMaWODr/exec",
     {
       method: "POST",
       body: formData,
     }
   )
     .then((response) => response.text())
     .then((data) => {
       // عرض رسالة النجاح بعد الإرسال
       document.getElementById("status").classList.remove("hidden");
       form.reset(); // إعادة تعيين الفورم
     })
     .catch((error) => console.error("Error:", error));
 };