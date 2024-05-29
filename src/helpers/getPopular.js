import { Client } from "../client/client";
import { parseAnimeList } from "./parsehtml";

export async function getPopular(page) {
    let res = (await Client.get(`/filter?sort=trending&page=${page}`));
    return parseAnimeList(res);
}