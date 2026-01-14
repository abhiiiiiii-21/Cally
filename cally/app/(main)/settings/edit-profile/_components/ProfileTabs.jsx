"use client";
import { EyeIcon, EyeOffIcon, Key, Trash2, } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { Status, StatusIndicator, StatusLabel } from "@/components/kibo-ui/status";
import { useRouter } from "next/navigation";
import { toastManager } from "@/components/ui/toast";

export default function ProfileTabs() {
    const router = useRouter()
    const [inputValue, setInputValue] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const [loading, setLoading] = useState(true)

    const [userData, setUserData] = useState({ fullname: "", username: "", email: "", about: "", profilePic: "", passwordUpdatedAt: "" });

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
        } catch (error) {
            console.error("User fetch failed:", error)
        } finally {
            setLoading(false)
        }
    }

    const updateUserData = async () => {
        try {
            const token = localStorage.getItem('token')

            if (!token) {
                router.push('/auth/login')
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
                return
            }

            const updatedData = await res.json()

            setUserData({ fullname: updatedData.fullname, username: updatedData.username, about: updatedData.about })

            toastManager.add({
                description: "Profile updated successfully!",
                title: "Success!",
                variant: "default",
            })

        } catch (error) {
            console.error("User profile updating failed:", error)
        }
    }

    useEffect(() => {
        fetchUserData()
    }, [])

    const toggleVisibility = () => setIsVisible((prev) => !prev);


    return (
        <Tabs defaultValue="personal" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>

            {/* First */}
            <TabsContent value="personal" className="space-y-6">
                <Card className="bg-black">
                    <CardHeader>
                        <CardTitle>Personal Information</CardTitle>
                        <CardDescription>
                            Update your personal details and profile information.
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label>Full Name</Label>
                                <Input value={userData.fullname} placeholder="Enter your full name" onChange= {(e) => setUserData({ ...userData, fullname: e.target.value })}/>
                            </div>

                            <div className="space-y-2">
                                <Label>Username</Label>
                                <div className="relative">
                                    <Input className="pl-33" value={userData.username} placeholder="Enter your username" onChange= {(e) => setUserData({ ...userData, username: e.target.value })}/>
                                    <span className="absolute inset-y-0 start-0 flex items-center ps-3 text-sm text-muted-foreground">
                                        getcally.vercel.com/
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Email</Label>
                                <Input value={userData.email} disabled />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>About</Label>
                            <Textarea rows={4} value={userData.about} placeholder="Tell others about yourself... Share your role, expertise, or interests." onChange= {(e) => setUserData({ ...userData, about: e.target.value })}/>
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end">
                    <Button size="sm" onClick={updateUserData}>
                        Save Changes
                    </Button>
                </div>
            </TabsContent>

            {/* Second */}
            <TabsContent value="account" className="space-y-6">
                <Card className="bg-black">
                    <CardHeader>
                        <CardTitle>Account Settings</CardTitle>
                        <CardDescription>
                            Manage your account preferences.
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        <div className="flex justify-between">
                            <div>
                                <Label>Account Status</Label>
                                <p className="text-sm text-muted-foreground">
                                    Your account is currently active
                                </p>
                            </div>
                            <Status status="online" className="px-4" variant="outline">
                                <StatusIndicator />
                                <StatusLabel>Active</StatusLabel>
                            </Status>
                        </div>

                        <Separator />

                        <div className="flex justify-between">
                            <div>
                                <Label>Data Export</Label>
                                <p className="text-sm text-muted-foreground">
                                    Download a copy of your data
                                </p>
                            </div>
                            <Button size="sm" variant="outline">
                                Export Data
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-destructive/50 bg-black">
                    <CardHeader>
                        <CardTitle className="text-destructive">
                            Danger Zone
                        </CardTitle>
                        <CardDescription>
                            Irreversible and destructive actions
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <Dialog>
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <Label className="text-base">Delete Account</Label>
                                    <p className="text-muted-foreground text-sm"> Permanently delete your account and all data </p>
                                </div>

                                <DialogTrigger asChild>
                                    <Button variant="destructive" size="sm" className="cursor-pointer">
                                        <Trash2 className="h-4 w-4" />
                                        Delete Account
                                    </Button>
                                </DialogTrigger>
                            </div>
                            <DialogContent className="font-urbanist">
                                <DialogHeader>
                                    <DialogTitle className="text-destructive">
                                        Delete confirmation
                                    </DialogTitle>
                                    <DialogDescription>
                                        Type your username to confirm.
                                    </DialogDescription>
                                </DialogHeader>

                                <Input value={inputValue} placeholder={`Type ${userData.username}`} />

                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button variant="outline" className="cursor-pointer">
                                            Cancel
                                        </Button>
                                    </DialogClose>

                                    <Button className="cursor-pointer">
                                        Delete
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </CardContent>
                </Card>
            </TabsContent>

            {/* Third */}
            <TabsContent value="security" className="space-y-6">
                <Card className="bg-black">
                    <CardHeader>
                        <CardTitle>Security Settings</CardTitle>
                        <CardDescription>
                            Manage your account security.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <Label className="text-base">Password</Label>
                                <p className="text-muted-foreground text-sm">
                                    Last changed {userData.passwordUpdatedAt}
                                </p>
                            </div>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="cursor-pointer"
                                    >
                                        <Key className="h-4 w-4" />
                                        Change Password
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="font-urbanist max-w-[18rem]">
                                    <div className="flex flex-col items-center gap-2">
                                        <div
                                            aria-hidden="true"
                                            className="flex size-11 shrink-0 items-center justify-center rounded-full border">
                                            <Key className="h-4 w-4" />
                                        </div>
                                        <DialogHeader>
                                            <DialogTitle className="sm:text-center">
                                                Change Password
                                            </DialogTitle>
                                            <DialogDescription className="sm:text-center">
                                                Enter your current and new password.
                                            </DialogDescription>
                                        </DialogHeader>
                                    </div>
                                    <form className="space-y-5">
                                        <div className="space-y-4">
                                            <div className="flex flex-col gap-2">
                                                <Label htmlFor="currentPassword">
                                                    Current Password
                                                </Label>
                                                <div className="relative">
                                                    <Input className="pe-9" id="currentPassword"
                                                        placeholder="Enter current password"
                                                        type={isVisible ? "text" : "password"} />
                                                    <button aria-controls="password"
                                                        aria-label={isVisible ? "Hide password" : "Show password"}
                                                        aria-pressed={isVisible}
                                                        className="cursor-pointer absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md text-muted-foreground/80 outline-none transition-[color,box-shadow] hover:text-foreground focus:z-10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                                                        onClick={toggleVisibility}
                                                        type="button" >
                                                        {isVisible ? (<EyeOffIcon aria-hidden="true" size={16} />
                                                        ) : (
                                                            <EyeIcon aria-hidden="true" size={16} />)}
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <Label htmlFor="newPassword">
                                                    New Password
                                                </Label>
                                                <div className="relative">
                                                    <Input className="pe-9" id="newPassword" placeholder="Enter new password"
                                                        type={isVisible ? "text" : "password"} />
                                                    <button
                                                        aria-controls="password"
                                                        aria-label={isVisible ? "Hide password" : "Show password"}
                                                        aria-pressed={isVisible}
                                                        className="cursor-pointer absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md text-muted-foreground/80 outline-none transition-[color,box-shadow] hover:text-foreground focus:z-10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                                                        onClick={toggleVisibility}
                                                        type="button">
                                                        {isVisible ? (
                                                            <EyeOffIcon aria-hidden="true" size={16} />
                                                        ) : (
                                                            <EyeIcon aria-hidden="true" size={16} />
                                                        )}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <Button className="cursor-pointer" type="submit" size="sm">
                                                Change Password
                                            </Button>
                                        </DialogFooter>
                                    </form>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    );
}
