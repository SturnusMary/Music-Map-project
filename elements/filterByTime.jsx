import db from '../db.json';


export function FilterByTime(time) {
    let dbOfSongs = db.songs;
    let arrayOfCountries = [];
    for (let i = 0; i < dbOfSongs.length; i++) {
        for (let k in dbOfSongs[i]) {
            if (time == dbOfSongs[i][k]) {
                arrayOfCountries.push(dbOfSongs[i])
            }
        }
    }
    return arrayOfCountries;
}
