/* =====================================================================
   AHMAD RAZA — PORTFOLIO SCRIPT
   Dependency-free vanilla JavaScript.
   Sections: Navbar scroll/active link, reveal animations, skill filter,
   mobile menu, back-to-top, expand/collapse, ripple, contact form.
===================================================================== */

document.addEventListener('DOMContentLoaded', function () {
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* -------------------------------------------------------------
     1. NAVBAR: scroll background + active link highlighting
  ------------------------------------------------------------- */
  var mainNav = document.getElementById('mainNav');
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('#navLinks .nav-link'));
  var sections = navLinks
    .map(function (link) {
      var id = link.getAttribute('data-section');
      return document.getElementById(id);
    })
    .filter(Boolean);

  function handleNavScroll() {
    if (window.scrollY > 40) {
      mainNav.classList.add('nav-scrolled');
    } else {
      mainNav.classList.remove('nav-scrolled');
    }
  }
  handleNavScroll();
  window.addEventListener('scroll', handleNavScroll, { passive: true });

  function setActiveLink(id) {
    navLinks.forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('data-section') === id);
    });
  }

  if ('IntersectionObserver' in window && sections.length) {
    var navObserver = new IntersectionObserver(
      function (entries) {
        // Choose the entry closest to the top of the viewport that is intersecting
        var visible = entries
          .filter(function (e) { return e.isIntersecting; })
          .sort(function (a, b) { return b.intersectionRatio - a.intersectionRatio; });
        if (visible.length) {
          setActiveLink(visible[0].target.id);
        }
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    sections.forEach(function (sec) { navObserver.observe(sec); });
  }

  /* -------------------------------------------------------------
     2. SMOOTH SCROLL for in-page anchor links (native CSS already
        handles most of this via `scroll-behavior: smooth`, this
        adds a JS fallback + closes the mobile menu after a click)
  ------------------------------------------------------------- */
  var navMenu = document.getElementById('navMenu');
  var bsCollapse = null;
  if (navMenu && window.bootstrap) {
    bsCollapse = window.bootstrap.Collapse.getOrCreateInstance(navMenu, { toggle: false });
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = anchor.getAttribute('href');
      if (targetId.length > 1) {
        var targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
          history.pushState(null, '', targetId);
        }
      }
      // Close mobile nav after clicking a link
      if (navMenu && navMenu.classList.contains('show') && bsCollapse) {
        bsCollapse.hide();
      }
    });
  });

  /* -------------------------------------------------------------
     3. SCROLL REVEAL ANIMATIONS (IntersectionObserver)
  ------------------------------------------------------------- */
  var revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    var revealObserver = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var delay = entry.target.getAttribute('data-reveal-delay') || 0;
            entry.target.style.setProperty('--reveal-delay', delay + 'ms');
            entry.target.classList.add('revealed');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('revealed'); });
  }

  /* -------------------------------------------------------------
     4. SKILL FILTERING
  ------------------------------------------------------------- */
  var filterButtons = document.querySelectorAll('.filter-btn');
  var skillPills = document.querySelectorAll('.skill-pill');
  var filterEmptyMsg = document.getElementById('filterEmpty');

  filterButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterButtons.forEach(function (b) {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      var filter = btn.getAttribute('data-filter');
      var visibleCount = 0;

      skillPills.forEach(function (pill) {
        var categories = (pill.getAttribute('data-category') || '').split(' ');
        var show = filter === 'all' || categories.indexOf(filter) !== -1;
        pill.classList.toggle('pill-hidden', !show);
        if (show) visibleCount++;
      });

      if (filterEmptyMsg) {
        filterEmptyMsg.classList.toggle('d-none', visibleCount !== 0);
      }
    });
  });

  /* -------------------------------------------------------------
     5. EXPAND / COLLAPSE (timeline responsibilities & platform details)
  ------------------------------------------------------------- */
  document.querySelectorAll('.expand-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var targetId = btn.getAttribute('aria-controls');
      var content = document.getElementById(targetId);
      var expanded = btn.getAttribute('aria-expanded') === 'true';

      btn.setAttribute('aria-expanded', String(!expanded));
      content.classList.toggle('expanded', !expanded);

      var label = btn.querySelector('span');
      if (label) {
        label.textContent = expanded ? label.dataset.collapsedText || label.textContent.replace('Hide', 'View') : label.textContent.replace('View', 'Hide');
      }
    });
  });

  /* -------------------------------------------------------------
     6. BACK TO TOP BUTTON
  ------------------------------------------------------------- */
  var backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener(
      'scroll',
      function () {
        backToTop.classList.toggle('visible', window.scrollY > 480);
      },
      { passive: true }
    );
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    });
  }

  /* -------------------------------------------------------------
     7. BUTTON RIPPLE EFFECT
  ------------------------------------------------------------- */
  document.querySelectorAll('.btn-primary-gradient, .btn-outline-glow, .btn-nav-resume').forEach(function (btn) {
    btn.style.position = btn.style.position || 'relative';
    btn.addEventListener('click', function (e) {
      if (prefersReducedMotion) return;
      var rect = btn.getBoundingClientRect();
      var ripple = document.createElement('span');
      var size = Math.max(rect.width, rect.height);
      ripple.className = 'ripple';
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = e.clientX - rect.left - size / 2 + 'px';
      ripple.style.top = e.clientY - rect.top - size / 2 + 'px';
      btn.appendChild(ripple);
      window.setTimeout(function () { ripple.remove(); }, 650);
    });
  });

  /* -------------------------------------------------------------
     8. CONTACT FORM VALIDATION (client-side only, static site)
  ------------------------------------------------------------- */
  var contactForm = document.getElementById('contactForm');
  var formSuccess = document.getElementById('formSuccess');
  var mailtoFallback = document.getElementById('mailtoFallback');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!contactForm.checkValidity()) {
        contactForm.classList.add('was-validated');
        var firstInvalid = contactForm.querySelector(':invalid');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      contactForm.classList.add('was-validated');

      var name = contactForm.querySelector('#cf-name').value.trim();
      var email = contactForm.querySelector('#cf-email').value.trim();
      var type = contactForm.querySelector('#cf-type').value;
      var message = contactForm.querySelector('#cf-message').value.trim();

      // Build a mailto: fallback so the person can send the message manually.
      var subject = encodeURIComponent('Project Inquiry: ' + type);
      var body = encodeURIComponent(
        'Name: ' + name + '\n' +
        'Email: ' + email + '\n' +
        'Project Type: ' + type + '\n\n' +
        'Message:\n' + message
      );
      var mailtoUrl = 'mailto:mahmadraza3486@gmail.com?subject=' + subject + '&body=' + body;

      if (mailtoFallback) {
        mailtoFallback.setAttribute('href', mailtoUrl);
      }

      if (formSuccess) {
        formSuccess.classList.remove('d-none');
        formSuccess.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'nearest' });
      }
    });

    // Reset the success message once the person starts editing again
    contactForm.addEventListener('input', function () {
      if (formSuccess && !formSuccess.classList.contains('d-none')) {
        formSuccess.classList.add('d-none');
      }
    });
  }
});