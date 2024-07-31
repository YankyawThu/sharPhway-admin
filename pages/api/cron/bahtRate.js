import moment from 'moment'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
    const response = await fetch('https://tmn-mkt-content.s3.amazonaws.com/truemoney-transfer/detail.json')
    const data = await response.json()
    if(data.data) {
        try {
            await prisma.$connect()
            const dateStr = data.data.myanmar[0].date+' '+data.data.myanmar[0].time
            const date = convertUTCFormat(dateStr)
            const last = await prisma.exchange.findFirst({
                orderBy: {
                    updatedAt: 'desc'
                },
                where: {
                    updatedAt: {
                        gte: date
                    }
                }
            })
            if(!last) {
                await prisma.exchange.create({
                    data: {
                        currency: 'Baht',
                        buy: parseFloat(data.data.myanmar[0].thRate),
                        sell: 0.00,
                        baseAmount: data.data.myanmar[0].rate + ' Kyat'
                    },
                })
                return res.json({msg: 'Added Successfully'})
            }
            else return res.json({msg: 'Nothing to update'})
        } catch (error) {
            return res.status(500).json({ msg: 'Database error' })
        }
        finally {
            await prisma.$disconnect()
        }
    }
    else return res.json({msg: 'No data'})
}

const convertUTCFormat = datetimeStr => {
    // Define the format of the input datetime
    const dateFormat = 'DD.MM.YYYY h:mm A'

    // Parse the input datetime using moment.js
    const localDate = moment(datetimeStr, dateFormat)

    // Convert to UTC
    const utcDate = localDate.utc()

    // Format to ISO 8601 format with milliseconds
    const isoFormat = utcDate.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')

    return isoFormat // Output: '2024-07-31T02:00:00.000Z'
}