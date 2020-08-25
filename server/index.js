const express = require('express');
const compression = require('compression')
const path = require('path');
const app = express();
const port = process.env.PORT || 5050;

app.use(compression());
app.use('/', express.static(path.join(__dirname, '../client/dist')));

app.listen(port, () => console.log(`Listening at http://localhost:${port}`))