"use client"
import React, { useEffect, useState } from 'react'
import ProfileHeader from './_components/ProfileHeader'
import ProfileTabs from './_components/ProfileTabs'
import { useRouter } from 'next/navigation'
import { MorphingSquare } from '@/components/ui/morphing-square'


const page = () => {
    const [loading, setLoading] = useState(true)
    const [userData, setUserData] = useState(null)
    const router = useRouter()

    useEffect(() => {
        async function fetchData() {
            try {
                const token = localStorage.getItem('token')

                if (!token) {
                    router.push('/auth/log-in')
                    return
                }

                const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/me`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })

                if (!res.ok) {
                    throw new Error("Failed to fetch user")
                }

                const data = await res.json()
                setUserData(data)

            } catch (error) {
                console.log('Failed to load profile:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    if (loading || !userData) {
        return (
            <section className='flex items-center justify-center' style={{ height: 'calc(100vh - 64px)' }}>
                <MorphingSquare message='Loading profile...' />
            </section>
        )
    }
    return (
        <div className='p-4 font-urbanist pl-11 pr-11 mx-auto max-w-4xl space-y-6'>
            <ProfileHeader initialData={userData}/>
            <ProfileTabs initialData={userData}/>
        </div>
    )
}

export default page
