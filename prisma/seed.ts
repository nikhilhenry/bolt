import { prisma } from "../src/server/db/client";
import { hashPassword } from "../src/utils/hash";
import { env } from "../src/env/server.mjs";

async function main() {
    const name = "nikhilhenry";
    const password = hashPassword(env.MAIN_PASSWORD);
    await prisma.user.upsert({
        where: {
            name,
        },
        create: {
            name,
            password,
        },
        update: {
            name,
            password,
        },
    });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
