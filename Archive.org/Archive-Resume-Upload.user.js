// ==UserScript==
// @name         Archive Upload Resume
// @namespace    ChatGPT
// @author       ChatGPT
// @version      1
// @description  Automatically resumes failed archive.org uploads
// @match        https://archive.org/upload/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const checkUpload = setInterval(() => {
        if (document.documentElement.innerHTML.includes('There was a network problem')) {
            console.log('Found network problem. Resuming upload...');
            IA_UPLOADER.resume();
            setTimeout(() => {
                console.log('Checking for network problem...');
                clearInterval(checkUpload);
                location.reload();
            }, 5000); // Wait 5 seconds before checking again
        }
    }, 5000); // Check every 5 seconds
})();
