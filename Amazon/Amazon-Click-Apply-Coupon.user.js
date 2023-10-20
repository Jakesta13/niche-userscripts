// ==UserScript==
// @name         Amazon.ca Apply Now Clicker
// @namespace    ChatGPT/jakesta13 edited
// @author       ChatGPT
// @version      1.0
// @description  Clicks on every occurrence of "Apply now" text in Amazon search results page after a delay and updates the website title with the count of occurrences and clicks. Refreshes the page once clicking is done.
// @match        https://www.amazon.ca/s?k=*
// @grant        none
// ==/UserScript==
// You may need to reload the page until Tampermonkey loads the script, I'm not sure if it's a tampermonkey issue or skill issue with the script.
(function() {
    'use strict';

    // Function to click on elements containing the exact text "Apply now"
    function clickApplyNowElements() {
        const elements = document.querySelectorAll('body :not(a):not(script):not(style)');
        let count = 0;
        for (let i = 0; i < elements.length; i++) {
            if (elements[i].textContent.trim() === 'Apply now') {
                elements[i].click();
                count++;
            }
        }
        document.title = `Apply now found: ${count} | Clicked: ${clickCount}`;
        return count;
    }

    // Function to click on the <i class="a-icon a-icon-close"></i> element twice
    function clickCloseIcon() {
        const closeIcon = document.querySelector('i.a-icon.a-icon-close');
        if (closeIcon) {
            closeIcon.click();
            closeIcon.click();
            closeIcon.click();
            closeIcon.click();
        }
    }

    let clickCount = 0;

    // Wait for the website to fully load
    window.addEventListener('load', function() {
        // Wait for half a second before clicking
        setTimeout(function() {
            clickCloseIcon();
            const applyNowCount = clickApplyNowElements();
            clickCount += applyNowCount;
            if (applyNowCount === 0) {
                clearInterval(clickInterval);
                document.title = 'No "Apply now" links found';
            } else {
                clearInterval(disableInterval);
            }
        }, 500);
    });

    // Mutation observer to detect changes in the search results
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList') {
                clickCloseIcon();
                const applyNowCount = clickApplyNowElements();
                clickCount += applyNowCount;
                if (applyNowCount === 0) {
                    clearInterval(clickInterval);
                    document.title = 'No "Apply now" links found';
                } else {
                    clearInterval(disableInterval);
                }
            }
        });
    });

    // Start observing mutations on the search results container
    const targetNode = document.getElementById('search');
    const observerConfig = { childList: true, subtree: true };
    observer.observe(targetNode, observerConfig);

    // Check for the close icon element at regular intervals
    const checkInterval = setInterval(function() {
        clickCloseIcon();
    }, 1000);

    // Stop checking and clicking when the close icon element is found
    const clickInterval = setInterval(function() {
        const closeIcon = document.querySelector('i.a-icon.a-icon-close');
        if (closeIcon) {
            clearInterval(checkInterval);
            clearInterval(clickInterval);
        }
    }, 1000);

    // Disable the script if no "Apply now" links are found after 10 seconds
    const disableInterval = setTimeout(function() {
        clearInterval(checkInterval);
        clearInterval(clickInterval);
        observer.disconnect();
        document.title = 'No "Apply now" links found';
    }, 10000);

})();
