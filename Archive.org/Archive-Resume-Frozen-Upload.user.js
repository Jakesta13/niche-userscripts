// ==UserScript==
// @name         Archive.org Auto-Resume Upload
// @version      1.1
// @description  Automatically resume Archive.org uploads if the progress freezes
// @author       ChatGPT / Gemini / Jakesta13
// @match        https://archive.org/upload*
// @downloadURL  https://github.com/Jakesta13/niche-userscripts/raw/refs/heads/main/Archive.org/Archive-Resume-Frozen-Upload.user.js
// @updateURL    https://github.com/Jakesta13/niche-userscripts/raw/refs/heads/main/Archive.org/Archive-Resume-Frozen-Upload.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
  
    // Set the interval to check the progress (in milliseconds)
    const checkInterval = 300000; // 5 minutes (adjust as needed)
  
    // Variable to store the last checked size
    let lastCheckedSize = null;
  
    // Function to check and resume upload if frozen
    function checkAndResume() {
      const progressSize = document.getElementById('progress_size');
      if (progressSize) {
        const uploadedSize = progressSize.querySelector('#progress_file_size').innerText;
  
        // Convert size to bytes for comparison
        const uploadedBytes = convertToBytes(uploadedSize);
  
        // Check if progress has advanced since the last check
        if (lastCheckedSize !== null && uploadedBytes > lastCheckedSize) {
          console.log('Progress has advanced.');
        } else {
          // Call the resume function if progress is frozen or hasn't advanced
          console.log('Progress may be frozen. Resuming...');
          if (typeof window.IA_UPLOADER === 'function' && typeof window.IA_UPLOADER.resume === 'function') {
            window.IA_UPLOADER.resume();
            console.log('Upload resumed successfully.');
          } else {
            console.warn('IA_UPLOADER function not found. Resuming upload might not work.');
            console.log('Trying anyways');
            window.IA_UPLOADER.resume();
          }
        }
  
        // Update the last checked size
        lastCheckedSize = uploadedBytes;
      }
    }
  
    // Function to convert size to bytes
    function convertToBytes(size) {
      const units = {'KB': 1024, 'MB': 1024 * 1024, 'GB': 1024 * 1024 * 1024, 'KiB': 1000, 'MiB': 1000 * 1000, 'GiB': 1000 * 1000 * 1000};
      const matches = size.match(/(\d+(\.\d+)?)\s*([KMG]?i?B)/);
      if (matches && matches.length === 4) {
        return parseFloat(matches[1]) * units[matches[3]];
      }
      return NaN;
    }
  
    // Set up the interval to check and resume
    setInterval(checkAndResume, checkInterval);
  })();