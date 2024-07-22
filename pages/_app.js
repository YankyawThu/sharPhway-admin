import "@/styles/globals.css"

import { SessionProvider } from "next-auth/react"
import { DashboardLayout } from './dashboard/Layout'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter()
  return (
    <SessionProvider session={session}>
      {router.pathname.startsWith('/auth') ? 
        <Component {...pageProps} />
        :
        <DashboardLayout>
          <Component {...pageProps} />
        </DashboardLayout>
      }
    </SessionProvider>
  )
}