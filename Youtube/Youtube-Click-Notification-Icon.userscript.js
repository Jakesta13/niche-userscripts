// ==UserScript==
// @name         YouTube Notification Clicker
// @namespace    ChatGPT
// @author       ChatGPT
// @version      1.0
// @description  Clicks on YouTube notifications when a new notification count appears on the notification bell icon
// @match        https://www.youtube.com/*
// @grant        none
// ==/UserScript==
// Since youtube does not automatically refresh the notifications until the page is refreshed, this only works if you have new notifications on refresh - but it will work
// if youtube adds this functionality.
let notificationCount = null;

function clickNotification() {
  const bellIcon = document.querySelector(".yt-spec-icon-badge-shape__icon");
  if (bellIcon) {
    bellIcon.click();
  }
}

function checkNotifications() {
  const newCount = document.querySelector(".yt-spec-icon-badge-shape__badge");
  if (newCount && newCount.innerText !== notificationCount) {
    notificationCount = newCount.innerText;
    clickNotification();
  }
}

setInterval(checkNotifications, 1000);
