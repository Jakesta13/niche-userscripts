// ==UserScript==
// @name         Return to Bing Search Results
// @namespace    ChatGPT/jakesta13 Edited
// @author       ChatGPT
// @version      1.0
// @description  Navigate back in history on Bing's homepage - Only use this if you do not use bing's homepage, I don't know what happens if you have no history
// @match        https://www.bing.com/
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // Function to check if the previous history entry contains a search URL
    function shouldNavigateBack() {
        const currentURL = window.location.href;
        // May use this to check if there is a history.
        const previousURL = document.referrer;

        // Check if the current URL is Bing's homepage
        if (currentURL === "https://www.bing.com/" ) {
            return true;
        }

        return false;
    }

    // Check if we should navigate back and do so if needed
    if (shouldNavigateBack()) {
        // Simulate a click on the browser's back button
        window.history.back();
    }
})();
