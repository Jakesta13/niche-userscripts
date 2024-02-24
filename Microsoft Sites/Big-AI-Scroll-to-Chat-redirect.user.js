// ==UserScript==
// @name         Say No to Bing AI scroll-to-chat
// @namespace    ChatGPT
// @version      0.1
// @description  Change bing's AI scroll-toggled chat is quickly navigated away from, to asist with disabling the AI if another script fails, it makes sure that &showconv= is set to "0" and update it immediately if it changes to "1"
// @author       ChatGPT / jakesta13
// @match        https://www.bing.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to check and manipulate the URL
    function checkURL() {
        let url = window.location.href;
        let showconv = "&showconv=";
        let updatedUrl = url;

        // Check if &showconv= exists in the URL
        if (url.includes(showconv)) {
            let showconvIndex = url.indexOf(showconv);
            let showconvValue = url.charAt(showconvIndex + showconv.length);

            // Check if showconvValue is not "0", update it to "0"
            if (showconvValue !== "0") {
                updatedUrl = url.slice(0, showconvIndex + showconv.length) + "0" + url.slice(showconvIndex + showconv.length + 1);
                window.location.href = updatedUrl; // Navigate to the updated URL
            }
        } else {
            // If &showconv= does not exist, add it with value "0"
            updatedUrl = url + "&showconv=0";
            window.location.href = updatedUrl; // Navigate to the updated URL
        }
    }

    // Observe changes to the URL
    let observer = new MutationObserver(checkURL);
    observer.observe(document.documentElement, {childList: true, subtree: true});

})();
