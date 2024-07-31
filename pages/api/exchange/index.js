import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            await prisma.$connect()
            const data = await prisma.exchange.findMany({orderBy: {updatedAt: 'desc'}})
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
            const { data } = req.body
            await prisma.exchange.create({
                data: {
                    currency: data.currency,
                    description: data.description,
                    buy: parseFloat(data.buy),
                    sell: parseFloat(data.sell),
                    baseAmount: data.baseAmount
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