const { default: got } = require('got');
const NodeCache = require("node-cache");
const RaceCache = new NodeCache({ stdTTL: 1800, checkperiod: 120 });


async function getCalendar(round) {
    if (round === undefined) { //generic
        try {
            let series = RaceCache.get('currentSeries');
            if (series === undefined) {
                console.log("bing bong");
                const response = await got('https://ergast.com/api/f1/2022.json');
                let calendar = JSON.parse(response.body);

                series =  calendar["MRData"]["RaceTable"]["Races"];

                RaceCache.set("currentSeries", series);

            }

            return series;

        } catch (error) {
            console.log(`Error occurred retrieving generic calendar route: \n${error}`);
        }
    } else { //specific
        try {
            let race = RaceCache.get(`round${round - 1}`);

            if (race === undefined) {
                console.log("ping pong");
                const response = await got('https://ergast.com/api/f1/2022.json');
                let calendar = JSON.parse(response.body);

                race = calendar["MRData"]["RaceTable"]["Races"][`${round - 1}`];

                RaceCache.set(`round${round - 1}`, race);
            }

            return race;

        } catch (error) {
            console.log(`Error occurred retrieving specific calendar route: \n${error}`);
        }
    }
}

async function getHistoricCalendar(year, round) {

    if (year === undefined) {
        let series;
        try {
            series = RaceCache.get('historicalSeries');
            if (series === undefined) {
                let historicalSeries = [];
                let totalResults = 0;
                let offset = 0;
                do {
                    console.log(`retrieving entries: ${offset} - ${offset + 500}`);
                    const response = await got(`https://ergast.com/api/f1.json?limit=500&offset=${offset}`);
                    let result = JSON.parse(response.body);
                    totalResults = result["MRData"]["total"];

                    if (historicalSeries.length !== 0) {
                        historicalSeries.push(...result["MRData"]["RaceTable"]["Races"]);
                    } else {
                        historicalSeries = result["MRData"]["RaceTable"]["Races"];
                    }

                    await new Promise(time => setTimeout(time, 1000));

                    offset += 500;

                } while (totalResults / offset > 1);

                console.log("done.");

                series = historicalSeries;

                RaceCache.set('historicalSeries', series);

            }

            return series;

        } catch (error) {
            console.log(`Error occurred retrieving specific historic season's calendar route: \n${error}`);
        }
    } else if (round === undefined) {

    } else {

    }
}



exports.getCalendar = getCalendar;
exports.getHistoricCalendar = getHistoricCalendar;