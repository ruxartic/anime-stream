const axios = require('axios');
const cheerio = require('cheerio');

export async function getVideoList(url) {
    const ids = url.split('&')[0];
    const encrypt = vrfEncrypt(ids);
    const vrf = `vrf=${encodeURIComponent(encrypt)}`;
    const res = await axios.get(`${baseUrl}/ajax/server/list/${ids}?${vrf}`);
    const html = JSON.parse(res.data).result;
  
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
        const res = await axios.get(`${baseUrl}/ajax/server/${serverId}?${vrf}`);
        const status = JSON.parse(res.data).status;
  
        if (status === 200) {
          const url = vrfDecrypt(JSON.parse(res.data).result.url);
          const hosterSelection = preferenceHosterSelection(source.id);
          const typeSelection = preferenceTypeSelection(source.id);
          if (typeSelection.includes(type.toLowerCase())) {
            let a = [];
            if (serverName.includes("vidplay") || url.includes("mcloud")) {
              const hosterName = serverName.includes("vidplay") ? "VidPlay" : "MyCloud";
              if (hosterSelection.includes(hosterName.toLowerCase())) {
                a = await vidsrcExtractor(url, hosterName, type);
              }
            } else if (serverName.includes("mp4upload") && hosterSelection.includes("mp4upload")) {
              a = await mp4UploadExtractor(url, null, "", type);
            } else if (serverName.includes("streamtape") && hosterSelection.includes("streamtape")) {
              a = await streamTapeExtractor(url, `StreamTape - ${type}`);
            } else if (serverName.includes("filemoon") && hosterSelection.includes("filemoon")) {
              a = await filemoonExtractor(url, "", type);
            }
            videos.push(...a);
          }
        }
      }
    }
  
    return sortVideos(videos, source.id);
  }
  