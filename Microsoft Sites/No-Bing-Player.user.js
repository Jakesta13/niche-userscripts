// ==UserScript==
// @name        No Bing Player
// @version     1.3
// @description Bypasses Bing's video player and redirects to the direct video source.
// @author      Gemini / jakesta13
// @match       https://www.bing.com/videos/riverview/relatedvideo*
// @match       https://www.bing.com/videos/*
// @grant       none
// ==/UserScript==

(function() {
    'use strict';
  
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.type === 'childList') {
          const sourceUrlElement = document.querySelector('.source.tosurl');
          if (sourceUrlElement) {
            observer.disconnect(); // Stop observing once the element is found
            window.location.href = sourceUrlElement.getAttribute('href');
          }
        }
      });
    });
  
    observer.observe(document.body, { childList: true, subtree: true });
  })();