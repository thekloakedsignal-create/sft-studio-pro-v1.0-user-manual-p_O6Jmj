(function () {
  'use strict';

  function ready(fn) {
    if (document.readyState !== 'loading') {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

  ready(function () {
    var btn = document.getElementById('menuBtn');
    var backdrop = document.getElementById('backdrop');
    var sidebar = document.getElementById('sidebar');

    // The sidebar drawer is useless without both its toggle and its scrim.
    if (!btn || !backdrop) {
      return;
    }

    function isOpen() {
      return document.body.classList.contains('sidebar-open');
    }

    function setOpen(open) {
      document.body.classList.toggle('sidebar-open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      // Keep the [hidden] attribute in sync so the scrim only exists while open.
      backdrop.hidden = !open;
    }

    btn.addEventListener('click', function () {
      setOpen(!isOpen());
    });

    backdrop.addEventListener('click', function () {
      setOpen(false);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && isOpen()) {
        setOpen(false);
      }
    });

    // Close the drawer after navigation so it doesn't cover the new page.
    if (sidebar) {
      sidebar.addEventListener('click', function (event) {
        if (event.target.closest('a')) {
          setOpen(false);
        }
      });
    }
  });
})();