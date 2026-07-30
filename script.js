document.addEventListener('DOMContentLoaded', function () {
  // Mobile menu toggle
  var btn = document.querySelector('.menu-toggle');
  var links = document.querySelector('.nav-links');
  if (btn && links) {
    btn.addEventListener('click', function () {
      links.classList.toggle('open');
      btn.classList.toggle('active');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('open');
        btn.classList.remove('active');
      });
    });
  }

  // Scroll-reveal animation: JS adds the class itself, so pages without
  // JS simply show everything normally (nothing depends on it to be visible).
  var targets = document.querySelectorAll(
    '.section-head, .info-card, .specimen, .process-step, .quote-section blockquote, .check-list li, .faq-item'
  );
  targets.forEach(function (el) { el.classList.add('reveal'); });

  if (targets.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    targets.forEach(function (el) { observer.observe(el); });
  } else {
    targets.forEach(function (el) { el.classList.add('visible'); });
  }

  // Materials horizontal-scroll arrow controls (mobile)
  var track = document.querySelector('.materials-grid');
  var wrap = document.querySelector('.materials-scroll');
  if (track && wrap) {
    var leftBtn = wrap.querySelector('.scroll-hint-left');
    var rightBtn = wrap.querySelector('.scroll-hint-right');

    var updateArrows = function () {
      var max = track.scrollWidth - track.clientWidth;
      if (leftBtn) leftBtn.classList.toggle('is-visible', track.scrollLeft > 10);
      if (rightBtn) rightBtn.classList.toggle('is-visible', track.scrollLeft < max - 10);
    };

    track.addEventListener('scroll', updateArrows);
    window.addEventListener('resize', updateArrows);
    if (rightBtn) rightBtn.addEventListener('click', function () {
      track.scrollBy({ left: track.clientWidth * 0.85, behavior: 'smooth' });
    });
    if (leftBtn) leftBtn.addEventListener('click', function () {
      track.scrollBy({ left: -track.clientWidth * 0.85, behavior: 'smooth' });
    });
    updateArrows();
  }

  // Hero entrance animation trigger
  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      document.body.classList.add('loaded');
    });
  });

  // Count-up animation for stat numbers (data-count + optional data-suffix)
  var counters = document.querySelectorAll('.num[data-count]');
  if (counters.length) {
    var animateCount = function (el) {
      var target = parseInt(el.getAttribute('data-count'), 10) || 0;
      var suffix = el.getAttribute('data-suffix') || '';
      var duration = 1400;
      var start = null;
      var easeOutExpo = function (t) { return t === 1 ? 1 : 1 - Math.pow(2, -10 * t); };
      function step(ts) {
        if (!start) start = ts;
        var progress = Math.min((ts - start) / duration, 1);
        var eased = easeOutExpo(progress);
        var value = Math.round(target * eased);
        el.textContent = value.toLocaleString('en-US') + suffix;
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    };

    if ('IntersectionObserver' in window) {
      var countObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            countObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.4 });
      counters.forEach(function (el) { countObserver.observe(el); });
    } else {
      counters.forEach(function (el) {
        el.textContent = el.getAttribute('data-count') + (el.getAttribute('data-suffix') || '');
      });
    }
  }
});
