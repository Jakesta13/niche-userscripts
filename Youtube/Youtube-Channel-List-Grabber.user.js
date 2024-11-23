// ==UserScript==
// @name         YouTube Channel Name Copier
// @namespace    http://youtube.com
// @version      1.0
// @description  Copies channel names to clipboard, can be used for organizing externally
// @author       ChatGPT / Jakesta13
// @match        https://www.youtube.com/feed/channels*
// @grant        none
// @updateURL    https://github.com/Jakesta13/niche-userscripts/raw/main/Youtube/Youtube-Channel-List-Grabber.user.js
// @downloadURL  https://github.com/Jakesta13/niche-userscripts/raw/main/Youtube/Youtube-Channel-List-Grabber.user.js
// ==/UserScript==

(function() {
    'use strict';

    const copyButton = document.createElement('button');
    copyButton.textContent = 'Copy Channel Names';
    copyButton.style.position = 'fixed';
    copyButton.style.top = '10px';
    copyButton.style.right = '10px';
    copyButton.style.zIndex = '9999';

    document.body.appendChild(copyButton);

    copyButton.addEventListener('click', () => {
        const channelNames = document.querySelectorAll('yt-formatted-string#text');
        const channelNameList = Array.from(channelNames).map(name => name.textContent.trim());
        const textToCopy = channelNameList.join('\n');
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                alert('Channel names copied to clipboard!');
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
            });
    });
})();
