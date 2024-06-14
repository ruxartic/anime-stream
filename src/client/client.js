import axios from "axios";
import aniwave from "../app/source";
import { headers } from "./headers";
import { Storage } from "../database/store";

const storage = new Storage();

axios.defaults.headers.common["Accept-Encoding"] = "gzip";

class clientClass {
  /**
   * Represents the Aniwave class.
   * @param {import("../types/source").Source} source - The source object.
   */
  constructor(source) {
    this.source = source || aniwave;
    this.client = axios.create({
      baseURL: this.source.baseUrl,
      headers: headers,
    });
  }

  async setup() {
    const cookies = await storage.read("cookies");
    this.client.defaults.headers.Cookie = cookies;

    this.client.interceptors.response.use((response) => {
      if (response.headers["set-cookie"]) {
        console.log("Updating cookies...");
        storage.update("cookies", response.headers["set-cookie"]);
      }
      return response;
    });
  }

  async get(url) {
    const response = await this.client.get(url);
    return response.data;
  }
}
const Client = new clientClass();
Client.setup();

export { Client };
