(function () {
  // Keep local previews and the private editor out of production analytics.
  if (!['pao-os.com', 'www.pao-os.com'].includes(window.location.hostname) ||
      /^\/editor(?:\/|$)/.test(window.location.pathname) ||
      document.getElementById('pao-google-tag')) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', 'G-5KZRZBXREL');

  var tag = document.createElement('script');
  tag.id = 'pao-google-tag';
  tag.async = true;
  tag.src = 'https://www.googletagmanager.com/gtag/js?id=G-5KZRZBXREL';
  document.head.appendChild(tag);
})();
