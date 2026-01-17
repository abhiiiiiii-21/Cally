import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toastManager } from '@/components/ui/toast'
import { EyeIcon, EyeOffIcon, Key } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const Tab3 = ({ userData }) => {
    const toggleVisibility = () => setIsVisible((prev) => !prev);
    const toggleCurrentVisibility = () => setIsCurrentVisible((prev) => !prev);
    const [isVisible, setIsVisible] = useState(false);
    const [isCurrentVisible, setIsCurrentVisible] = useState(false);
    const [loading, setLoading] = useState(false)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [currentUserPassword, setCurrentUserPassword] = useState('')
    const [newUserPassword, setNewUserPassword] = useState('')
    const router = useRouter()

    const onClickChangePass = async (e) => {
        e.preventDefault()

        // Validation
        if (!currentUserPassword || !newUserPassword) {
            toastManager.add({
                description: "Please fill in both password fields.",
                title: "Error",
                type: "error"
            })
            return
        }

        try {
            setLoading(true)
            const token = localStorage.getItem('token')

            if (!token) {
                router.push('/auth/log-in')
                return
            }

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/change-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    "oldPassword": currentUserPassword,
                    "newPassword": newUserPassword
                })
            })

            if (!res.ok) {
                const errorData = await res.json()
                throw new Error(errorData.message || "Failed to change password!");
            }

            const data = await res.json()

            toastManager.add({
                description: "Password changed successfully!",
                title: "Success",
                type: "success"
            })

            setCurrentUserPassword('')
            setNewUserPassword('')
            setDialogOpen(false)

        } catch (error) {
            console.log({ "error": error.message })

            toastManager.add({
                description: error.message || "Failed to change password. Please try again!",
                title: "Error",
                type: "error"
            })

        } finally {
            setLoading(false)
        }
    }
    return (
        <>
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
                                Last changed on {" "}
                                {new Date(userData.passwordUpdatedAt).toLocaleDateString("en-IN", {
                                    timeZone: "Asia/Kolkata",
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                })}
                            </p>
                        </div>
                        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                            <DialogTrigger asChild>
                                <Button variant="outline" size="sm" className="cursor-pointer">
                                    <Key className="h-4 w-4" />
                                    Change Password
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="font-urbanist max-w-[18rem]">
                                <div className="flex flex-col items-center gap-2">
                                    <div aria-hidden="true" className="flex size-11 shrink-0 items-center justify-center rounded-full border">
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
                                <form onSubmit={onClickChangePass} className="space-y-5">
                                    <div className="space-y-4">
                                        <div className="flex flex-col gap-2">
                                            <Label htmlFor="currentPassword">
                                                Current Password
                                            </Label>
                                            <div className="relative">
                                                <Input className="pe-9" id="currentPassword" placeholder="Enter current password"
                                                    type={isCurrentVisible ? "text" : "password"} value={currentUserPassword}
                                                    onChange={(e) => setCurrentUserPassword(e.target.value)} disabled={loading} />
                                                <button aria-controls="password"
                                                    aria-label={isCurrentVisible ? "Hide password" : "Show password"}
                                                    aria-pressed={isCurrentVisible} className="cursor-pointer absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md text-muted-foreground/80 outline-none transition-[color,box-shadow] hover:text-foreground focus:z-10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                                                    onClick={toggleCurrentVisibility} type="button" >
                                                    {isCurrentVisible ? (<EyeOffIcon aria-hidden="true" size={16} />) :
                                                        (<EyeIcon aria-hidden="true" size={16} />)}
                                                </button>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <Label htmlFor="newPassword">
                                                New Password
                                            </Label>
                                            <div className="relative">
                                                <Input className="pe-9" id="newPassword" placeholder="Enter new password"
                                                    type={isVisible ? "text" : "password"} value={newUserPassword}
                                                    onChange={(e) => setNewUserPassword(e.target.value)} disabled={loading} />
                                                <button aria-controls="password"
                                                    aria-label={isVisible ? "Hide password" : "Show password"} aria-pressed={isVisible}
                                                    className="cursor-pointer absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md text-muted-foreground/80 outline-none transition-[color,box-shadow] hover:text-foreground focus:z-10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                                                    onClick={toggleVisibility} type="button">
                                                    {isVisible ? (
                                                        <EyeOffIcon aria-hidden="true" size={16} />) :
                                                        (<EyeIcon aria-hidden="true" size={16} />)}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button className="cursor-pointer" type="submit" size="sm" disabled={loading}>
                                            {loading ? 'Changing...' : 'Change Password'}
                                        </Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}

export default Tab3