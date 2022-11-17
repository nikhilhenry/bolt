import { prisma } from "../src/server/db/client";

async function main() {
    const name = "nikhilhenry";
    const password = "test-password";
    await prisma.user.upsert({
        where: {
            name,
        },
        create: {
            name,
            password,
        },
        update: {},
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
