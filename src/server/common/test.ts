import prisma from "../db/client";

const addTestUser = async () => {
    await prisma.user.create({
        data: {
            email: "dylanmarin2018@gmail.com",
            name: "Dylan",
        }
    })
}

addTestUser();