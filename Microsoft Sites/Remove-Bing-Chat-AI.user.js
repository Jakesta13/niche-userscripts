// ==UserScript==
// @name         Remove Bing Chat AI
// @namespace    ChatGPT / jakesta13
// @version      1.2a
// @description  Remove Bing Chat AI, because we don't like being forced to use it.
// @author       ChatGPT / jakesta13
// @match        *://www.bing.com/*
// @grant        none
// @updateURL    https://github.com/Jakesta13/niche-userscripts/raw/main/Microsoft%20Sites/Remove-Bing-Chat-AI.user.js
// ==/UserScript==

(function() {
    'use strict';

    // Function to remove an element by ID
    function removeElementById(elementId) {
        var element = document.getElementById(elementId);
        if (element) {
            element.parentNode.removeChild(element);
        }
    }

    // Function to remove elements by class name
    function removeElementsByClassName(className) {
        var elements = document.getElementsByClassName(className);
        while (elements.length > 0) {
            elements[0].parentNode.removeChild(elements[0]);
        }
    }

    // Function to handle mutations and remove elements
    function handleMutations(mutations) {
        mutations.forEach(function(mutation) {
            // Check if nodes were added
            if (mutation.addedNodes.length > 0) {
                // Remove elements by ID
                removeElementById('b_phead_chat');
                removeElementById('chat_upsell_bubble_icon');
                removeElementById('b-scopeListItem-conv');
                removeElementById('pag_chat_btn');
				removeElementById('b_bnp_bopc');
                removeElementById('b_bopc_content');
                removeElementById('b_bopc_img');
                removeElementById('b_bopc_img_cont');
                removeElementById('b_bopc_desc');
                removeElementById('b_bopc_cta_cont');
                removeElementById('b_bopc_cta');
                removeElementById('cib-conversation-main');
                removeElementById('cib-chat-main');
                removeElementById('cib-action-bar-main');

                // Remove elements by class name
                removeElementsByClassName('b_phead_chat_link');
                removeElementsByClassName('scp_conv_mode');
                removeElementsByClassName('b_pag_lets_chat');
                removeElementsByClassName('rs_chat');
                removeElementsByClassName('df_dn_content');
                removeElementsByClassName('b_pag_lets_chat');
				removeElementByClassName('b_bnp_bopc popup');
                removeElemntByClassName('b_bnp_btn b_bnp_cta');
                removeElementByClassName('cib-serp-main');
                removeElementByClassName('cib-background');
                
                
            }
        });
    }

    // Create a mutation observer
    var observer = new MutationObserver(handleMutations);

    // Observe changes to the DOM
    observer.observe(document.body, {
        childList: true, // Listen for changes to the child nodes
        subtree: true // Observe changes in the entire subtree
    });
})();
