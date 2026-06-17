/* КУПУЙ АВТО — керування лого-прелоадером.
   Знімає оверлей після завантаження сторінки. Показує анімацію 1 раз/сесію.
   Усі гілки мають фолбек: навіть якщо цей скрипт не виконається, оверлей
   зникне сам через CSS @keyframes kapFailsafe. */
(function () {
  var el = document.getElementById('kaPreloader');
  if (!el) return;

  function remove() {
    if (el && el.parentNode) el.parentNode.removeChild(el);
    el = null;
  }

  // Уже показували в цій сесії → миттєвий вхід без анімації.
  if (document.documentElement.classList.contains('kap-seen')) {
    remove();
    return;
  }

  var MIN_MS = 1550;          // даємо хореографії дограти
  var MAX_MS = 4000;          // стеля очікування load (повільна мережа)
  var start = Date.now();
  var fired = false;

  function done() {
    if (!el) return;
    el.classList.add('kap-done');
    try { sessionStorage.setItem('kaSplash', '1'); } catch (e) {}
    setTimeout(remove, 600); // після fade-out прибрати з DOM
  }

  function finish() {
    if (fired) return;
    fired = true;
    var wait = Math.max(0, MIN_MS - (Date.now() - start));
    setTimeout(done, wait);
  }

  window.addEventListener('load', finish);
  setTimeout(finish, MAX_MS); // фолбек, якщо 'load' не настане
})();
