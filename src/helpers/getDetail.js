import { Client } from "../client/client";
import { vrfDecrypt, vrfEncrypt } from "../utils/encrypt";
import * as cheerio from 'cheerio';
import { parseStatus } from "./parsehtml";


export async function getDetail(url) {
  const statusList = [{ Releasing: 0, Completed: 1 }];
  const res = await Client.get(`${url}`);
  const $ = cheerio.load(res);
  const anime = {};

  const status = $('div:contains("Status") span').text().trim();
  if (status) {
    anime.status = parseStatus(status, statusList);
  }

  const description = $(".synopsis .shorting .content").text().trim();
  if (description) {
    anime.description = description;
  }

  const author = $('div:contains("Studio") span').text().trim();
  if (author) {
    anime.author = author;
  }

  anime.genre = [];
  $('div:contains("Genre") span a').each((i, el) => {
    anime.genre.push($(el).text().trim());
  });


  const id = $("div[data-id]").attr("data-id");

  const encrypt = vrfEncrypt(id); 


  const vrf = `vrf=${encodeURIComponent(encrypt)}`;




  const resEp = await Client.get(`${Client.source.baseUrl}/ajax/episode/list/${id}?${vrf}`);
  const html = resEp.result;
  const episodesList = [];

  const epsHtmls = cheerio.load(html)("div.episodes ul > li");
  epsHtmls.each((i, epH) => {
    const epHtml = cheerio.load(epH);
    const title = epHtml("li").attr("title") || "";
    const ids = epHtml("a").attr("data-ids");
    const sub = epHtml("a").attr("data-sub");
    const dub = epHtml("a").attr("data-dub");
    const softsub = title.toLowerCase().includes("softsub") ? "1" : "";
    const fillerEp = title.toLowerCase().includes("filler") ? "1" : "";
    const epNum = epHtml("a").attr("data-num");
    let scanlator = "";

    if (sub === "1") scanlator += "Sub";
    if (softsub === "1") scanlator += ", Softsub";
    if (dub === "1") scanlator += ", Dub";
    if (fillerEp === "1") scanlator += ", • Filler Episode";

    const episode = {
      name: `Episode ${epNum}`,
      scanlator: scanlator,
      url: `${ids}&epurl=${url}/ep-${epNum}`,
    };
    episodesList.push(episode);
  });

  anime.chapters = episodesList.reverse();
  return anime;
}
