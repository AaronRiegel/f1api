const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const routes = require('./api/routes/f1Routes');
const {getHistoricCalendar} = require("./api/models/season");
const argv = require('minimist')(process.argv.slice(2));

function processArgs() {
    if (argv.preCache) {
        console.log(`pre-caching: ${argv.preCache}`);
        getHistoricCalendar();
    }
}

processArgs();


app.use('/api/v1', routes);


app.listen(port);


console.log('API server started on: ' + port);

