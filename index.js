import { Aniwave } from "./src/app/aniwave";

async function main() {
    const aniwave = new Aniwave();

    // console.log(await aniwave.getHome())

    let popular = await aniwave.getPopular(1);


    console.log(popular);

    let data = {
        name: "ONE PIECE",
        imageUrl: "https://static.aniwave.to/i/1/1b/1bb2150e9529b52995336d38e74e94b6.jpg",
        link: "/watch/one-piece.ov8",
      }

    // let details = await aniwave.getDetail(popular["list"][0].link);
    // let details = await aniwave.getDetail(data.link);

    // console.log(details);
}




main();