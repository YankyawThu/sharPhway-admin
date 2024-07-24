import { useState, useEffect } from "react"
import { useRouter } from 'next/router'

export default function Edit() {
    const [currency, setCurrency] = useState('')
    const [description, setDescription] = useState('')
    const [min, setMin] = useState('')
    const [max, setMax] = useState('')
    const [baseAmount, setBaseAmount] = useState('')
    
    const router = useRouter()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/exchange/${router.query.id}`)
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                const data = await response.json()
                setCurrency(data.currency)
                setDescription(data.description)
                setMin(data.min)
                setMax(data.max)
                setBaseAmount(data.baseAmount)
            } catch (error) {
                console.error('Error fetching:', error)
            } finally {
                // setLoading(false)
            }
        }
        fetchData()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
    
        const response = await fetch(`/api/exchange/${router.query.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                currency,
                description,
                min: parseFloat(min),
                max: parseFloat(max),
                baseAmount
            })
        })

        if(response.ok) {
            const data = await response.json()
            alert(data.msg)
            router.push('/exchange')
        }
    }

    return (
        <div className="bg-white w-96 py-3 p-7 rounded-lg">
            <form method="POST" onSubmit={handleSubmit}>
                <div className="my-3">
                    <div className="text-gray-400">Currency</div>
                    <input name="currency" type="text" value={currency} onChange={(e) => setCurrency(e.target.value)} className="block focus:outline-none bg-transparent p-2 w-full border-[1px] border-gray-500 text-gray-600 rounded-lg" required />
                </div>
                <div className="my-3">
                    <div className="text-gray-400">Description</div>
                    <input name="description" type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="block focus:outline-none bg-transparent p-2 w-full border-[1px] border-gray-500 text-gray-600 rounded-lg" />
                </div>
                <div className="my-3">
                    <div className="text-gray-400">Min</div>
                    <input name="min" type="text" value={min} onChange={(e) => setMin(e.target.value)} className="block focus:outline-none bg-transparent p-2 w-full border-[1px] border-gray-500 text-gray-600 rounded-lg" required />
                </div>
                <div className="my-3">
                    <div className="text-gray-400">Max</div>
                    <input name="max" type="text" value={max} onChange={(e) => setMax(e.target.value)} className="block focus:outline-none bg-transparent p-2 w-full border-[1px] border-gray-500 text-gray-600 rounded-lg" required />
                </div>
                <div className="my-3">
                    <div className="text-gray-400">Base Amount</div>
                    <input name="baseAmount" type="text" value={baseAmount} onChange={(e) => setBaseAmount(e.target.value)} className="block focus:outline-none bg-transparent p-2 w-full border-[1px] border-gray-500 text-gray-600 rounded-lg" required />
                </div>
                <div className="mt-7 mb-3">
                    <button type="submit" className="bg-blue-50 border-[1px] border-blue-500 text-blue-500 py-2 px-3 rounded-lg mr-1">Update</button>
                    <button type="button" onClick={() => router.push('/exchange')} className="bg-yellow-50 border-[1px] border-yellow-600 text-yellow-600 py-2 px-3 rounded-lg">Cancel</button>
                </div>
            </form>
        </div>
    )
}