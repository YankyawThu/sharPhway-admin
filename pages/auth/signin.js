import { signIn, getCsrfToken } from "next-auth/react"
import { useRouter } from 'next/router'
import { useState } from 'react'

export async function getServerSideProps(context) {
    const csrfToken = await getCsrfToken(context)
    // const providers = await getProviders()
    return {
        props: { csrfToken }
    }
}

export default function Signin({csrfToken}) {
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
                <div className="text-center mb-7 text-lg">ADMIN PANEL</div>
                <form method="post" onSubmit={handleSignIn}>
                    <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                    <div>
                        <div className="text-gray-400">Email</div>
                        <input name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="block focus:outline-none bg-transparent pb-1 w-full" />
                    </div>
                    <div className="bg-[#E9B44C] h-[2px] rounded-full mb-7"></div>
                    <div>
                        <div className="text-gray-400">Password</div>
                        <input name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="block focus:outline-none bg-transparent pb-1 w-full" />
                    </div>
                    <div className="bg-[#E9B44C] h-[2px] rounded-full mb-10"></div>
                    <div className=""><button type="submit" className="p-2 pl-0 pb-0 text-[#9B2915]">SIGN IN</button></div>
                </form>
            </div>
        </div>
    )
}