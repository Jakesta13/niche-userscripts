// ==UserScript==
// @name         Add English Language Parameter to https://personal.asuswebstorage.com/
// @namespace    ChatGPT/jakesta13 edited
// @author       ChatGPT
// @version      1.1
// @description  Adds "?lang=en" to the URL of https://personal.asuswebstorage.com/
// @match        https://personal.asuswebstorage.com/*
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
