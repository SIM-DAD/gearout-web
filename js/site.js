/* GearOut site script: the navigation toggle and a cookie-free page counter. */
(function () {
  'use strict';

  // Navigation toggle (mobile). The nav is visible without JavaScript on wide screens
  // through CSS; this only manages the collapsed state on narrow screens.
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    var mq = window.matchMedia('(max-width: 47.99rem)');
    function applyState(open) {
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (mq.matches) {
        if (open) { nav.removeAttribute('hidden'); } else { nav.setAttribute('hidden', ''); }
      } else {
        nav.removeAttribute('hidden');
      }
    }
    applyState(false);
    toggle.addEventListener('click', function () {
      applyState(toggle.getAttribute('aria-expanded') !== 'true');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        applyState(false);
        toggle.focus();
      }
    });
    if (mq.addEventListener) {
      mq.addEventListener('change', function () { applyState(false); });
    }
  }

  // First-party page counter: aggregate daily counts of site and path only. No cookie,
  // no identifier, nothing stored in the browser. Honors Do Not Track.
  try {
    var dnt = navigator.doNotTrack === '1' || window.doNotTrack === '1';
    if (!dnt && navigator.sendBeacon) {
      var body = JSON.stringify({ site: 'gearout', path: location.pathname });
      navigator.sendBeacon('https://simdad-hits.ap-493.workers.dev/hit', new Blob([body], { type: 'application/json' }));
    }
  } catch (err) {
    /* counting is optional */
  }
})();
