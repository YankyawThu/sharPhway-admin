import {createContext, useContext, useState, useEffect} from 'react'
import { usePathname } from 'next/navigation'

const Context = createContext({})

export function ShowErrorProvider({ children }) {
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)
    const pathname = usePathname()

    const isError = error => {
        setLoading(false)
        setError(error)
    }

    const isLoading = val => {
        setLoading(val)
    }

    useEffect(() => {
        return () => {
            isError('')
            isLoading(true)
        }
    }, [pathname])

    return (
        <Context.Provider value={{ error, loading, isError, isLoading }}>
          {children}
        </Context.Provider>
      )
}

export function useShowErrorContext() {
    return useContext(Context)
  }
  