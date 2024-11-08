// ==UserScript==
// @name         Redirect to Ninite Pro
// @namespace    ChatGPT
// @version      2.0
// @description  Redirects to Ninite Pro interface if "Signed in as" is found
// @author       ChatGPT
// @match        https://ninite.com/
// @match        https://ninite.com/welcome
// @updateURL https://github.com/Jakesta13/niche-userscripts/raw/refs/heads/main/MSC-Very-Niche-Sites/Ninite-Redirect-to-Pro-if-Logged-in.user.js
// @downloadURL https://github.com/Jakesta13/niche-userscripts/raw/refs/heads/main/MSC-Very-Niche-Sites/Ninite-Redirect-to-Pro-if-Logged-in.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to check if the specified element with innerHTML is present
    function checkElement() {
        var targetElement = document.querySelector('a.dropdown-toggle');
        if (targetElement && targetElement.innerHTML.includes('Signed in as')) {
            // Redirect to the desired URL
            window.location.href = 'https://ninite.com/pro-interface/';
        }
    }

    // Check the element on page load
    checkElement();

    // You can also use mutation observers to check for changes in the DOM
    // and call checkElement() when necessary.

    // Example using a mutation observer
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            checkElement();
        });
    });

    // Start observing changes in the DOM
    observer.observe(document.body, { subtree: true, childList: true });
})();
