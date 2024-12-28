// ==UserScript==
// @name         Discord Direct to App
// @namespace    https://github.com/Jakesta13
// @version      1.0
// @description  Automatically navigates to Discord chat if logged in (with redundancy check using data-testid and MutationObserver).
// @author       Gemini, Jakesta13
// @match        https://discord.com/
// @grant        none
// @updateURL    https://github.com/Jakesta13/niche-userscripts/raw/refs/heads/main/MSC-Very-Niche-Sites/discord-skip-landing.user.js  // Update URL points to your script location
// @downloadURL  https://github.com/Jakesta13/niche-userscripts/raw/refs/heads/main/MSC-Very-Niche-Sites/discord-skip-landing.user.js  // Download URL points to your script location
// ==/UserScript==

(function() {
    'use strict';

    function navigateToDiscord() {
        const discordAppURL = "https://discord.com/channels/@me";
        if(window.location.href != discordAppURL){
            window.location.href = discordAppURL;
        }
    }

    // Create a new MutationObserver
    const observer = new MutationObserver(mutations => {
        // This function will be called whenever there's a change in the DOM

        const loginButton = document.querySelector('.login-button-js');
        const openInBrowserButton = document.querySelector('[data-testid="button-open-discord-in-browser"]');

        // Check if either button exists. If so, navigate and disconnect the observer.
        if (loginButton || openInBrowserButton) {
            navigateToDiscord();
            observer.disconnect(); // Stop observing once we've redirected
        }
    });

    // Start observing the entire document for changes
    observer.observe(document, { childList: true, subtree: true });

    //Initial check, in case the element is already there when the script runs
    const loginButton = document.querySelector('.login-button-js');
    const openInBrowserButton = document.querySelector('[data-testid="button-open-discord-in-browser"]');

    if (loginButton || openInBrowserButton) {
        navigateToDiscord();
        observer.disconnect();
    }
})();