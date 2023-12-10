// ==UserScript==
// @name         Archive.org Auto-Resume Upload
// @namespace    ChatGPT
// @version      0.2
// @description  Automatically resume Archive.org uploads if the progress freezes
// @author       ChatGPT
// @match        https://archive.org/upload*
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
                IA_UPLOADER.resume();
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
