import { Aniwave } from "./src/app/aniwave";
import { getVideoList } from "./src/helpers/getVideoList";

async function main() {
    const aniwave = new Aniwave();

    // console.log(await aniwave.getHome())

    // let popular = await aniwave.getPopular(1);


    // console.log(popular);

    let data = {
        name: "THE NEW GATE",
        imageUrl: "https://static.aniwave.to/i/8/85/27e794dce733c37badd3e86e1c2c3e0b.jpg",
        link: "/watch/the-new-gate.6lxjp",
      }

    // let details = await aniwave.getDetail(popular["list"][0].link);
    // let details = await aniwave.getDetail(data.link);

    // console.log(details);

    let episode = {
        name: "Episode 1",
        scanlator: "Sub, Softsub",
        url: "Hj-aD8Im,Hj-aD8In&epurl=/watch/the-new-gate.6lxjp/ep-1",
      }

      let videos = await getVideoList(episode.url);

      console.log(videos)

}




main();