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

    var waUrl = 'https://wa.me/923456901219?text=' + encodeURIComponent(msg);
    window.open(waUrl, '_blank');

    if (confirmEl) confirmEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
})();

/* ── Product detail page: initialise from URL query ── */
(function () {
  var section = document.getElementById('product-detail-page');
  if (!section) return;

  var id = new URLSearchParams(window.location.search).get('id');
  if (!id || !window.PRODUCTS || !window.PRODUCTS[id]) {
    window.location.href = 'products.html';
    return;
  }
  var p = window.PRODUCTS[id];

  /* page meta */
  document.title = p.name + ' | KLARE';
  var metaDesc = document.getElementById('meta-desc');
  if (metaDesc) metaDesc.setAttribute('content', p.shortDesc);

  /* breadcrumb */
  var bcBrand = document.getElementById('breadcrumb-brand');
  var bcName  = document.getElementById('breadcrumb-name');
  if (bcBrand) {
    bcBrand.textContent = p.brand === 'balea' ? 'Balea' : 'Babylove';
    bcBrand.href = p.brand === 'balea' ? 'product-balea.html' : 'product-babylove.html';
  }
  if (bcName) bcName.textContent = p.name;

  /* gallery */
  var mainImg       = document.getElementById('gallery-main-img');
  var thumbsWrap    = document.getElementById('gallery-thumbs');
  if (mainImg && thumbsWrap && p.images.length) {
    mainImg.src = 'products/' + p.folder + '/' + p.images[0];
    mainImg.alt = p.name;
    p.images.forEach(function (file, i) {
      var src = 'products/' + p.folder + '/' + file;
      var img = document.createElement('img');
      img.src = src;
      img.alt = p.name + ' photo ' + (i + 1);
      img.className = 'gallery-thumb' + (i === 0 ? ' active' : '');
      img.addEventListener('click', function () {
        mainImg.src = this.src;
        thumbsWrap.querySelectorAll('.gallery-thumb').forEach(function (t) { t.classList.remove('active'); });
        this.classList.add('active');
      });
      thumbsWrap.appendChild(img);
    });
  }

  /* product info */
  var nameEl  = document.getElementById('product-name');
  var priceEl = document.getElementById('product-price');
  var waBtn   = document.getElementById('order-wa-btn');
  if (nameEl)  nameEl.textContent  = p.name;
  if (priceEl) priceEl.textContent = p.price;
  if (waBtn)   waBtn.href = 'https://wa.me/923456901219?text=I%20want%20to%20order%3A%20' + p.waText;

  /* description sections */
  function setHTML(id, html) {
    var el = document.getElementById(id);
    if (el) el.innerHTML = html;
  }
  setHTML('product-description', '<h3>Description</h3><p>' + p.description + '</p>');
  setHTML('product-benefits',    '<h3>Key Benefits</h3><ul class="benefits-list">' + p.benefits.map(function (b) { return '<li>' + b + '</li>'; }).join('') + '</ul>');
  setHTML('product-usage',       '<h3>How to Use</h3><p>' + p.howToUse + '</p>');
  setHTML('product-ingredients', '<h3>Key Ingredients</h3><p>' + p.ingredients + '</p>');
  setHTML('product-suitable',    '<h3>Suitable For</h3><p>' + p.suitableFor + '</p>');

  /* set product ID on reviews section */
  var reviewsSec = document.getElementById('reviews-section');
  if (reviewsSec) reviewsSec.dataset.product = id;
})();

/* ── Product reviews (localStorage) ── */
(function () {
  var reviewsSec = document.getElementById('reviews-section');
  if (!reviewsSec) return;

  /* wait for product init to set data-product */
  function run() {
    var productId = reviewsSec.dataset.product;
    if (!productId) { setTimeout(run, 50); return; }

    var form        = document.getElementById('review-form');
    var listEl      = document.getElementById('reviews-list');
    var avgScoreEl  = document.getElementById('avg-score');
    var avgStarsEl  = document.getElementById('avg-stars-display');
    var countEl     = document.getElementById('review-count-display');
    var ratingInput = document.getElementById('rating-value');
    var starBtns    = document.querySelectorAll('.star-btn');
    var selectedRating = 0;

    /* --- star input --- */
    starBtns.forEach(function (btn, i) {
      btn.addEventListener('mouseenter', function () {
        starBtns.forEach(function (b, j) { b.style.color = j <= i ? '#FFB800' : '#ccc'; });
      });
      btn.addEventListener('mouseleave', function () {
        starBtns.forEach(function (b, j) { b.style.color = j < selectedRating ? '#FFB800' : '#ccc'; });
      });
      btn.addEventListener('click', function () {
        selectedRating = i + 1;
        if (ratingInput) ratingInput.value = selectedRating;
        starBtns.forEach(function (b, j) { b.style.color = j < selectedRating ? '#FFB800' : '#ccc'; });
      });
    });

    /* --- helpers --- */
    function getReviews() {
      try { return JSON.parse(localStorage.getItem('klare_reviews_' + productId) || '[]'); }
      catch (e) { return []; }
    }
    function saveReview(r) {
      var reviews = getReviews();
      reviews.unshift(r);
      try { localStorage.setItem('klare_reviews_' + productId, JSON.stringify(reviews)); } catch (e) {}
      return reviews;
    }
    function starsHTML(rating, size) {
      var html = '';
      for (var i = 1; i <= 5; i++) {
        html += '<span style="color:' + (i <= rating ? '#FFB800' : '#ccc') + ';font-size:' + (size || 18) + 'px">★</span>';
      }
      return html;
    }

    /* --- render --- */
    function renderAll(reviews) {
      if (avgScoreEl && countEl && avgStarsEl) {
        if (reviews.length) {
          var avg = (reviews.reduce(function (s, r) { return s + r.rating; }, 0) / reviews.length).toFixed(1);
          avgScoreEl.textContent = avg;
          avgStarsEl.innerHTML   = starsHTML(Math.round(parseFloat(avg)), 22);
          countEl.textContent    = reviews.length + ' review' + (reviews.length !== 1 ? 's' : '');
        } else {
          avgScoreEl.textContent = '—';
          avgStarsEl.innerHTML   = starsHTML(0, 22);
          countEl.textContent    = 'No reviews yet';
        }
      }

      if (!listEl) return;
      if (!reviews.length) {
        listEl.innerHTML = '<p class="no-reviews">No reviews yet — be the first to leave one!</p>';
        return;
      }
      listEl.innerHTML = reviews.map(function (r) {
        return '<div class="review-item">'
          + '<div class="review-header">'
          + '<span class="reviewer-name">' + escapeHTML(r.name) + '</span>'
          + '<div class="review-meta">' + starsHTML(r.rating, 15) + ' <span class="review-date">' + r.date + '</span></div>'
          + '</div>'
          + '<p class="review-body">' + escapeHTML(r.text) + '</p>'
          + '</div>';
      }).join('');
    }

    function escapeHTML(str) {
      return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
    }

    renderAll(getReviews());

    /* --- submit --- */
    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (!selectedRating) { alert('Please select a star rating before submitting.'); return; }
        var name = document.getElementById('reviewer-name').value.trim();
        var text = document.getElementById('review-text').value.trim();
        if (!name || !text) return;

        var review = {
          name: name,
          rating: selectedRating,
          text: text,
          date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
        };
        renderAll(saveReview(review));

        form.reset();
        selectedRating = 0;
        starBtns.forEach(function (b) { b.style.color = '#ccc'; });
        if (ratingInput) ratingInput.value = '';

        listEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      });
    }
  }

  run();
})();
