"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toastManager } from "@/components/ui/toast";
import Tab1 from "./Tab1";
import Tab2 from "./Tab2";
import Tab3 from "./Tab3";

export default function ProfileTabs() {
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [updating, setUpdating] = useState(false)
    const [userData, setUserData] = useState({ fullname: "", username: "", email: "", about: "" });
    const [originalData, setOriginalData] = useState(null)


    const fetchUserData = async () => {
        try {
            setLoading(true)
            const token = localStorage.getItem('token')

            if (!token) {
                console.log("Token is missing!")
                router.push('/auth/log-in')
                return
            }

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/me`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })

            if (!res.ok) {
                throw new Error("Failed to fetch user");
            }

            const data = await res.json()

            setUserData({ fullname: data.fullname, username: data.username, email: data.email, about: data.about, profilePic: data.profilePic, passwordUpdatedAt: data.passwordUpdatedAt })
            setOriginalData({ fullname: data.fullname, username: data.username, email: data.email, about: data.about, profilePic: data.profilePic, passwordUpdatedAt: data.passwordUpdatedAt })
        } catch (error) {
            console.error("User fetch failed:", error)
        } finally {
            setLoading(false)
        }
    }

    const updateUserData = async () => {
        try {
            setUpdating(true)
            const token = localStorage.getItem('token')

            if (!token) {
                router.push('/auth/log-in')
                return
            }

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/me`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    fullname: userData.fullname,
                    username: userData.username,
                    about: userData.about,
                })
            })

            if (!res.ok) {
                throw new Error("Failed to update user");
            }

            const updatedData = await res.json()

            setUserData({ ...userData, fullname: updatedData.fullname, username: updatedData.username, about: updatedData.about })
            setOriginalData({ fullname: updatedData.fullname, username: updatedData.username, about: updatedData.about })
            toastManager.add({
                description: "Profile updated successfully!",
                title: "Success!",
                type: "success",
            })

        } catch (error) {
            console.error("User profile updating failed:", error)


            toastManager.add({
                description: "Username already exists! Please try again.",
                title: "Error!",
                type: "error",
            })
        } finally {
            setUpdating(false)
        }
    }

    const deleteUserData = async () => {
        try {
            const token = localStorage.getItem('token')

            if (!token) {
                router.push('/auth/log-in')
                return
            }

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/me`, {
                method: "DELETE",
                headers: {
                    'Content-Type': "application/json",
                    'Authorization': `Bearer ${token}`
                }
            })

            const data = await res.json()

            if (!res.ok) {
                throw new Error(data.message || 'Failed to delete!')
            }


            toastManager.add({
                description: "Profile deleted successfully!",
                title: "Success!",
                type: "success",
            })


            localStorage.removeItem('token')
            router.push('/auth/log-in')

        } catch (error) {
            console.log({ "error": error.message })

            toastManager.add({
                description: "Failed to delete profile! Please try again.",
                title: "Error!",
                type: "error",
            })
        }
    }

    useEffect(() => {
        fetchUserData()
    }, [])



    return (
        <Tabs defaultValue="personal" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>

            {/* First */}
            <TabsContent value="personal" className="space-y-6">
                <Tab1 userData={userData} setUserData={setUserData} updateUserData={updateUserData} updating={updating} loading={loading} originalData={originalData} />
            </TabsContent>

            {/* Second */}
            <TabsContent value="account" className="space-y-6">
                <Tab2 userData={userData} deleteUserData={deleteUserData} />
            </TabsContent>

            {/* Third */}
            <TabsContent value="security" className="space-y-6">
                <Tab3 userData={userData} />
            </TabsContent>
        </Tabs>
    );
}
