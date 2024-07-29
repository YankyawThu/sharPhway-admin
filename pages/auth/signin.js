import { signIn, getCsrfToken } from "next-auth/react"
import { useRouter } from 'next/router'
import { useState } from 'react'

export async function getServerSideProps(context) {
    const csrfToken = await getCsrfToken(context)
    // const providers = await getProviders()
    return {
        props: { csrfToken: csrfToken || null }
    }
}

export default function Signin({csrfToken = null}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()

    const handleSignIn = async (e) => {
        e.preventDefault()
    
        const response = await signIn('credentials', {
            email,
            password
        })
    }

    return (
        <div className="h-screen flex flex-col items-center justify-center bg-[#efefef] text-black">
            <div className="bg-[#ffff] w-96 p-7">
                <div className="text-center text-lg">ADMIN PANEL</div>
                <form method="post" onSubmit={handleSignIn}>
                    <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                    <div className="my-5">
                        <div className="text-gray-400">Email</div>
                        <input name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="block focus:outline-none bg-transparent p-2 w-full border-[1px] border-[#E9B44C] rounded-lg" />
                    </div>
                    <div className="my-5">
                        <div className="text-gray-400">Password</div>
                        <input name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="block focus:outline-none bg-transparent p-2 w-full border-[1px] border-[#E9B44C] rounded-lg" />
                    </div>
                    <div className=""><button type="submit" className="p-3 mt-5 w-full rounded-lg text-[#9B2915] bg-[#E9B44C]">Sign In</button></div>
                </form>
            </div>
        </div>
    )
}