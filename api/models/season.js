
const { response } = require('express');
const { default: got } = require('got');
const https = require('got');


async function getCalendar(round) {
    try {
        var response = await got('https://ergast.com/api/f1/2022.json');
        let calendar = JSON.parse(response.body);
        
        let races = calendar["MRData"]["RaceTable"]["Races"];
    
        return round === undefined ? races : races[`${round - 1}`];
    } catch (error) {
        console.log(error);
    }
}



exports.getCalendar = getCalendar;