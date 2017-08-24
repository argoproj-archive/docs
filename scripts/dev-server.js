'use strict';

let express = require('express');

let app = express();
let root = __dirname + '/..';

app.get('/docs/versions.json', function (req, res) {
  res.send([{ version: 'latest', path: '/' }]);
});

app.use('/docs', express.static(`${root}/content`));
app.use('/docs/images', express.static(`${root}/images`));
app.listen(process.env.PORT || 3001);
