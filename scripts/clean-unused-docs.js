'use strict';
let glob = require('glob');
let toc = require('../content/structure.json');
let fs = require('fs');

let existingFiles = glob.sync('../content/**/*.md').map(item => item.replace('../content/', ''));

let toProcess = [toc];
let tocFiles = [];
while (toProcess.length > 0) {
    let next = toProcess.pop();
    if (next.path) {
        tocFiles.push(next.path);
    }
    (next.children || []).forEach(item => toProcess.push(item));
}
console.info(tocFiles);
existingFiles.forEach(item => {
    if (tocFiles.indexOf(item) == -1) {
        fs.unlinkSync('../content/' + item);
    }
});