import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { EyeIcon, EyeOffIcon, Key } from 'lucide-react'
import React, { useState } from 'react'

const Tab3 = ({userData}) => {
    const toggleVisibility = () => setIsVisible((prev) => !prev);
    const [isVisible, setIsVisible] = useState(false);


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
                                Last changed 2 months ago
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
                                                <Input className="pe-9" id="currentPassword" placeholder="Enter current password" type={isVisible ? "text" : "password"} />
                                                <button aria-controls="password"
                                                    aria-label={isVisible ? "Hide password" : "Show password"}
                                                    aria-pressed={isVisible}
                                                    className="cursor-pointer absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md text-muted-foreground/80 outline-none transition-[color,box-shadow] hover:text-foreground focus:z-10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                                                    onClick={toggleVisibility}
                                                    type="button" >
                                                    {isVisible ? (<EyeOffIcon aria-hidden="true" size={16} />) : 
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
        </>
    )
}

export default Tab3