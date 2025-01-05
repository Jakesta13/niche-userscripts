// ==UserScript==
// @name         Remove Bing Chat AI
// @namespace    ChatGPT / jakesta13
// @version      3.0
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
    // Setting variable to use as a suffix for console messages
    let scriptName = "Remove Bing Chat AI"
    // Function to call when we want to send a message to console
    function sendToConsole(log){
      console.info("[" + scriptName + "] " + log);
    }
    // All I did was search "ChatGPT" and all these Elements came up (See Named Section "ChatGPT Search Caused" for areas of the script that needed to be added in order to stop the AI from bugging you to use it vs ChatGPT)
    // ChatGPT Search Caused Part1:
    function coPilotSearchInlineChat() {
        var coPilotInlineChat = document.getElementById('uaclose');
      if (coPilotInlineChat){
        coPilotInlineChat.click();
            sendToConsole("Clicked Close on the Co-Pilot box");
        }
    }
    // End Section for "ChatGPT Search Caused Part1"
    // Function to disable co-pilot responce toggle if it is ON (May sometimes cause a refresh, doesn't seem to happen anymore)
    function toggleOFFResponce() {
        var toggleChatLabel = document.getElementById('dtsetting_toggleChat_label');
        if (toggleChatLabel && toggleChatLabel.textContent.trim() === 'On') {
            var ToggleResponces = document.getElementById('dtsetting_toggleChat_ctrl');
            if (ToggleResponces) {
                ToggleResponces.click();
                sendToConsole("Toggled OFF Co-Pilot Responces in Settings");
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
                sendToConsole("Toggled OFF Co-Pilot Scroll to Chat in Settings");
            }
        }
    }
    // Function to disable News on the home screen
    function toggleOFFNews() {
        var ToggleNews = document.getElementById('qs_carousel_ctrl');
      if (ToggleNews){
        if (ToggleNews.getAttribute('aria-checked') === 'true') {
            ToggleNews.click();
            sendToConsole("Toggled OFF News in Settings");
        }
      }
    }
    // Function to disable trending on home screen
    function toggleOFFTrend() {
        var ToggleTrend = document.getElementById('qs_tobbs_ctrl');
        if (ToggleTrend){
          if (ToggleTrend.getAttribute('aria-checked') === 'true') {
             ToggleTrend.click();
             sendToConsole("Toggled OFF Trending in settings");
          }
        }
    }
    // Function to remove an element by ID
    function removeElementById(elementId) {
        var element = document.getElementById(elementId);
        if (element) {
            element.parentNode.removeChild(element);
            sendToConsole("Removed element ID: " + elementId);
//            sendToConsole("To-Do Add descriptions to what '" + elementId + "' is.");
        }
    }

    // Function to remove elements by class name
    function removeElementsByClassName(className) {
        var elements = document.getElementsByClassName(className);
        while (elements.length > 0) {
            elements[0].parentNode.removeChild(elements[0]);
            sendToConsole("Removed element className: " + elements[0].parentNode);
//            sendToConsole("To-Do Add descriptions to what '" + elements[0].parentNode + "' is.");
        }
    }
    let menuAlreadyOpened = 0;
    // Function to handle mutations and remove elements
    function handleMutations(mutations) {
      // We don't want to keep clicking the menu bar to open.
      // This is so that we expose the elements for toggling settings that only appear as elements
      // when the menu is opened.
        if ( menuAlreadyOpened = 0 ){
          document.querySelector('[aria-label="Settings and quick links"]').click();
          //Added console output for both debugging and because it helps the user understand if they see the menu open and don't know why
          sendToConsole("Clicked on the menu bar to allow us to access the settings to configure the home page");
          menuAlreadyOpened++;
        };

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
                // Removes Deep Search:
                removeElementById('b_sh_btn');
                removeElementById('b_sh_btn_icon');
                removeElementById('b_sh_btn_text');
                removeElementsByClassName('b_phead_sh_link');
                //
                // Removes "People Also search":
                removeElementById('df_listaa');
                //
                removeElementById('assyc');
                removeElementById('sa_zis_Banner');
                // "See More":
                removeElementById('b_mtp');
                //
                // All I did was search "ChatGPT" and all these Elements came up (See Named Section "ChatGPT Search Caused" for areas of the script that needed to be added in order to stop the AI from bugging you to use it vs ChatGPT)
                // ChatGPT Search Caused:
                // First, Click close, and then we will clean up any of the found elements.
                coPilotSearchInlineChat();
                //
                removeElementById('unarfo');
                removeElementById('b_cp_upsell');
                removeElementById('cp_logo');
                removeElementById('sbBoxCnt');
                removeElementById('uaForm');
                removeElementById('uaseabox');
                removeElementById('uaseabtn');
                removeElementById('uanotice');
                removeElementById('uaanswer');
                // End Section for "ChatGPT Search Caused"
                // - // - // - //
                // AI Responce Feedback in search
                // First lets give them an angry emoji, comment to disable
                if (document.getElementById('cds_emoji_angry')){
                    document.getElementById('cds_emoji_angry').click();
                    sendToConsole("Gave Bing an angry emoji")
                    // Submit to close the popup.
                    document.getElementById('submit_button').click();
                    sendToConsole("Also closed the popup where we sent the angry emoji")
                };
                removeElementById('survey-opt-in-wrapper');
                // - // - // - //
                // Removes the Feedback button
                removeElementById('sb_feedback');
                //
                //// - //// - ////
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
                //
                removeElementsByClassName('b_wpt_override');
                removeElementsByClassName('b_syd_textarea_container');
                removeElementsByClassName('b_widgetContainer slide-in');
                removeElementsByClassName('b_widgetGrad');
                removeElementsByClassName('cdxConv insideSbox');
                removeElementsByClassName('b_slidesContainer');
                removeElementsByClassName('wd-pn');
                removeElementsByClassName('sdbtn');
                removeElementsByClassName('sdbt wd-btn-rot');
                // Removes "open copilot" icon next to search box
                removeElementsByClassName('cdxConv_slsboxl');
                //
                // Removes Trivia quiz on the home screen, which was recently added.               
                removeElementsByClassName('hp_trivia_outer');
                //
                // Removes Response to search query
                removeElementsByClassName('b_ans b_top b_topborder b_qnacdxcont');
                //
                // All I did was search "ChatGPT" and all these Elements came up (See Named Section "ChatGPT Search Caused" for areas of the script that needed to be added in order to stop the AI from bugging you to use it vs ChatGPT)
                // ChatGPT Search Caused Part2:
                removeElementsByClassName('uncon');
                removeElementsByClassName('b_poleContent');
                removeElementsByClassName('b_pole');
                // End Section for "ChatGPT Search Caused Part2"
                //
                // Toggles Section \\ - Comment out to disable each for now, I plan on figuring out how to add options for ViolentMonkey
                //
                // Toggle the co-pilot responce in results
                toggleOFFResponce();
                //
                // Toggle the co-pilot scroll to chat
                toggleOFFCoPilotScroll();
                //
                // Toggle News on Home Page
                toggleOFFNews();
                //
                // Toggle trending on Home Page
                toggleOFFTrend();
                //
                // End Toggles Section \\
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
