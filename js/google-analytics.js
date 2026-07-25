(function () {
  var GA_MEASUREMENT_ID = 'G-T9M06KNVTQ';

  if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID.indexOf('XXXXXXXXXX') !== -1) {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;
  gtag('js', new Date());

  var script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_MEASUREMENT_ID;
  script.onload = function () {
    gtag('config', GA_MEASUREMENT_ID);
  };
  document.head.appendChild(script);
})();
