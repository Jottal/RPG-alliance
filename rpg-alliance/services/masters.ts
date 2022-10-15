import { BaseService } from "./base";
import config from "../central-config.json";
import { DiscordUser } from "/types/discord-user";

export class MastersService extends BaseService {
  static async getMasters(): Promise<DiscordUser[]> {
    const guildMembers: Array<any> = await this.getDiscordAPI(
      `/guilds/${config.central.id}/members`
    );

    const masters = guildMembers.filter((m: any) =>
      m.roles.includes(config.central.roles.master)
    );

    const mastersResponse = masters.map((m: any) => {
      return {
        id: m.user.id,
        username: m.user.username,
        nickname: m.nick,
        avatar: m.user.avatar,
        roles: m.roles.map((r: any) => r.id),
      };
    });

    return mastersResponse;
  }
}
