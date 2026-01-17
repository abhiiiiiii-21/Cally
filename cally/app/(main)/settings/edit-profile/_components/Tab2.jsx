import { Status, StatusIndicator, StatusLabel } from '@/components/kibo-ui/status'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { DownloadIcon, Trash2Icon } from 'lucide-react'
import React, { useState } from 'react'
import { toastManager } from '@/components/ui/toast'
import { useRouter } from 'next/navigation'

const Tab2 = ({ userData, deleteUserData }) => {
    const [inputValue, setInputValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [exporting, setExporting] = useState(false)
    const router = useRouter()

    function handleDeleteClick() {

        if (userData.username !== inputValue.trim()) {
            toastManager.add({
                description: "Username does not match!",
                title: "Error!",
                type: "error",
            })
        }
        else {
            setLoading(true)
            deleteUserData()
        }
    }

    const handleExportData = async () => {
        try {
            setExporting(true)
            const token = localStorage.getItem('token')

            if (!token) {
                router.push('/auth/log-in')
                return
            }

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/export-data`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })


            if (!res.ok) {
                throw new Error('Failed to export data.')
            }

            const exportData = await res.json();

            const jsonString = JSON.stringify(exportData, null, 2);

            const blob = new Blob([jsonString], { type: 'application/json' });

            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${userData.username || 'user'}_complete_export_.json`;

            document.body.appendChild(a);
            a.click();

            a.remove();
            window.URL.revokeObjectURL(url);

            toastManager.add({
                description: "Your data has been exported successfully!",
                title: 'Success!',
                type: 'success'
            })

        } catch (error) {
            console.log({ 'error': error.message })

            toastManager.add({
                description: 'Failed to export your data. Please try again!',
                title: 'Error',
                type: 'error'
            })
        } finally {
            setExporting(false)
        }
    }


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
                        <Status status="online" className="px-4 pointer-events-none" variant="outline">
                            <StatusIndicator />
                            <StatusLabel className="font-semibold">Active</StatusLabel>
                        </Status>
                    </div>

                    <Separator />

                    <div className="flex justify-between">

                        <div>
                            <Label>Data Export</Label>
                            <p className="text-sm text-muted-foreground">
                                Download a copy of your data in JSON format.
                            </p>
                        </div>

                        <Button size="sm" variant="outline" className="cursor-pointer" disabled={exporting} onClick={handleExportData}>
                            <DownloadIcon className='h-4 w-4' />
                            {exporting ? 'Exporting ...' : 'Export Data'}
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
                                    <Trash2Icon className="h-4 w-4" />
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

                            <Input placeholder={`Type ${userData.username}`} value={inputValue} onChange={(e) => setInputValue(e.target.value)} />

                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="outline" className="cursor-pointer" size="sm">
                                        Cancel
                                    </Button>
                                </DialogClose>


                                <Button className="cursor-pointer" size="sm" variant="destructive" onClick={handleDeleteClick}>
                                    {loading ? "Deleting..." : "Delete"}
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