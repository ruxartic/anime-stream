export function sortVideos(videos, sourceId) {
    const quality = getPreferenceValue(sourceId, "preferred_quality");
    const server = getPreferenceValue(sourceId, "preferred_server");
    const lang = getPreferenceValue(sourceId, "preferred_language");
  
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
      const qualityNumA = matchA ? parseInt(matchA[1]) : 0;
      const qualityNumB = matchB ? parseInt(matchB[1]) : 0;
  
      return qualityNumB - qualityNumA;
    });
  
    return videos;
  }
  
 