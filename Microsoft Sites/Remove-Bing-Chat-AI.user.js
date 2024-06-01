// ==UserScript==
// @name         Remove Bing Chat AI
// @namespace    ChatGPT / jakesta13
// @version      1.9-beta
// @description  Remove Bing Chat AI, because we don't like being forced to use it.
// @author       ChatGPT / jakesta13
// @match        *://www.bing.com/*
// @grant        none
// @updateURL    https://github.com/Jakesta13/niche-userscripts/raw/main/Microsoft%20Sites/Remove-Bing-Chat-AI.user.js
// @downloadURL  https://github.com/Jakesta13/niche-userscripts/raw/main/Microsoft%20Sites/Remove-Bing-Chat-AI.user.js
// ==/UserScript==
// Known issues:
// Breaks menu-bar on bing.com home page see comment below
// Breaks Bing rewards questions popup, will attempt to fix in future updates
(function() {
    'use strict';
    // Function to disable co-pilot responce toggle if it is ON (Will refresh)
    function toggleOFFResponce() {
        var toggleChatLabel = document.getElementById('dtsetting_toggleChat_label');
        if (toggleChatLabel && toggleChatLabel.textContent.trim() === 'On') {
            var ToggleResponces = document.getElementById('dtsetting_toggleChat_ctrl');
            if (ToggleResponces) {
                ToggleResponces.click();
            }
        }
    }
    // Function to disable co-pilot scroll to chat toggle if it is ON
    function toggleOFFCoPilotScroll() {
        var toggleScrollLabel = document.getElementById('dtsetting_toggleScroll_label');
        if (toggleScrollLabel && toggleScrollLabel.textContent.trim() === 'On') {
            var ToggleScroll = document.getElementById('dtsetting_toggleScroll_ctrl');
            if (ToggleScroll) {
                ToggleScroll.click();
            }
        }
    }

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
                removeElementById('codex');
                removeElementById('qs_chatBox');
                removeElementById('qs_chatIconOuter');
                removeElementById('qs_chatIconInner');
                removeElementById('sydneyLetsChatWidgetContainer');
                removeElementById('b_syd_sm_input');
                removeElementById('syd_suggestion_wrapper');
                removeElementById('b_syd_text_input_container');
                removeElementById('b_syd_sm_tb');
                removeElementById('b_syd_mic');
                removeElementById('b_syd_inputs');
                removeElementById('b_syd_mic_ingress');
                removeElementById('b_syd_send');
                removeElementById('b_syd_kb');
                removeElementById('sydneyLetsChatWidgetCtaBtn');
                removeElementById('sydneyLetsChatWidgetGradient');
                removeElementById('b_sydtgload');
                // Removes Deep Search
                removeElementById('b_sh_btn');
                removeElementById('b_sh_btn_icon');
                removeElementById('b_sh_btn_text');
                removeElementsByClassName('b_phead_sh_link');
                // Removes "People Also search"
                removeElementById('df_listaa');

                // Remove elements by class name
                removeElementsByClassName('b_phead_chat_link');
                removeElementsByClassName('scp_conv_mode');
                removeElementsByClassName('b_pag_lets_chat');
                removeElementsByClassName('rs_chat');
                removeElementsByClassName('df_dn_content');
                removeElementsByClassName('b_pag_lets_chat');
                removeElementsByClassName('b_bnp_bopc popup');
                removeElementsByClassName('b_bnp_btn b_bnp_cta');
                removeElementsByClassName('cib-serp-main');
                removeElementsByClassName('cib-background');
                removeElementsByClassName('cdxPrompt  ');
                removeElementsByClassName('below_sbox');
                // Breaks menu-bar on bing.com home page, but you don't *NEED* them, will attempt to resolve it in future updates 
                removeElementsByClassName('scope ');
                removeElementsByClassName('cdxConv');
                ///
                removeElementsByClassName('b_wpt_override');
                removeElementsByClassName('b_syd_textarea_container');
                removeElementsByClassName('b_widgetContainer slide-in');
                removeElementsByClassName('b_widgetGrad');
                removeElementsByClassName('cdxConv insideSbox');
                removeElementsByClassName('b_slidesContainer');
                removeElementsByClassName('wd-pn');
                removeElementsByClassName('sdbtn');
                removeElementsByClassName('sdbt wd-btn-rot');


                // Toggle the co-pilot responce in results
                // Will cause page to refresh, disable if causes issues
                toggleOFFResponce();
                // Toggle the co-pilot scroll to chat
                toggleOFFCoPilotScroll();
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
