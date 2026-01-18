"use client"
import React, { useEffect } from 'react'
import SignUpForm from './_components/SignUpForm'
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
    <div>
      <SignUpForm/>
    </div>
  )
}

export default page