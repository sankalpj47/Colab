import prisma from "../../config/prisma.config";

const findAllDocumentsByUser = async (userId: string) => {
    try {
        const documents = await prisma.document.findMany({
            where: {
                ownerId: userId
            }
        })

        return documents
    } catch (err) {
        throw err;
    }
}

export {
    findAllDocumentsByUser
}