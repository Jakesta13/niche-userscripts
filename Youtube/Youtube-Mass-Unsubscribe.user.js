// ==UserScript==
// @name        YouTube Bulk Unsubscribe (Button Triggered, Continuous Scroll)
// @namespace   https://youtube.com
// @version     1.9
// @description Bulk unsubscribes from YouTube channels with a button, scrolls continuously
// @author      ChatGPT / Jakesta13
// @match       https://www.youtube.com/feed/channels
// @grant       none
// @updateURL    https://github.com/Jakesta13/niche-userscripts/raw/main/Youtube/Youtube-Mass-Unsubscribe.user.js
// @downloadURL  https://github.com/Jakesta13/niche-userscripts/raw/main/Youtube/Youtube-Mass-Unsubscribe.user.js
// ==/UserScript==

(function() {
    // This is the time delay after which to click the confirmation button
    const CONFIRMATION_DELAY = 500;
    // Time to wait for new channels to load after scrolling
    const LOAD_WAIT_TIME = 500;
    // Scroll increment
    const SCROLL_INCREMENT = 500;
    // Time to wait for new channels to stop loading
    const NO_NEW_CHANNELS_TIMEOUT = 500;
  
    async function bulkUnsubscribe() {
      let lastScrollTop = 0;
      let newChannelsFound = true;
      let channels = [];
  
      while (newChannelsFound) {
        newChannelsFound = false;
  
        // Scroll down
        window.scrollTo(0, window.scrollY + SCROLL_INCREMENT);
  
        // Wait for new channels to load
        await new Promise(resolve => {
          const observer = new MutationObserver(mutations => {
            const newChannels = Array.from(document.querySelectorAll('ytd-channel-renderer:not(.processed)'));
            if (newChannels.length > 0) {
              channels.push(...newChannels);
              newChannels.forEach(channel => channel.classList.add('processed'));
              newChannelsFound = true;
            }
          });
          observer.observe(document.body, { childList: true });
          setTimeout(resolve, LOAD_WAIT_TIME); // Timeout in case no new channels appear
        });
  
        // Wait for a period without new channels
        await new Promise(resolve => {
          const noNewChannelsObserver = new MutationObserver(mutations => {
            const newChannels = Array.from(document.querySelectorAll('ytd-channel-renderer:not(.processed)'));
            if (newChannels.length > 0) {
              noNewChannelsObserver.disconnect();
            } else {
              resolve();
            }
          });
          noNewChannelsObserver.observe(document.body, { childList: true });
          setTimeout(resolve, NO_NEW_CHANNELS_TIMEOUT); // Timeout in case no new channels appear
        });
      }
  
      // Process the collected channels
      for (const channel of channels) {
        try {
          const unsubscribeButton = channel.querySelector('[aria-label^="Unsubscribe from"]');
          if (unsubscribeButton) {
            unsubscribeButton.click();
  
            // Wait for confirmation dialog
            await new Promise(resolve => {
              const confirmDialogObserver = new MutationObserver(mutations => {
                if (document.querySelector('yt-confirm-dialog-renderer')) {
                  confirmDialogObserver.disconnect();
                  resolve();
                }
              });
              confirmDialogObserver.observe(document.body, { childList: true });
            });
  
            // Click the confirm button
            const confirmButton = document.querySelector('yt-confirm-dialog-renderer [aria-label^="Unsubscribe"]');
            if (confirmButton) {
              confirmButton.click();
              console.log('Unsubscribed from channel');
            } else {
              console.error('Confirmation button not found');
            }
          } else {
            console.error('Unsubscribe button not found for channel:', channel);
          }
        } catch (error) {
          console.error('Error processing channel:', error);
        }
      }
    }
  
    // Create a button
    const button = document.createElement('button');
    button.textContent = 'Bulk Unsubscribe';
    button.style.position = 'fixed';
    button.style.top = '20px';
    button.style.right = '40px';
    button.style.zIndex = '9999';
  
    // Add a click event listener to the button
    button.addEventListener('click', () => {
      bulkUnsubscribe();
    });
  
    // Append the button to the body
    document.body.appendChild(button);
  })();
  