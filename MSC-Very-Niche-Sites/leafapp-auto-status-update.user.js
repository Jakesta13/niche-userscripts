// ==UserScript==
// @name         Click Request Stat Update on leafapp.co
// @namespace    ChatGPT
// @author       ChatGPT
// @version      1.0
// @description  Clicks on any text that matches "Request Stat Update" on the page after waiting for the page to load
// @match        https://leafapp.co/player/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to simulate a click on the element
    function clickElement(element) {
        const event = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window
        });
        element.dispatchEvent(event);
    }

    // Function to wait for the page to load
    function waitForPageLoad(callback) {
        if (document.readyState === 'complete') {
            callback();
        } else {
            window.addEventListener('load', callback);
        }
    }

    // Find any text that matches "Request Stat Update" on the page and click the parent element
    function clickRequestStatUpdate() {
        const textNodes = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
        let node;
        while ((node = textNodes.nextNode())) {
            if (node.textContent.trim() === 'Request Stat Update') {
                clickElement(node.parentElement);
                break;
            }
        }
    }

    // Wait for the page to load and then click the desired text
    waitForPageLoad(clickRequestStatUpdate);
})();
