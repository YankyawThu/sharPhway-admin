import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FiPlus } from "react-icons/fi"
import { fetchExchanges, deleteExchange } from '@/lib/api/exchange'
import { timeDiffFromDate } from '@/lib/utils/helper'

export default function Index() {
    const [exchanges, setExchanges] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchExchanges()
                setExchanges(data)
            } catch (error) {
                setError('Error fetching data')
            } finally {
                setLoading(false)
            }
        }
        loadData()
    }, [])

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure?')) {
            try {
                await deleteExchange(id)
                setExchanges((prev) => prev.filter((item) => item.id !== id))
            } catch (error) {
                setError('Error deleting data')
            }
        }
    }

    return (
        <>
            <Link href="/exchange/add" className="inline-flex items-center p-2 bg-green-50 border-[1px] border-green-500 text-green-500 rounded-lg"><FiPlus className="text-lg mr-1" />Add</Link>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <table className="w-full leading-normal mt-2">
                    <thead>
                        <tr>
                            <th
                                scope="col"
                                className="border-b border-gray-200 bg-white py-3 pl-5 text-left text-gray-400 font-thin text-sm rounded-tl-lg"
                            >
                                Currency
                            </th>
                            <th
                                scope="col"
                                className="border-b border-gray-200 bg-white py-3 pl-5 text-left text-gray-400 font-thin text-sm"
                            >
                                Description
                            </th>
                            <th
                                scope="col"
                                className="border-b border-gray-200 bg-white py-3 pl-5 text-left text-gray-400 font-thin text-sm"
                            >
                                Buy
                            </th>
                            <th
                                scope="col"
                                className="border-b border-gray-200 bg-white py-3 pl-5 text-left text-gray-400 font-thin text-sm"
                            >
                                Sell
                            </th>
                            <th
                                scope="col"
                                className="border-b border-gray-200 bg-white py-3 pl-5 text-left text-gray-400 font-thin text-sm"
                            >
                                Base Amount
                            </th>
                            <th
                                scope="col"
                                className="border-b border-gray-200 bg-white py-3 pl-5 text-left text-gray-400 font-thin text-sm"
                            >
                                Updated At
                            </th>
                            <th
                                scope="col"
                                className="border-b border-gray-200 bg-white py-3 pl-5 text-left text-gray-400 font-thin text-sm rounded-tr-lg"
                            >
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {exchanges?.map(item => (
                            <tr key={item.id} className="bg-white">
                                <td className="pl-5 py-5 text-gray-600">{item.currency}</td>
                                <td className="pl-5 py-5 text-gray-600">{item.description}</td>
                                <td className="pl-5 py-5 text-gray-600">{item.buy}</td>
                                <td className="pl-5 py-5 text-gray-600">{item.sell}</td>
                                <td className="pl-5 py-5 text-gray-600">{item.baseAmount}</td>
                                <td className="pl-5 py-5 text-gray-400">{timeDiffFromDate(item.updatedAt)}</td>
                                <td className="">
                                    <div className="flex self-center gap-1">
                                        <Link href={`/exchange/${item.id}`} className="p-2 bg-blue-50 border-[1px] border-blue-500 text-blue-500 rounded-lg text-xs">Edit</Link>
                                        <button onClick={() => handleDelete(item.id)} className="p-2 bg-red-50 border-[1px] border-red-500 text-red-500 rounded-lg text-xs">Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    )
}