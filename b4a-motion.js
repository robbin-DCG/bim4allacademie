(function(){
  if (window.__b4aReveal) return; window.__b4aReveal = true;
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var seen = new WeakSet(), counted = new WeakSet(), busy = false;
  var io = reduce ? null : new IntersectionObserver(function(es){ es.forEach(function(e){ if (e.isIntersecting) { busy = true; e.target.classList.add('b4a-in'); busy = false; io.unobserve(e.target); } }); }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });
  function count(el){
    var raw = el.textContent.trim(); var m = raw.match(/^([^0-9]*)([0-9][0-9.,]*)(.*)$/); if (!m) return;
    var num = parseFloat(m[2].replace(/\./g,'').replace(',','.')); if (isNaN(num)) return;
    var dec = (m[2].split(',')[1]||'').length; var t0 = performance.now(), dur = 1100;
    var span = document.createElement('span'); span.textContent = m[1]+(dec?'0,'+'0'.repeat(dec):'0')+m[3];
    var inner = el.firstChild; if (!inner || inner.nodeType !== 3) return;
    busy = true; inner.textContent = ''; el.appendChild(span); busy = false;
    function tick(t){ var p = Math.min(1,(t-t0)/dur); p = 1-Math.pow(1-p,3); var v = num*p;
      var s = dec ? v.toFixed(dec).replace('.',',') : Math.round(v).toLocaleString('nl-NL');
      span.textContent = p < 1 ? m[1]+s+m[3] : raw; if (p<1) requestAnimationFrame(tick); }
    requestAnimationFrame(tick);
  }
  function scan(){
    var root = document.querySelector('[data-screen-label]'); if (!root) return;
    var secs = root.querySelectorAll(':scope > main > section, :scope > main > div > section, :scope > main > article, :scope > section, :scope > div > section, :scope > article');
    busy = true;
    secs.forEach(function(sec, i){
      if (i === 0 || seen.has(sec)) return; seen.add(sec);
      var inner = sec.firstElementChild; if (!inner) return;
      Array.prototype.forEach.call(inner.children, function(ch){
        if (seen.has(ch)) return; seen.add(ch);
        var kids = ch.children.length;
        var isGrid = /grid|flex/.test(getComputedStyle(ch).display) && kids >= 3 && kids <= 12 && !ch.querySelector('h1,h2') && ch.tagName !== 'P';
        ch.classList.add(isGrid ? 'b4a-stagger' : 'b4a-reveal');
        if (io) io.observe(ch); else ch.classList.add('b4a-in');
      });
      if (!reduce) sec.querySelectorAll('[data-count]').forEach(function(el){ if (counted.has(el)) return; counted.add(el);
        new IntersectionObserver(function(es, o){ if (es[0].isIntersecting) { count(el); o.disconnect(); } }, { threshold: 0.4 }).observe(el); });
    });
    busy = false;
  }
  // Streaming/hydratie: beperkt aantal herscans, geen doorlopende observer op body.
  var tries = 0, t;
  function schedule(){ clearTimeout(t); t = setTimeout(function(){ scan(); if (++tries < 12) schedule(); }, tries < 4 ? 250 : 800); }
  var mo = new MutationObserver(function(recs){ if (busy) return; if (recs.some(function(r){ return r.addedNodes.length; })) { tries = Math.min(tries, 6); schedule(); } });
  function start(){ scan(); schedule(); mo.observe(document.body, { childList: true, subtree: true }); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();

// Export-modus: op een statische host bestaan geen "… v4.dc.html"-bestanden; vertaal interne links naar slugs.
(function(){
  if (window.__b4aLinks) return; window.__b4aLinks = true;
  if (/ v4\.dc\.html|%20v4\.dc\.html/.test(location.pathname)) return;
  var slug = function(n){ n = decodeURIComponent(n).replace(/ v4\.dc\.html$/, ''); if (n === 'Homepage') return 'index'; return n.toLowerCase().replace(/[^a-z0-9]+/g, '-'); };
  function fix(root){ root.querySelectorAll('a[href*="v4.dc.html"]').forEach(function(a){ var h = a.getAttribute('href'); var m = h.match(/^([^?#]+v4\.dc\.html)(.*)$/); if (m) a.setAttribute('href', slug(m[1]) + '.html' + m[2]); }); }
  var mo = new MutationObserver(function(){ clearTimeout(mo.t); mo.t = setTimeout(function(){ fix(document); }, 60); });
  function start(){ fix(document); mo.observe(document.body, { childList: true, subtree: true }); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();

// SEO: canonical + og:url volgen de detailparameter (?o=, ?a=, ?id=) zodat elke detailpagina een eigen URL heeft.
(function b4aCanonical(){ try { var q = new URLSearchParams(location.search); var key = ['o','a','id'].find(function(k){ return q.get(k); }); if (!key) return; var c = document.querySelector('link[data-b4a-canonical]'); var og = document.querySelector('meta[data-b4a-ogurl]'); if (!c) return; var u = c.getAttribute('href').replace(/\/$/, '') + '?' + key + '=' + encodeURIComponent(q.get(key)); c.setAttribute('href', u); if (og) og.setAttribute('content', u); } catch (e) {} })();
