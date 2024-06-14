import * as cheerio from 'cheerio' 
import { vrfEncrypt, vrfDecrypt } from "../utils/encrypt";
import { vidsrcExtractor } from "./extractors/vidsrcExtractor";
import { Client } from "../client/client";
import { preferenceHosterSelection, preferenceTypeSelection } from "./preferences/videoPreference";
import { getPreferenceValue } from "./preferences/getPreference";

export async function getVideoList(url) {
    const ids = url.split('&')[0];
    const encrypt = vrfEncrypt(ids);
    const vrf = `vrf=${encodeURIComponent(encrypt)}`;
    const res = await Client.get(`${Client.source.baseUrl}/ajax/server/list/${ids}?${vrf}`);
    console.log(`${Client.source.baseUrl}/ajax/server/list/${ids}?${vrf}`)
    const html = res.result;
  
    const $ = cheerio.load(html);
    const vidsHtmls = $('div.servers > div');
  
    let videos = [];
    for (let i = 0; i < vidsHtmls.length; i++) {
      const vidHtml = vidsHtmls[i];
      const type = $(vidHtml).attr('data-type');
      const serversIds = $(vidHtml).find('li').map((_, el) => $(el).attr('data-link-id')).get();
      const serversNames = $(vidHtml).find('li').map((_, el) => $(el).text().toLowerCase()).get();
  
      for (let j = 0; j < serversIds.length; j++) {
        const serverId = serversIds[j];
        const serverName = serversNames[j];
        const encrypt = vrfEncrypt(serverId);
        const vrf = `vrf=${encodeURIComponent(encrypt)}`;
        const res = await Client.get(`${Client.source.baseUrl}/ajax/server/${serverId}?${vrf}`);
        const status = res.status;

        // console.log(res)
        // console.log(serverName);
  
        if (status === 200) {
          const url = vrfDecrypt(res.result.url);

          console.log(url);
          const hosterSelection = preferenceHosterSelection();
          const typeSelection = preferenceTypeSelection();

          console.log(type)

          if (typeSelection.includes(type.toLowerCase())) {
            let a = [];
            if (serverName.includes("vidplay") || url.includes("mcloud")) {
              console.log("americaya!")
              const hosterName = serverName.includes("vidplay") ? "VidPlay" : "MyCloud";
              if (hosterSelection.includes(hosterName.toLowerCase())) {
                a = await vidsrcExtractor(url, hosterName, type);
              }
            } else if (serverName.includes("mp4upload") && hosterSelection.includes("mp4upload")) {
              // a = await mp4UploadExtractor(url, null, "", type);
            } else if (serverName.includes("streamtape") && hosterSelection.includes("streamtape")) {
              // a = await streamTapeExtractor(url, `StreamTape - ${type}`);
            } else if (serverName.includes("filemoon") && hosterSelection.includes("filemoon")) {
              // a = await filemoonExtractor(url, "", type);
            }
            videos.push(...a);
          }
        }
      }
    }
  
    return sortVideos(videos);
  }
  


function sortVideos(videos) {
  const quality = getPreferenceValue("preferred_quality");
  const server = getPreferenceValue("preferred_server");
  const lang = getPreferenceValue("preferred_language");

  videos.sort((a, b) => {
      let qualityMatchA = 0;
      if (a.quality.includes(quality) &&
          a.quality.toLowerCase().includes(lang.toLowerCase()) &&
          a.quality.toLowerCase().includes(server.toLowerCase())) {
          qualityMatchA = 1;
      }

      let qualityMatchB = 0;
      if (b.quality.includes(quality) &&
          b.quality.toLowerCase().includes(lang.toLowerCase()) &&
          b.quality.toLowerCase().includes(server.toLowerCase())) {
          qualityMatchB = 1;
      }

      if (qualityMatchA !== qualityMatchB) {
          return qualityMatchB - qualityMatchA;
      }

      const regex = /(\d+)p/;
      const matchA = a.quality.match(regex);
      const matchB = b.quality.match(regex);
      const qualityNumA = parseInt(matchA ? matchA[1] : '0', 10);
      const qualityNumB = parseInt(matchB ? matchB[1] : '0', 10);
      return qualityNumB - qualityNumA;
  });

  return videos;
}



function ll(url) {
  return url.includes("?") ? "&" : "?";
}