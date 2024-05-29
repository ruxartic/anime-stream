import fs from "fs";

export class Storage {
  constructor(filename = "./ata.json") {
    this.filename = filename;
  }

  async read() {
    try {
      const data = await fs.readFileSync(this.filename, "utf-8");
      return JSON.parse(data) || {};
    } catch (error) {
      if (error.code === "ENOENT") {
        // If the file doesn't exist, return an empty object
        return {};
      }
      throw error;
    }
  }

  async write(data) {
    await fs.writeFile(this.filename, JSON.stringify(data, null, 2));
  }

  async update(key, value) {
    const data = await this.read();
    data[key] = value;
    await this.write(data);
  }
}
