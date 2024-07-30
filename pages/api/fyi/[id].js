import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
    const { id } = req.query

    if (req.method === 'GET') {
        try {
            await prisma.$connect()
            const data = await prisma.fyi.findUnique({
                where: { id },
            })
            if (data) {
                return res.status(200).json(data)
            } else {
                return res.status(404).json({ msg: 'Not found' })
            }
        } catch (error) {
            return res.status(500).json({ msg: 'Database error' })
        } finally {
            await prisma.$disconnect()
        }
    } else if (req.method === 'PUT') {
        try{
            await prisma.$connect()
            const { data } = req.body
            await prisma.fyi.update({
                data: {
                    title: data.title,
                    content: data.content,
                },
                where: {
                    id
                }
            })
        } catch (error) {
            return res.status(500).json({ msg: 'Database error' })
        } finally {
            await prisma.$disconnect()
        }
        return res.status(200).json({msg: 'Updated successfully'})
    } else if (req.method === 'DELETE') {
        try {
            await prisma.$connect()
            await prisma.fyi.delete({
                where: { id },
            })
        } catch (error) {
            return res.status(500).json({ msg: 'Database error' })
        } finally {
            await prisma.$disconnect()
        }
        return res.status(200).json({msg: 'Deleted Successfully'})
    } else {
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
        return res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}