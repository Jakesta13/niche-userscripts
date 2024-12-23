// ==UserScript==
// @name         Archive Upload Resume
// @version      2.1
// @description  Automatically resumes failed archive.org uploads
// @author       ChatGPT / Gemini / Jakesta13
// @match        https://archive.org/upload/*
// @downloadURL  https://github.com/Jakesta13/niche-userscripts/raw/refs/heads/main/Archive.org/Archive-Resume-Upload.user.js
// @updateURL    https://github.com/Jakesta13/niche-userscripts/raw/refs/heads/main/Archive.org/Archive-Resume-Upload.user.js
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  // Check for network error message every 5 seconds
  const checkUpload = setInterval(() => {
    if (document.documentElement.innerHTML.includes('There was a network problem')) {
      console.log('Found network problem. Resuming upload...');

      // Call the site function to resume upload
      if (typeof window.IA_UPLOADER === 'function' && typeof window.IA_UPLOADER.resume === 'function') {
        window.IA_UPLOADER.resume();
        console.log('Upload resumed successfully.');
      } else {
        console.warn('IA_UPLOADER function not found. Resuming upload might not work.');
        console.log('Trying anyways');
        window.IA_UPLOADER.resume();
      }

      // Schedule a reload after 5 seconds to check upload status
      setTimeout(() => {
        console.log('Checking for upload status...');
        clearInterval(checkUpload);
        location.reload();
      }, 5000);
    }
  }, 5000);
})();