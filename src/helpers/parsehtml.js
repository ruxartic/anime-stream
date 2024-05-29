import * as cheerio from 'cheerio';
import { MPages } from "./Mpages";




/**
 * Parses the anime list from the HTML response.
 * @param {string} html - The HTML response as a string.
 * @returns {MPages} - The parsed list of anime.
 */
export function parseAnimeList(html) {
    const $ = cheerio.load(html);
    const animeList = [];

    const items = $('div#list-items > div.item');

    items.each((i, el) => {
        const url = $(el).find('div a').attr('href');
        const name = $(el).find('a img').attr('alt');
        const image = $(el).find('a img').attr('src');

        const anime = {
            name: name,
            imageUrl: image,
            link: url
        };

        animeList.push(anime);
    });

    return new MPages(animeList, true);
}


/**
 * Parses the status from the status string and status list.
 * @param {string} status - The status string.
 * @param {Array} statusList - The status list.
 * @returns {number} - The parsed status.
 */
export function parseStatus(status, statusList) {
    for (let i = 0; i < statusList.length; i++) {
        if (statusList[i][status] !== undefined) {
            return statusList[i][status];
        }
    }
    return -1; // return -1 or any default value if status not found in the list
}