import aniwave from "./source";
import { Client } from "../client/client";
import { getPopular } from "../helpers/getPopular";
import { getDetail } from "../helpers/getDetail";

export class Aniwave {

/**
 * Represents the Aniwave class.
 * @param {import("../types/source").Source} source - The source object.
 */
    constructor(source) {
        this.source = source || aniwave;
        this.client = Client;
}


getbaseUrl() {
    return this.source.baseUrl;
}

async getHome(){
    return this.client.get("")
}

async getPopular(page) {
    return await getPopular(page);
}

async getDetail(url){
    return  await getDetail(url);
}

}