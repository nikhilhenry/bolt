import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { env } from "../../../env/server.mjs";
import { prisma } from "../../../server/db/client";
import { matchPassword } from "../../../utils/hash";

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
            async authorize(credentials, _req) {
                // Add logic here to look up the user from the credentials supplied
                if (!credentials) return null;
                const { username, password } = credentials;
                const user = await prisma.user.findUnique({
                    where: {
                        name: username,
                    },
                });
                if (user && matchPassword(password, user.password)) {
                    return user;
                } else {
                    return null;
                }
            },
        }),
    ],
};

export default NextAuth(authOptions);
