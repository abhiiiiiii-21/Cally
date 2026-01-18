"use client"
import React, { useEffect } from 'react'
import SignInForm from './_components/SignInForm'
import { useRouter } from 'next/navigation'

const page = () => {
   const router = useRouter()
  
    useEffect(() => {
      const token = localStorage.getItem('token')
  
      if (token){
        router.replace('/dashboard')
      }
    },[router])
    
  return (
    <div className="flex items-center justify-center w-full h-full">
      <SignInForm/>
    </div>
  )
}

export default page