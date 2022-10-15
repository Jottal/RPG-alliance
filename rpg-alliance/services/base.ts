import config from "../central-config.json";

export class BaseService {
  static discordURL = config.discordAPI.baseURL + config.discordAPI.version;
  static discordHeader = {
    headers: { Authorization: `Bot ${process.env.BOT_TOKEN}` },
  };

  static centralURL = config.centralAPI.baseURL;

  static async getDiscordAPI<T>(path: string): Promise<T> {
    const response = await fetch(this.discordURL + path, this.discordHeader);
    return await response.json();
  }

  static async postDiscordAPI<T>(path: string, body: Object): Promise<T> {
    const response = await fetch(this.discordURL + path, {
      ...this.discordHeader,
      method: "POST",
      body: JSON.stringify(body),
    });
    return await response.json();
  }

  static async getCentralAPI<T>(path: string): Promise<T> {
    const response = await fetch(this.centralURL + path);
    return await response.json();
  }

  static async postCentralAPI<T>(path: string, body: Object): Promise<T> {
    const response = await fetch(this.centralURL + path, {
      method: "POST",
      body: JSON.stringify(body),
    });
    return await response.json();
  }
}
