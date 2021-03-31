
const { response } = require('express');
const { default: got } = require('got');
const https = require('got');


async function getCalendar() {
    try {
        var response = await got('https://ergast.com/api/f1/current.json');
    
        return response.body;
    } catch (error) {
        console.log(error);
    }
}



exports.getCalendar = getCalendar;