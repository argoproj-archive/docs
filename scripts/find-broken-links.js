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

let files = Object.keys(invalidLinks);
files.forEach(file => {
    console.error(`${file}:`);
    invalidLinks[file].forEach(link => console.error('\t' + link));
    console.error('');
});
process.exit(files.length > 0 ? -1 : 0);