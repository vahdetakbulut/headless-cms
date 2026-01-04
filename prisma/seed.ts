import { PrismaClient, Role } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    const password = await hash("admin123", 12);

    const user = await prisma.user.upsert({
        where: { email: "admin@medyagem.com" },
        update: {},
        create: {
            email: "admin@medyagem.com",
            name: "Admin User",
            password,
            role: Role.ADMIN,
        },
    });

    const site = await prisma.site.upsert({
        where: { slug: "medyagem-ana-site" },
        update: {},
        create: {
            name: "MedyaGem Ana Site",
            slug: "medyagem-ana-site",
            domain: "medyagem.com",
        },
    });

    console.log({ user, site });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
