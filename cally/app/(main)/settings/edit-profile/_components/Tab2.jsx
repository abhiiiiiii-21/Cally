import { Status, StatusIndicator, StatusLabel } from '@/components/kibo-ui/status'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Trash2 } from 'lucide-react'
import React, { useState } from 'react'

const Tab2 = ({ userData }) => {
    const [inputValue, setInputValue] = useState("");

    return (
        <>
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
        </>
    )
}

export default Tab2