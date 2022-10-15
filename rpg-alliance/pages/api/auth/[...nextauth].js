import NextAuth from "next-auth/next";
import DiscordProvider from "next-auth/providers/discord";
import { signIn } from "next-auth/react";

export const authOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_ID,
      clientSecret: process.env.DISCORD_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // TODO: validar user é staff e redirecionar para error page
      return true;
    },
  },
};

export default NextAuth(authOptions);
