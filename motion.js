/* Islands Therapy — motion.js
   - Auto-tags common selectors with [data-reveal] so HTML doesn't need editing.
   - Uses IntersectionObserver to add .in-view (CSS handles the transition).
   - Staggers siblings via --reveal-i custom property.
   - Animates stat numbers count-in.
   - Subtle hero parallax on scroll.
*/
(function () {
  if (typeof window === 'undefined') return;

  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. Auto-tag elements for reveal ---------- */
  var REVEAL_SELECTORS = [
    '.section-head',
    '.section .container > .grid > *',
    '.section .container > .features > *',
    '.section .container > .carousel .card',
    '.stats .stat',
    '.surface-card-grid > *',
    '.contact-grid > *',
    '.section .container > .h-display',
    '.section .container > .lede',
    '.section .container > p',
    '.section .container > .center'
  ];

  REVEAL_SELECTORS.forEach(function (sel) {
    document.querySelectorAll(sel).forEach(function (el) {
      if (!el.hasAttribute('data-reveal')) {
        el.setAttribute('data-reveal', '');
      }
    });
  });

  /* Stagger: index siblings within their parent so they reveal sequentially */
  function stagger(parentSelector, childSelector) {
    document.querySelectorAll(parentSelector).forEach(function (parent) {
      var kids = parent.querySelectorAll(childSelector);
      kids.forEach(function (kid, i) {
        if (kid.hasAttribute('data-reveal')) {
          kid.style.setProperty('--reveal-i', i);
        }
      });
    });
  }
  stagger('.grid', '[data-reveal]');
  stagger('.features', '[data-reveal]');
  stagger('.stats', '[data-reveal]');
  stagger('.carousel-track', '[data-reveal]');
  stagger('.contact-grid', '[data-reveal]');
  stagger('.surface-card-grid', '[data-reveal]');

  /* ---------- 2. IntersectionObserver to add .in-view ---------- */
  if (reduced || !('IntersectionObserver' in window)) {
    // Just show everything immediately
    document.querySelectorAll('[data-reveal]').forEach(function (el) {
      el.classList.add('in-view');
    });
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -8% 0px',
    threshold: 0.08
  });

  document.querySelectorAll('[data-reveal]').forEach(function (el) {
    io.observe(el);
  });

  /* ---------- 3. Stat number count-in ---------- */
  function parseStatValue(text) {
    // "12K" -> {num: 12, suffix: "K"}, "150" -> {num: 150, suffix: ""}, "8" -> {num: 8, suffix: ""}
    var m = (text || '').trim().match(/^(\d+(?:\.\d+)?)([A-Za-z%]*)$/);
    if (!m) return null;
    return { num: parseFloat(m[1]), suffix: m[2] || '' };
  }

  function animateStatNumber(el) {
    // The stat-num contains a text node + possibly a <span class="accent">+</span> tail.
    // We only animate the leading numeric text node.
    var firstNode = el.firstChild;
    if (!firstNode || firstNode.nodeType !== 3) return;
    var parsed = parseStatValue(firstNode.nodeValue);
    if (!parsed) return;

    var duration = 1400;
    var start = performance.now();
    var endVal = parsed.num;
    var suffix = parsed.suffix;

    function frame(now) {
      var t = Math.min(1, (now - start) / duration);
      // ease-out cubic
      var eased = 1 - Math.pow(1 - t, 3);
      var current = endVal * eased;
      // round nicely: integers stay integers, decimals keep one place
      var display = (endVal % 1 === 0) ? Math.round(current) : current.toFixed(1);
      firstNode.nodeValue = display + suffix;
      if (t < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  var statObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animateStatNumber(entry.target);
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat .stat-num').forEach(function (el) {
    statObserver.observe(el);
  });

  /* ---------- 4. Hero parallax (subtle, transform only) ---------- */
  var heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    var heroSection = heroBg.closest('.hero');
    var ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        if (heroSection) {
          var rect = heroSection.getBoundingClientRect();
          // Only translate while hero is in viewport
          if (rect.bottom > 0 && rect.top < window.innerHeight) {
            var offset = Math.max(0, -rect.top) * 0.18;
            heroBg.style.setProperty('--parallax-y', offset + 'px');
            // Combine with the breathing animation via additional translate inside transform
            heroBg.style.transform = 'translate3d(0, ' + offset + 'px, 0)';
            // Note: this overrides the keyframe transform. Trade-off: parallax wins
            // over breathing while scrolling. When scroll stops near top, breathing resumes.
          }
        }
        ticking = false;
      });
    }
    // Disable parallax override — keep CSS breathing as the primary motion
    // (parallax + keyframes fight each other). Comment out the listener.
    // window.addEventListener('scroll', onScroll, { passive: true });
  }
})();
