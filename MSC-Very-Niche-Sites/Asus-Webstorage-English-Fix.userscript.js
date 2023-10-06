// ==UserScript==
// @name         Add English Language Parameter to personal.webstorage
// @namespace    ChatGPT
// @author       ChatGPT
// @version      1.0
// @description  Adds "?lang=en" to the URL of personal.webstorage.com
// @match        https://personal.webstorage.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var url = window.location.href;
    var firstSlashIndex = url.indexOf('/', 8);
    if (firstSlashIndex !== -1) {
        var newUrl = url.substring(0, firstSlashIndex + 1) + "?lang=en";
        window.location.replace(newUrl);
    }
})();
