// ==UserScript==
// @name         Bing Reward Points Tracker
// @namespace    ChatGPT
// @version      1.0
// @description  Track reward points over time on Bing via Webhooks
// @author       ChatGPT
// @match        https://www.bing.com/*
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==
// Will not send webhooks if the points do not change cross pages
// Will wait 1s once points seem to stabilize (Bing makes them update and count upwards sometimes)
// REQUIRES WEBHOOK SERVICE. Was made intended for IFTTT but I couldn't publish the webhook if it uses google sheets
// See Image for IFTTT Setup: https://github.com/Jakesta13/niche-userscripts/blob/main/Microsoft%20Sites/Bing-Rewards-Tracker-IFTTT-Applet.png

(function() {
    'use strict';

    let lastPoints = GM_getValue('lastPoints', null);
    let pointsTimeout = null;

    // Function to send a webhook with the current epoch time and the value of an element
    function sendWebhook(epochTime, points) {
        const webhookURL = 'YOUR_WEBHOOK_URL_HERE'; // Replace with your actual webhook URL

        // Construct the URL with query parameters
        const url = `${webhookURL}?value1=${epochTime}&value2=${encodeURIComponent(points)}`;

        // Log the URL
        console.log('Sending webhook to:', url);

        // Send a GET request to the webhook URL
        fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to send webhook');
            }
            console.log('Webhook sent successfully');
        })
        .catch(error => {
            console.error('Error sending webhook:', error);
        });
    }

    // Function to check the element for changes
    function checkElement() {
        const signInElement = document.querySelector('#id_a');
        if (signInElement && (signInElement.style.display !== 'none' || signInElement.value === 'Sign in')) {
            console.log('Sign-in element found. Skipping points check.');
            return;
        }

        const element = document.querySelector('#id_rc');
        if (element) {
            const points = element.innerText;
            console.log('Points:', points);

            // Check if points is not a number or is 200 or less
            if (isNaN(points) || parseInt(points) <= 200) {
                console.log('Skipping points check due to points being not a number or 200 or less');
                return;
            }

            if (points !== lastPoints) {
                clearTimeout(pointsTimeout); // Clear previous timeout
                pointsTimeout = setTimeout(() => {
                    const epochTime = Math.floor(Date.now() / 1000);
                    console.log('Epoch time:', epochTime);
                    sendWebhook(epochTime, points);
                    lastPoints = points;
                    GM_setValue('lastPoints', points); // Store the points value
                }, 1000); // Wait for 1 second before sending webhook
            }
        }
    }

    // Check the element for changes initially
    checkElement();

    // Set up a MutationObserver to watch for changes to the element
    const observer = new MutationObserver(checkElement);
    const config = { attributes: true, childList: true, subtree: true };
    observer.observe(document.body, config);

})();
