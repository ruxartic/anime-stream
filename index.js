import { Aniwave } from "./src/app/aniwave";
import { getVideoList } from "./src/helpers/getVideoList";

async function main() {
    const aniwave = new Aniwave();

    let popular = await aniwave.getPopular(1);

    console.log(popular);

    let details = await aniwave.getDetail(popular["list"][1].link);

    console.log(details);

    let episode = details.chapters[0];

      let videos = await getVideoList(episode.url);

      console.log(videos)

}




main();