// Only intercept fragments on the current document. Real page links stay native.
export function localSectionId(destination, current) {
  try {
    const page = new URL(current), target = new URL(destination, page);
    if (target.origin !== page.origin || target.pathname !== page.pathname || target.search !== page.search || !target.hash) return null;
    return decodeURIComponent(target.hash.slice(1)) || null;
  } catch { return null; }
}
export function scrollToSection(target, keyboard = false) {
  requestAnimationFrame(() => {
    if (window.location.hash) {
      window.history.replaceState(window.history.state, '', window.location.pathname + window.location.search);
      window.dispatchEvent(new Event('hashchange'));
    }
    if (keyboard) {
      const temporary = !target.hasAttribute('tabindex') && target.tabIndex < 0;
      if (temporary) target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
      if (temporary) target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
    }
    target.scrollIntoView({ behavior: keyboard || matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
  });
}
