import { useState } from "react"
import { useRouter } from 'next/router'
import { saveExchange } from '@/lib/api/exchange'

export default function Add() {
    const [exchange, setExchange] = useState({
        currency: '',
        description: '',
        buy: '',
        sell: '',
        baseAmount: ''
    })
    const [error, setError] = useState(null)

    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const data = await saveExchange(exchange)
            alert(data.msg)
            router.push('/exchange')
        } catch (error) {
            setError('Error saving data')
        } finally {
            // setLoading(false)
        }
    }

    const handleCurrency = val => {
        const data = {...exchange, currency: val}
        setExchange(data)
    }

    const handleDescription = val => {
        const data = {...exchange, description: val}
        setExchange(data)
    }

    const handleBuy = val => {
        const data = {...exchange, buy: val}
        setExchange(data)
    }

    const handleSell = val => {
        const data = {...exchange, sell: val}
        setExchange(data)
    }

    const handleBaseAmount = val => {
        const data = {...exchange, baseAmount: val}
        setExchange(data)
    }

    return (
        <>
        {error ? (
            <p>{error}</p>
        ) : (
        <div className="bg-white w-96 py-3 p-7 rounded-lg">
            <form method="POST" onSubmit={handleSubmit}>
                <div className="my-3">
                    <div className="text-gray-400">Currency</div>
                    <input name="currency" placeholder="eg., Baht" type="text" value={exchange.currency} onChange={(e) => handleCurrency(e.target.value)} className="block focus:outline-none bg-transparent p-2 w-full border-[1px] border-gray-500 text-gray-600 rounded-lg" required/>
                </div>
                <div className="my-3">
                    <div className="text-gray-400">Description</div>
                    <input name="description" placeholder="eg., Kyat to Baht" type="text" value={exchange.description} onChange={(e) => handleDescription(e.target.value)} className="block focus:outline-none bg-transparent p-2 w-full border-[1px] border-gray-500 text-gray-600 rounded-lg"/>
                </div>
                <div className="my-3">
                    <div className="text-gray-400">Buy</div>
                    <input name="buy" placeholder="eg., 135" type="text" value={exchange.buy} onChange={(e) => handleBuy(e.target.value)} className="block focus:outline-none bg-transparent p-2 w-full border-[1px] border-gray-500 text-gray-600 rounded-lg" required/>
                </div>
                <div className="my-3">
                    <div className="text-gray-400">Sell</div>
                    <input name="sell" placeholder="eg., 138" type="text" value={exchange.sell} onChange={(e) => handleSell(e.target.value)} className="block focus:outline-none bg-transparent p-2 w-full border-[1px] border-gray-500 text-gray-600 rounded-lg" required/>
                </div>
                <div className="my-3">
                    <div className="text-gray-400">Base Amount</div>
                    <input name="baseAmount" placeholder="eg., 1 Baht" type="text" value={exchange.baseAmount} onChange={(e) => handleBaseAmount(e.target.value)} className="block focus:outline-none bg-transparent p-2 w-full border-[1px] border-gray-500 text-gray-600 rounded-lg" required/>
                </div>
                <div className="mt-7 mb-3">
                    <button type="submit" className="bg-blue-50 border-[1px] border-blue-500 text-blue-500 py-2 px-3 rounded-lg mr-1">Submit</button>
                    <button type="button" onClick={() => router.push('/exchange')} className="bg-yellow-50 border-[1px] border-yellow-600 text-yellow-600 py-2 px-3 rounded-lg">Cancel</button>
                </div>
            </form>
        </div>
        )}
        </>
    )
}