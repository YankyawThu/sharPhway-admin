import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            await prisma.$connect()
            const data = await prisma.news.findMany({orderBy: {updatedAt: 'desc'}})
            return res.status(200).json(data)
        } catch (error) {
            return res.status(500).json({ msg: 'Database error' })
        } finally {
            await prisma.$disconnect()
        }
    }
    else if (req.method === 'POST') {
        try {
            await prisma.$connect()
            const { title, imgs, content } = req.body
            await prisma.news.create({
                data: {
                    title,
                    content,
                    img1: imgs[0]?.thumbnailLink,
                    img2: imgs[1]?.thumbnailLink,
                    img3: imgs[2]?.thumbnailLink,
                    img4: imgs[3]?.thumbnailLink,
                    img5: imgs[4]?.thumbnailLink,
                },
            })
        } catch (error) {
            return res.status(500).json({ msg: 'Database error' })
        } finally {
            await prisma.$disconnect()
        }
        return res.status(201).json({msg: 'Added Successfully'})
    }
    else {
        res.setHeader('Allow', ['GET', 'POST'])
        return res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}