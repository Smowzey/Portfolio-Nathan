/**
 * Gestion du consentement aux cookies (RGPD)
 * Google Tag Manager n'est chargé qu'après acceptation explicite.
 */
(function () {
    'use strict';

    var GTM_ID = 'GTM-WM6NF7V3';
    var STORAGE_KEY = 'cookie_consent'; // 'granted' | 'denied'

    function getConsent() {
        try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
    }

    function setConsent(value) {
        try { localStorage.setItem(STORAGE_KEY, value); } catch (e) {}
    }

    function loadGTM() {
        if (window.__gtmLoaded) return;
        window.__gtmLoaded = true;
        (function (w, d, s, l, i) {
            w[l] = w[l] || [];
            w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
            var f = d.getElementsByTagName(s)[0],
                j = d.createElement(s),
                dl = l != 'dataLayer' ? '&l=' + l : '';
            j.async = true;
            j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
            f.parentNode.insertBefore(j, f);
        })(window, document, 'script', 'dataLayer', GTM_ID);
    }

    function hideBanner() {
        var b = document.getElementById('cookie-banner');
        if (b) b.classList.remove('show');
    }

    function showBanner() {
        var b = document.getElementById('cookie-banner');
        if (b) b.classList.add('show');
    }

    function buildBanner() {
        if (document.getElementById('cookie-banner')) return;
        var banner = document.createElement('div');
        banner.id = 'cookie-banner';
        banner.className = 'cookie-banner';
        banner.setAttribute('role', 'dialog');
        banner.setAttribute('aria-label', 'Consentement aux cookies');
        banner.innerHTML =
            '<div class="cookie-banner-text">' +
                '<strong>Ce site utilise des cookies</strong>' +
                '<p>J\'utilise des cookies de mesure d\'audience (Google Tag Manager) pour comprendre la fréquentation du site. Ils ne sont déposés qu\'avec votre accord. ' +
                '<a href="cookies.html">En savoir plus</a></p>' +
            '</div>' +
            '<div class="cookie-banner-actions">' +
                '<button type="button" class="btn btn-outline cookie-btn" id="cookie-refuse">Refuser</button>' +
                '<button type="button" class="btn btn-primary cookie-btn" id="cookie-accept">Accepter</button>' +
            '</div>';
        document.body.appendChild(banner);

        document.getElementById('cookie-accept').addEventListener('click', function () {
            setConsent('granted');
            loadGTM();
            hideBanner();
        });
        document.getElementById('cookie-refuse').addEventListener('click', function () {
            setConsent('denied');
            hideBanner();
        });
    }

    // Permet de rouvrir le bandeau depuis un lien "Gérer les cookies"
    window.openCookieSettings = function () {
        buildBanner();
        showBanner();
    };

    document.addEventListener('DOMContentLoaded', function () {
        var consent = getConsent();
        if (consent === 'granted') {
            loadGTM();
            return;
        }
        buildBanner();
        if (consent !== 'denied') {
            showBanner();
        }
    });
})();
