// ==UserScript==
// @name         Hide Premium Elements
// @version      1.2
// @description  Hides elements with "subscription-tier-label" containing "Premium" or "Standard" class
// @author       Gemini
// @match        https://dyno.gg/manage/*
// @grant        none
// ==/UserScript==
// 
// This script is not meant to prevent you from purchasing premium for dyno.gg
// This is to hide modules you cannot use if you do not have a subscription.
// if you pay for dyno.gg, you may need to disable this script as to not hide the modules that
// you do have access to now.
//
(function() {
    'use strict';
  
    function hidePremiumElements() {
      const premiumElements = document.querySelectorAll('.subscription-tier-label.label-premium, .subscription-tier-label.label-standard'); // Combined selector
  
      premiumElements.forEach(premiumElement => {
        const parentElement = premiumElement.closest('.control.rich-module.is-pulled-left.enabled');
        parentElement.style.display = 'none';
      });
    }
  
    // Initial execution to hide existing elements
    hidePremiumElements();
  
    // Set up a MutationObserver to watch for changes
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.type === 'childList') {
          hidePremiumElements();
        }
      });
    });
  
    // Start observing the entire document for changes
    observer.observe(document.body, { childList: true, subtree: true });
  })();