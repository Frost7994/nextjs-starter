import { db } from "@/config/drizzle";
import {
  accounts,
  authenticators,
  sessions,
  users,
  verificationTokens,
} from "@/config/drizzle/schema";
import env from "@/data/env";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { AuthOptions, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
    authenticatorsTable: authenticators,
  }),
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
