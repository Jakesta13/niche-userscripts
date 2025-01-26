// ==UserScript==
// @name        Patreon Redirect to DMs
// @namespace   https://github.com/jakesta13
// @match       https://www.patreon.com/*
// @grant       none
// @version     1.1
// @author      Jakesta13 / ChatGPT
// @description Reirects you to the DMs instead of the wildly unused chats on patreon. Also changes the chat icon to a mail icon (or at least my attempt to... looks like a house ngl)
// @downloadURL https://github.com/Jakesta13/niche-userscripts/raw/refs/heads/main/MSC-Very-Niche-Sites/Patreon-Redirect-to-DMs.user.js
// @updateURL https://github.com/Jakesta13/niche-userscripts/raw/refs/heads/main/MSC-Very-Niche-Sites/Patreon-Redirect-to-DMs.user.js
// ==/UserScript==
function SVG(){
    // ChatGTP was used for this function
      'use strict';
      // Select the <svg>
      let svgs = document.querySelectorAll('[data-tag="IconBubbleChat"][viewBox="0 0 24 24"]');
    
      // Loop through each matching <svg> element
      svgs.forEach((svg) => {
        // Select the <path> element within the SVG
        let path = svg.querySelector('path');
        if (path) {
          path.remove(); // Removes the existing <path>
        }
    
        // Create a new <path> to replace the existing one
        // Icon source: https://www.svgrepo.com/svg/533217/mail-open-alt-1?edit=true
        // Optomized using: https://yqnn.github.io/svg-path-editor/
        let newPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        newPath.setAttribute(
          'd',
          'M10.3 4.1c.6-.4.9-.6 1.3-.7.2-.1.6-.1.8 0 .4.1.7.3 1.3.7l5.8 3.6c.5.4.8.5 1 .8.2.2.3.4.4.7.1.3.1.6.1 1.2v6.4c0 1.1 0 1.7-.2 2.1-.2.4-.5.7-.9.9s-1 .2-2.1.2H6.2c-1.1 0-1.7 0-2.1-.2-.4-.2-.7-.5-.9-.9-.2-.4-.2-1-.2-2.1V10.4c0-.6 0-.9.1-1.2.1-.3.2-.5.4-.7.2-.3.5-.4 1-.8l5.8-3.6ZM21 10l-7.2 4.8c-.7.4-1 .7-1.3.7-.3.1-.7.1-1 0-.3 0-.6-.3-1.3-.7L3 10m15 2V10H6v2'
        );
        newPath.setAttribute('stroke', '#000000');
        newPath.setAttribute('stroke-width', '2');
        newPath.setAttribute('stroke-linecap', 'round');
        newPath.setAttribute('stroke-linejoin', 'round');
        newPath.setAttribute('fill', 'white');
    
        // Append the new <path> element to the SVG
        svg.appendChild(newPath);
    });
    
    }
    function start(){
      'use strict';
      let name = "Patreon DMs only"
      if (window.location.href.indexOf("chats") > -1) {
          console.log("[" + name + "] Begone, Chats!");
          SVG();
          window.location.href = "https://www.patreon.com/messages/?mode=user&tab=direct-messages";
      } else{
        SVG();
      }
    }
    start();