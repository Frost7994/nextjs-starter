import env from "@/data/env";
import { AuthOptions, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {},

  pages: {},
};

export const getAuthSession = async () => await getServerSession(authOptions);
