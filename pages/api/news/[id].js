import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
    const { id } = req.query

    if (req.method === 'GET') {
        try {
            await prisma.$connect()
            const data = await prisma.news.findUnique({
                where: { id },
            })
            if (data) {
                return res.status(200).json(data)
            } else {
                return res.status(404).json({ msg: 'Not found' })
            }
        } catch (error) {
            return res.status(500).json({ msg: error })
        } finally {
            await prisma.$disconnect()
        }
    } else if (req.method === 'PUT') {
        try{
            await prisma.$connect()
            const { title, content, imgsArray } = req.body
            const data = await prisma.news.update({
                data: {
                    title,
                    content,
                    img1: imgsArray[0] ? imgsArray[0].img : null,
                    img2: imgsArray[1] ? imgsArray[1].img : null,
                    img3: imgsArray[2] ? imgsArray[2].img : null,
                    img4: imgsArray[3] ? imgsArray[3].img : null,
                    img5: imgsArray[4] ? imgsArray[4].img : null,
                },
                where: {
                    id
                }
            })
        } catch (error) {
            return res.status(500).json({ msg: error })
        } finally {
            await prisma.$disconnect()
        }
        return res.status(200).json({msg: 'Updated successfully'})
    } else if (req.method === 'DELETE') {
        try {
            await prisma.$connect()
            await prisma.news.delete({
                where: { id },
            })
        } catch (error) {
            return res.status(500).json({ msg: error })
        } finally {
            await prisma.$disconnect()
        }
        return res.status(200).json({msg: 'Deleted Successfully'})
    } else {
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
        return res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}