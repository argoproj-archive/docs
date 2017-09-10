'use strict';
let glob = require('glob');
let fs = require('fs');
let path = require('path');

function isRelative(url) {
    url = url.toLowerCase();
    return url.indexOf('https://') !== 0 && url.indexOf('http://') !== 0 && url.indexOf('#') !== 0;
}

function isImage(url) {
    return url.toLowerCase().indexOf('docs/images') > -1;
}

let exceptionsByFile = {
    'yaml/deployment_template.md': ['[a-z0-9]([-a-z0-9]*[a-z0-9])']
};

let invalidLinks = {};
glob.sync(__dirname + '/../content/**/*.md').forEach(filePath => {
    let exceptions = exceptionsByFile[path.relative( path.join(__dirname, '../content'), filePath)] || [];
    let content = fs.readFileSync(filePath, 'utf-8');
    let reg = /\[[^\[]*\]\(([^)]*)\)/g;
    let match = reg.exec(content);
    while(match !== null) {
        let link = match[0];
        let linkUrl = match[1];
        let linkPath = path.join(path.dirname(filePath), linkUrl).split('#')[0];
        if (isRelative(linkUrl) && !isImage(linkUrl) && !fs.existsSync(linkPath)) {
            if (exceptions.indexOf(link) === -1) {
                let links = invalidLinks[filePath] || [];
                if (links.indexOf(link) == -1) {
                    links.push(link);
                }
                invalidLinks[filePath] = links;
            }
        }
        match = reg.exec(content);
    }
});

let valid = true;
let files = Object.keys(invalidLinks);
if (files.length > 0) {
    valid = false;
    console.info('Invalid links found in markdown files:\n');
    files.forEach(file => {
        console.info(`${file}:`);
        invalidLinks[file].forEach(link => console.info('\t' + link));
        console.info('');
    });
}

let toc = null;
try {
    toc = require('../content/structure');
} catch (e) {
    valid = false;
    console.info('Unable to parse table of content', e);
}

let invalidTocLinks = [];
if (toc) {
    let docs = [toc];
    while (docs.length > 0) {
        let next = docs.pop();
        if (next.path) {
            if (!fs.existsSync(path.join(__dirname, '..', 'content', next.path))) {
                invalidTocLinks.push(next.path);
            }
        }
        docs = docs.concat(next.children || []);
    }
}

if (invalidTocLinks.length > 0) {
    valid = false;
    console.info('Invalid links found in table of content:\n');
    invalidTocLinks.forEach(link => console.info('\t' + link));
}

process.exit(valid ? 0 : -1);
