import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { env } from "../../../env/server.mjs";
import { prisma } from "../../../server/db/client";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
        maxAge: 3000,
    },
    // Configure one or more authentication providers
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username",
                    type: "text",
                    placeholder: "nikihl",
                },
                password: { label: "Password", type: "password" },
            },
            async authorize(_credentials, _req) {
                // Add logic here to look up the user from the credentials supplied
                const user = {
                    id: "1",
                    name: "J Smith",
                    email: "jsmith@example.com",
                };
                if (user) {
                    console.log("should have logged in successfully");
                    return user;
                } else {
                    return null;
                }
            },
        }),
    ],
};

export default NextAuth(authOptions);
