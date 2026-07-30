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
});
