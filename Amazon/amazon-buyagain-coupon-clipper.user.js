// ==UserScript==
// @name         Amazon BuyAgain Clip Coupons
// @namespace    ChatGPT
// @version      0.2
// @description  Clicks on checkboxes on the Amazon Buy Again page with a specific aria-label pattern (coupons)
// @author       ChatGPT
// @match        https://www.amazon.ca/gp/buyagain*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to click on checkboxes with a specific aria-label pattern
    function clickCheckboxes() {
        var checkboxes = document.querySelectorAll('input[type="checkbox"][aria-label^="Save $"]');
        checkboxes.forEach(function(checkbox) {
            checkbox.click();
        });
    }

    // Callback function for the mutation observer
    function mutationCallback(mutationsList, observer) {
        for (var mutation of mutationsList) {
            if (mutation.type === 'childList') {
                clickCheckboxes();
            }
        }
    }

    // Create a mutation observer to watch for changes in the DOM
    var observer = new MutationObserver(mutationCallback);

    // Options for the observer (watch for changes in child elements)
    var observerConfig = { childList: true, subtree: true };

    // Start observing the target node for mutations
    observer.observe(document.body, observerConfig);

    // Initial check when the page has finished loading
    window.addEventListener('load', function() {
        clickCheckboxes();
    });
})();
