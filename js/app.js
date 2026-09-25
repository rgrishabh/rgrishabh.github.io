/* rgrishabh.in — all page behaviour. No dependencies.
   The page is complete and readable if this file never loads. */
(() => {
  'use strict';

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* ── year ─────────────────────────────────────────────────────────────── */
  const yr = $('#yr');
  if (yr) yr.textContent = new Date().getFullYear();

  /* ── theme ────────────────────────────────────────────────────────────── */
  const root = document.documentElement;
  const themeBtn = $('#theme-btn');
  const syncTheme = () => {
    const light = root.getAttribute('data-theme') === 'light';
    // Name the DESTINATION, not a pressed state — "pressed" does not tell a
    // screen-reader user which theme they would get.
    themeBtn.setAttribute('aria-label', light ? 'Switch to dark theme' : 'Switch to light theme');
    $('meta[name="theme-color"]').setAttribute('content', light ? '#fbfbfd' : '#08090c');
  };
  if (themeBtn) {
    syncTheme();
    themeBtn.addEventListener('click', () => {
      const light = root.getAttribute('data-theme') === 'light';
      root.setAttribute('data-theme', light ? 'dark' : 'light');
      try { localStorage.setItem('theme', light ? 'dark' : 'light'); } catch (e) {}
      syncTheme();
    });
  }

  /* ── mobile drawer ────────────────────────────────────────────────────── */
  const navBtn = $('#nav-btn');
  const drawer = $('#drawer');
  if (navBtn && drawer) {
    const setOpen = (open) => {
      drawer.dataset.open = String(open);
      navBtn.setAttribute('aria-expanded', String(open));
      navBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      document.body.style.overflow = open ? 'hidden' : '';
      if (open) drawer.querySelector('a')?.focus();
    };

    navBtn.addEventListener('click', () => setOpen(drawer.dataset.open !== 'true'));
    drawer.addEventListener('click', (e) => { if (e.target.tagName === 'A') setOpen(false); });

    document.addEventListener('keydown', (e) => {
      if (drawer.dataset.open !== 'true') return;
      if (e.key === 'Escape') { setOpen(false); navBtn.focus(); return; }
      if (e.key !== 'Tab') return;
      // Keep focus inside the drawer while it covers the page.
      const items = [navBtn, ...$$('a', drawer)];
      const i = items.indexOf(document.activeElement);
      if (i === -1) return;
      const next = e.shiftKey ? i - 1 : i + 1;
      if (next < 0 || next >= items.length) { e.preventDefault(); items[e.shiftKey ? items.length - 1 : 0].focus(); }
    });

    // A resize past the desktop breakpoint must not leave the body scroll-locked.
    matchMedia('(min-width: 900px)').addEventListener('change', (m) => { if (m.matches) setOpen(false); });
  }

  /* ── reveal on scroll ─────────────────────────────────────────────────── */
  const reveals = $$('.reveal');
  if (reduce || !('IntersectionObserver' in window)) {
    reveals.forEach(el => el.classList.add('in'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.1, rootMargin: '0px 0px -5%' });
    reveals.forEach(el => io.observe(el));
  }

  /* ── terminal ─────────────────────────────────────────────────────────── */
  const term = $('#term');
  if (term) {
    // Every value here is a real fact from the résumé. Nothing is invented,
    // and nothing is dressed up as live telemetry.
    const OUT = {
      whoami: [
        ['$ ', 'whoami'],
        ['role      ', 'Senior Software Engineer, DevOps'],
        ['at        ', 'Tarento — Bhashini, Govt. of India'],
        ['based     ', 'Noida, India'],
        ['certified ', 'AWS Solutions Architect – Associate'],
      ],
      stack: [
        ['$ ', 'stack'],
        ['cloud     ', 'AWS'],
        ['container ', 'Kubernetes · Docker'],
        ['iac       ', 'Terraform · Ansible'],
        ['gitops    ', 'Argo CD · Kustomize'],
        ['ci/cd     ', 'Jenkins · GitHub Actions'],
        ['observe   ', 'Prometheus · Grafana · ELK'],
      ],
      now: [
        ['$ ', 'now'],
        ['building  ', 'GPU Kubernetes for speech and translation models'],
        ['studying  ', 'MBA, Finance & IT — LPU'],
        ['open to   ', 'DevOps · Platform · SRE roles'],
      ],
    };

    // Screen readers get the finished text at once; the visual pane types.
    const live = document.createElement('span');
    live.className = 'sr-only';
    term.after(live);
    term.setAttribute('aria-hidden', 'true');
    term.removeAttribute('aria-live');
    term.removeAttribute('role');
    live.setAttribute('aria-live', 'polite');

    let token = 0;
    const render = (key) => {
      const rows = OUT[key];
      if (!rows) return;
      const run = ++token;
      term.textContent = '';
      live.textContent = rows.map(([k, v]) => k.trim() + ' ' + v).join('. ');

      const write = (i) => {
        if (run !== token || i >= rows.length) return;
        const [k, v] = rows[i];
        const line = document.createElement('div');
        const ks = document.createElement('span');
        ks.className = i === 0 ? 'term__prompt' : 'term__key';
        ks.textContent = k;
        const vs = document.createElement('span');
        vs.className = i === 0 ? 'term__val' : 'term__val';
        line.append(ks, vs);
        term.append(line);

        if (reduce) { vs.textContent = v; write(i + 1); return; }
        let c = 0;
        const tick = () => {
          if (run !== token) return;
          vs.textContent = v.slice(0, ++c);
          if (c < v.length) setTimeout(tick, 16);
          else setTimeout(() => write(i + 1), 90);
        };
        tick();
      };
      write(0);
    };

    const btns = $$('.term__cmd');
    btns.forEach(b => b.addEventListener('click', () => {
      btns.forEach(o => o.setAttribute('aria-pressed', String(o === b)));
      render(b.dataset.cmd);
    }));

    if (reduce || !('IntersectionObserver' in window)) {
      render('whoami');
    } else {
      const to = new IntersectionObserver((e) => {
        if (e[0].isIntersecting) { to.disconnect(); render('whoami'); }
      }, { threshold: 0.25 });
      to.observe(term);
    }
  }

  /* ── nav current-section highlight ────────────────────────────────────── */
  const links = $$('.nav a');
  if (links.length && 'IntersectionObserver' in window) {
    const byId = new Map(links.map(a => [a.getAttribute('href').slice(1), a]));
    const io2 = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        const a = byId.get(en.target.id);
        if (a && en.isIntersecting) {
          links.forEach(l => l.removeAttribute('aria-current'));
          a.setAttribute('aria-current', 'true');
        }
      });
    }, { rootMargin: '-45% 0px -50%' });
    [...byId.keys()].forEach(id => { const s = document.getElementById(id); if (s) io2.observe(s); });
  }
})();
