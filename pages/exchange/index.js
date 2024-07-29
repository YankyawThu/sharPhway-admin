import { useState, useEffect } from 'react'
import Link from 'next/link'
import moment from 'moment'
import { FiPlus } from "react-icons/fi"

export default function Index() {
    const [exchanges, setExchanges] = useState([])

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const response = await fetch('/api/exchange')
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            const data = await response.json()
            setExchanges(data)
        } catch (error) {
            console.error('Error fetching:', error)
        } finally {
            // setLoading(false)
        }
    }

    const removeItem = async(id) => {
        const sure = confirm("Are you sure ?")
        if(sure) {
            try {
                const response = await fetch(`/api/exchange/${id}`, {
                    method: 'DELETE'
                })
                const data = await response.json()
                if (!response.ok) {
                    alert(data.msg)
                }
                fetchData()
                alert(data.msg)
            } catch (error) {
                console.error('Error deleting:', error)
            }
        }
    }

    return (
        <div>
            <Link href="/exchange/add" className="inline-flex items-center p-2 bg-green-50 border-[1px] border-green-500 text-green-500 rounded-lg"><FiPlus className="text-lg mr-1" />Add</Link>
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
                            Min
                        </th>
                        <th
                            scope="col"
                            className="border-b border-gray-200 bg-white py-3 pl-5 text-left text-gray-400 font-thin text-sm"
                        >
                            Max
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
                            <td className="pl-5 py-5 text-gray-600">{item.min}</td>
                            <td className="pl-5 py-5 text-gray-600">{item.max}</td>
                            <td className="pl-5 py-5 text-gray-600">{item.baseAmount}</td>
                            <td className="pl-5 py-5 text-gray-400">{(moment(item.updatedAt).fromNow())}</td>
                            <td className="">
                                <div className="flex self-center gap-1">
                                    <Link href={`/exchange/${item.id}`} className="p-2 bg-blue-50 border-[1px] border-blue-500 text-blue-500 rounded-lg text-xs">Edit</Link>
                                    <button onClick={() => removeItem(item.id)} className="p-2 bg-red-50 border-[1px] border-red-500 text-red-500 rounded-lg text-xs">Delete</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}