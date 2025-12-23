"use client";
import { CircleAlertIcon, EyeIcon, EyeOffIcon, Key, Trash2 } from "lucide-react";
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
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";


const MOCK_USER = {
    name: "John Doe",
    username: "johndoe",
    email: "john@example.com",
    about: "I am a software engineer.",
};

export default function ProfileTabs() {
    const [inputValue, setInputValue] = useState("");
    const [loading, setLoading] = useState(true);

    const [userData, setUserData] = useState({
        name: "",
        username: "",
        email: "",
        about: ""
    });
    const [originalData, setOriginalData] = useState({});

    useEffect(() => {
        const fetchUser = async () => {
            try {
                // Simulate API delay
                await new Promise(resolve => setTimeout(resolve, 500));
                setUserData(MOCK_USER);
                setOriginalData(MOCK_USER);
            } catch (error) {
                console.error("Failed to fetch user:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    const isChanged = JSON.stringify(userData) !== JSON.stringify(originalData);

    async function handleSaveChanges() {
        try {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 500));
            // Mock update
            setOriginalData(userData);
            toastManager.add({
                title: "Profile updated successfully!",
                type: "success",
            });
        } catch (error) {
            console.error("Failed to update profile:", error);
            toastManager.add({
                title: "Failed to update profile",
                type: "error",
            });
        }
    }

    function ChangePasswordToast() {
        toastManager.add({
            title: "Password updated successfully!",
            type: "success",
        });
    }

    const router = useRouter();

    async function handleDeleteAccount() {
        try {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 500));
            toastManager.add({
                title: "Account deleted successfully",
                type: "success",
            });
            router.push("/auth/log-in");
        } catch (error) {
            console.error("Failed to delete account:", error);
            toastManager.add({
                title: "Failed to delete account",
                type: "error",
            });
        }
    }

    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible((prevState) => !prevState);

    if (loading) return <div>Loading...</div>;

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
                                    value={userData.name || ""}
                                    onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="username">Username</Label>
                                <div className="relative">
                                    <Input
                                        className="peer ps-36"
                                        id="username"
                                        value={userData.username || ""}
                                        onChange={(e) => setUserData({ ...userData, username: e.target.value })}
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
                                    value={userData.email || ""}
                                    disabled
                                    className="bg-muted"
                                />
                            </div>
                        </div>

                        {/* About */}
                        <div className="space-y-2">
                            <Label htmlFor="about">About</Label>
                            <Textarea
                                id="about"
                                rows={4}
                                value={userData.about || ""}
                                onChange={(e) => setUserData({ ...userData, about: e.target.value })}
                                placeholder="Tell us about yourself..."
                            />
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end">
                    <Button
                        size="sm"
                        disabled={!isChanged}
                        onClick={handleSaveChanges}
                    >
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
                                                placeholder={`Type ${userData.username} to confirm`}
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
                                                disabled={inputValue.trim().toLowerCase() !== userData.username?.toLowerCase()}
                                                onClick={handleDeleteAccount}
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



                            <Dialog>
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
                                            <DialogTitle className="sm:text-center">Change Password</DialogTitle>
                                            <DialogDescription className="sm:text-center">
                                                Enter your current and new password.
                                            </DialogDescription>
                                        </DialogHeader>
                                    </div>

                                    <form className="space-y-5">
                                        <div className="space-y-4">
                                            <div className="flex flex-col gap-2">
                                                <Label htmlFor="currentPassword">Current Password</Label>
                                                <div className="relative">

                                                    <Input className="pe-9" id="currentPassword" placeholder="Enter current password"
                                                        type={isVisible ? "text" : "password"} />
                                                    <button aria-controls="password"
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

                                            <div className="flex flex-col gap-2">
                                                <Label htmlFor="newPassword">New Password</Label>
                                                <div className="relative">

                                                    <Input className="pe-9" id="newPassword" placeholder="Enter new password"
                                                        type={isVisible ? "text" : "password"}
                                                    />
                                                    <button aria-controls="password"
                                                        aria-label={isVisible ? "Hide password" : "Show password"}
                                                        aria-pressed={isVisible}
                                                        className="cursor-pointer absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md text-muted-foreground/80 outline-none transition-[color,box-shadow] hover:text-foreground focus:z-10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                                                        onClick={toggleVisibility}
                                                        type="button"
                                                    >
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
                                            <Button className="cursor-pointer" type="submit" size="sm" onClick={ChangePasswordToast}>
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
