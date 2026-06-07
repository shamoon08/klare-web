/* ── Hamburger menu ── */
(function () {
  var hamburger = document.querySelector('.hamburger');
  var closeBtn = document.querySelector('.menu-close');
  var mobileNav = document.querySelector('.mobile-nav');

  if (hamburger) {
    hamburger.addEventListener('click', function () {
      document.body.classList.add('menu-open');
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', function () {
      document.body.classList.remove('menu-open');
    });
  }

  if (mobileNav) {
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        document.body.classList.remove('menu-open');
      });
    });
  }

  document.addEventListener('click', function (e) {
    if (
      document.body.classList.contains('menu-open') &&
      mobileNav &&
      !mobileNav.contains(e.target) &&
      hamburger &&
      !hamburger.contains(e.target)
    ) {
      document.body.classList.remove('menu-open');
    }
  });
})();

/* ── Filter tabs (products page) ── */
(function () {
  var tabs = document.querySelectorAll('.filter-tab');
  var cards = document.querySelectorAll('.product-card[data-category]');
  if (!tabs.length) return;

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) { t.classList.remove('active'); });
      tab.classList.add('active');

      var filter = tab.getAttribute('data-filter');
      cards.forEach(function (card) {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.parentElement.style.display = '';
        } else {
          card.parentElement.style.display = 'none';
        }
      });
    });
  });
})();

/* ── FAQ accordion (about page) ── */
(function () {
  var items = document.querySelectorAll('.faq-item');
  if (!items.length) return;

  items.forEach(function (item) {
    var question = item.querySelector('.faq-question');
    var answer = item.querySelector('.faq-answer');
    if (!question || !answer) return;

    question.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');

      items.forEach(function (i) {
        i.classList.remove('open');
        var a = i.querySelector('.faq-answer');
        if (a) a.classList.remove('open');
      });

      if (!isOpen) {
        item.classList.add('open');
        answer.classList.add('open');
      }
    });
  });
})();

/* ── Lightbox (about page proof images) ── */
(function () {
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightbox-img');
  var closeBtn = document.querySelector('.lightbox-close');
  if (!lightbox) return;

  document.querySelectorAll('.proof-img[data-src]').forEach(function (el) {
    el.addEventListener('click', function () {
      var src = el.getAttribute('data-src');
      lightboxImg.src = src;
      lightbox.classList.add('open');
    });
  });

  function closeLightbox() { lightbox.classList.remove('open'); lightboxImg.src = ''; }

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeLightbox();
  });
})();

/* ── Order form submission ── */
(function () {
  var form = document.getElementById('order-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var name    = form.querySelector('[name="name"]').value.trim();
    var phone   = form.querySelector('[name="phone"]').value.trim();
    var city    = form.querySelector('[name="city"]').value.trim();
    var address = form.querySelector('[name="address"]').value.trim();
    var product = form.querySelector('[name="product"]').value;
    var qty     = form.querySelector('[name="quantity"]').value;
    var notes   = form.querySelector('[name="notes"]').value.trim();

    var confirmEl = document.getElementById('order-confirm');
    var confirmPhone = document.getElementById('confirm-phone');
    if (confirmPhone) confirmPhone.textContent = phone;
    if (confirmEl) confirmEl.classList.add('show');

    var msg = 'Hello KLARE! I would like to place an order:\n\n'
      + 'Name: ' + name + '\n'
      + 'Phone: ' + phone + '\n'
      + 'City: ' + city + '\n'
      + 'Address: ' + address + '\n'
      + 'Product: ' + product + '\n'
      + 'Quantity: ' + qty + '\n'
      + (notes ? 'Notes: ' + notes + '\n' : '')
      + '\nPlease confirm my order. Thank you!';

    var waUrl = 'https://wa.me/923001234567?text=' + encodeURIComponent(msg);
    window.open(waUrl, '_blank');

    if (confirmEl) confirmEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
})();
