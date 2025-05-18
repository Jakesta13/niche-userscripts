// ==UserScript==
// @name        Patreon Hide "Get App" Button
// @namespace   https://github.com/jakesta13
// @version      1.0
// @description  Hides the distracting "Get App" button on Patreon
// @author       ChatGPT
// @match        https://www.patreon.com/*
// @grant        none
// @downloadURL https://github.com/Jakesta13/niche-userscripts/raw/refs/heads/main/MSC-Very-Niche-Sites/Patreon-hide-Get-App.user.js
// @updateURL https://github.com/Jakesta13/niche-userscripts/raw/refs/heads/main/MSC-Very-Niche-Sites/Patreon-hide-Get-App.user.js
// ==/UserScript==

(function() {
    'use strict';

    function removeGetAppButton() {
        const buttons = document.querySelectorAll('button');

        for (const button of buttons) {
            if (button.innerText.trim().toLowerCase() === 'get app') {
                button.closest('div[class*="cm-"]')?.remove();
            }
        }
    }

    // Try immediately and also observe future changes
    removeGetAppButton();

    const observer = new MutationObserver(() => {
        removeGetAppButton();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();
