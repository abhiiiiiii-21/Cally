"use client";
import { CircleAlertIcon, Key, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toastManager } from "@/components/ui/toast";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import FullUserData from "@/data/FullUserData";

export default function ProfileTabs() {
    const user = FullUserData[0];

    const [name, setName] = useState(user.name);
    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [about, setAbout] = useState(user.about || "");

    const [inputValue, setInputValue] = useState("");

    function SaveToast() {
        toastManager.add({
            title: "Profile updated successfully!",
            type: "success",
        });
    }

    return (
        <Tabs defaultValue="personal" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-6">
                <Card className="bg-black">
                    <CardHeader>
                        <CardTitle>Personal Information</CardTitle>
                        <CardDescription>Update your personal details and profile information.</CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="fullName">Full Name</Label>
                                <Input
                                    id="fullName"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="username">Username</Label>
                                <div className="relative">
                                    <Input
                                        className="peer ps-36"
                                        id="username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                    <span className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3 text-muted-foreground text-sm">
                                        getcally.vercel.com/
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* About */}
                        <div className="space-y-2">
                            <Label htmlFor="about">About</Label>
                            <Textarea
                                id="about"
                                rows={4}
                                value={about}
                                onChange={(e) => setAbout(e.target.value)}
                                placeholder="Tell us about yourself..."
                            />
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end">
                    <Button size="sm" className="cursor-pointer" onClick={SaveToast}>
                        Save Changes
                    </Button>
                </div>
            </TabsContent>

            {/* ACCOUNT TAB */}
            <TabsContent value="account" className="space-y-6">
                <Card className="bg-black">
                    <CardHeader>
                        <CardTitle>Account Settings</CardTitle>
                        <CardDescription>Manage your account preferences.</CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <Label className="text-base">Account Status</Label>
                                <p className="text-muted-foreground text-sm">Your account is currently active</p>
                            </div>
                            <Badge className="gap-1.5" variant="outline">
                                <span className="size-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
                                Active
                            </Badge>
                        </div>

                        <Separator />

                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <Label className="text-base">Data Export</Label>
                                <p className="text-muted-foreground text-sm">
                                    Download a copy of your data
                                </p>
                            </div>
                            <Button variant="outline" size="sm" className="cursor-pointer">Export Data</Button>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-destructive/50 bg-black">
                    <CardHeader>
                        <CardTitle className="text-destructive">Danger Zone</CardTitle>
                        <CardDescription>Irreversible and destructive actions</CardDescription>
                    </CardHeader>

                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <Label className="text-base">Delete Account</Label>
                                <p className="text-muted-foreground text-sm">
                                    Permanently delete your account and all data
                                </p>
                            </div>

                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="destructive" size="sm" className="cursor-pointer font-urbanist">
                                        <Trash2 className="h-4 w-4" />
                                        Delete Account
                                    </Button>
                                </DialogTrigger>

                                <DialogContent className="font-urbanist">
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="flex size-9 items-center justify-center rounded-full border">
                                            <CircleAlertIcon size={16} className="text-destructive opacity-80" />
                                        </div>

                                        <DialogHeader>
                                            <DialogTitle className="sm:text-center text-destructive">
                                                Delete confirmation
                                            </DialogTitle>
                                            <DialogDescription className="sm:text-center">
                                                This action cannot be undone. To confirm, please enter your username.
                                            </DialogDescription>
                                        </DialogHeader>
                                    </div>

                                    <form className="space-y-5">
                                        <div className="space-y-2">
                                            <Label htmlFor="deleteUserInput">Username</Label>
                                            <Input
                                                id="deleteUserInput"
                                                value={inputValue}
                                                onChange={(e) => setInputValue(e.target.value)}
                                                placeholder={`Type ${user.username} to confirm`}
                                            />
                                        </div>

                                        <DialogFooter>
                                            <DialogClose asChild>
                                                <Button variant="outline" type="button" className="flex-1 cursor-pointer">
                                                    Cancel
                                                </Button>
                                            </DialogClose>

                                            <Button
                                                className="flex-1 cursor-pointer"
                                                type="button"
                                                disabled={inputValue.trim().toLowerCase() !== user.username.toLowerCase()}
                                            >
                                                Delete
                                            </Button>
                                        </DialogFooter>
                                    </form>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>

            {/* SECURITY TAB */}
            <TabsContent value="security" className="space-y-6">
                <Card className="bg-black">
                    <CardHeader>
                        <CardTitle>Security Settings</CardTitle>
                        <CardDescription>Manage your account security.</CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <Label className="text-base">Password</Label>
                                <p className="text-muted-foreground text-sm">Last changed 3 months ago</p>
                            </div>

                            <Button variant="outline" size="sm" className="cursor-pointer">
                                <Key className="h-4 w-4" />
                                Change Password
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    );
}
