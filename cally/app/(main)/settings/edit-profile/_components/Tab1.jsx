import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { InfoIcon } from 'lucide-react'
import React from 'react'


const Tab1 = ({ userData, setUserData, updateUserData, updating, loading, originalData }) => {

    function usernameValidation(e) {
        const username = e.target.value;

        if (username === ""){
            setUserData({ ...userData, username: "" });
            return 
        }
        const usernameRegex = /^[a-zA-Z0-9_]+$/;

        if (usernameRegex.test(username)) {
            setUserData({ ...userData, username });
        }
    }

    function checkingDataChanges(){
        if (!originalData){
            return false
        }

        return (userData.fullname !== originalData.fullname || userData.username !== originalData.username || userData.about !== originalData.about)

    }

    function isUsernameValid(){
        return (userData.username && userData.username.trim() !== "")
    }

    return (
        <>
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
                            <Input value={userData.fullname} placeholder="Enter your full name" onChange={(e) => setUserData({ ...userData, fullname: e.target.value })} />
                        </div>

                        <div className="space-y-2">
                            <Label className="-gap-2">Username
                                <span className="text-destructive">*</span>
                            </Label>
                            <div className='flex flex-col gap-1'>
                                <div className="relative">
                                    <Input className="pl-33" value={userData.username} placeholder="Enter your username" onChange={(e) => usernameValidation(e)} />
                                    <span className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3 text-sm text-muted-foreground">
                                        getcally.vercel.com/
                                    </span>
                                </div>
                                <p className="text-xs text-muted-foreground flex items-center gap-1">
                                    <span>
                                        <InfoIcon className='h-3 w-3' />
                                    </span>
                                    Only letters, numbers, and underscores allowed
                                </p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Email</Label>
                            <div className="flex flex-col gap-1">
                                <Input value={userData.email} disabled />
                                <p className="text-xs text-muted-foreground flex items-center gap-1">
                                    <span>
                                        <InfoIcon className='h-3 w-3' />
                                    </span>
                                    Email cannot be changed
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>About</Label>
                        <div className="flex flex-col gap-1">
                            <Textarea maxLength={500} rows={4} value={userData.about} placeholder="Tell others about yourself... Share your role, expertise, or interests." onChange={(e) => setUserData({ ...userData, about: e.target.value })} />
                            <p className="text-xs text-muted-foreground text-right">
                                {(userData.about || "").length}/500 characters
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end">
                <Button size="sm" onClick={updateUserData} disabled={updating || !checkingDataChanges() || !isUsernameValid()} className="cursor-pointer">
                    {updating ? "Saving..." : "Save Changes"}
                </Button>
            </div>
        </>
    )
}

export default Tab1