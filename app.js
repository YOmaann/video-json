const express = require('express');
const vrouter = require('./routers/videoRoutes');
const prouter = require('./routers/playerRoutes');
const frouter = require('./routers/folderRoutes');

const app = express();
// routers
app.use(express.static('./static'));
app.use('/video', vrouter);
app.use('/play', prouter);

app.use('/folder', frouter);
module.exports = app;
