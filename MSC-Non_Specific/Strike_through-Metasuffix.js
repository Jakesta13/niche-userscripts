// ==UserScript==
// @name         Strike-through Metasuffixes
// @namespace    What's a namespace
// @version      2023-12-11
// @description  I feel the word 'meta' come out of existance without explanation, the first time I saw the word meta used was when Mark Zuckerburg renamed his company and suddenly the word 'meta' was suffixed everywhere.
// @author       jakesta13
// @match        *://*/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=meta.com
// @run-at   document-start
// ==/UserScript==

(function() {
    'use strict';
    const originalHTML = document.body.innerHTML;
    const modifiedHTML = originalHTML.replace(/\meta(\w+)\b/g, (match, group))
    return group;
    document.body.innerHTML = modifiedHTML;

});

// currently does not work
