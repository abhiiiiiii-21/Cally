"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Mail } from "lucide-react";
import { useFileUpload } from "@/hooks/use-file-upload";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toastManager } from "@/components/ui/toast";

export default function ProfileHeader({initialData}) {
  const router = useRouter()

  const [user, setUser] = useState({
    username: initialData?.username || "",
    email: initialData?.email || "",
    profilePic: initialData?.profilePic || ""
  });

  const [uploading, setUploading] = useState(false)

  const [{ files }, { removeFile, openFileDialog, getInputProps }] = useFileUpload({ accept: "image/*" });

  const previewUrl = files[0]?.preview || null;
  const fileName = files[0]?.file.name || null;

  const handleUploadProfilePic = async () => {
    if (!files[0]) {
      toastManager.add({
        description: 'Please select an image first!',
        title: 'Error',
        type: 'error'
      })
      return
    }

    try {
      setUploading(true)
      const token = localStorage.getItem('token')

      if (!token) {
        router.push('/auth/log-in')
        return
      }

      const formData = new FormData()
      formData.append('profilePic', files[0].file)

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/upload-profile-pic`, {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: formData
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || data.error || "Failed to upload profile picture");
      }

      setUser({ ...user, profilePic: data.profilePic })

      removeFile(files[0]?.id)

      toastManager.add({
        description: 'Profile picture updated successfully!',
        title: 'Success',
        type: 'success'
      })

    } catch (error) {
      toastManager.add({
        description: error.message || 'Failed to update profile picture. Please try again!',
        title: 'Error',
        type: 'error'
      })
    } finally {
      setUploading(false)
    }
  }

  return (
    <Card className="bg-black text-white">
      <CardContent>
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">

          <div aria-label="User profile avatar"
            className="relative flex shrink-0 items-center justify-center overflow-hidden h-24 w-24">
            <Avatar className="h-24 w-24 size-full object-cover">
              <AvatarImage
                src={previewUrl || user.profilePic || '/Profile/avatar.png'}
                alt="Profile"
              />
            </Avatar>
          </div>
          <div className="flex-1 space-y-2">
            <h1 className="text-2xl font-bold">{user.username}</h1>

            <div className="text-muted-foreground flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Mail className="size-4" />
                {user.email}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Button aria-haspopup="dialog" onClick={openFileDialog} size="sm" variant="outline" className="cursor-pointer">
              {fileName ? "Change Avatar" : "Upload Avatar"}
            </Button>
            <input {...getInputProps()} aria-label="Upload image file" className="sr-only" tabIndex={-1} />

            {fileName && (
              <>
                <Button className="cursor-pointer" onClick={handleUploadProfilePic} size="sm" disabled={uploading}>
                  {uploading ? 'Uploading...' : 'Save Avatar'}
                </Button>
                <Button aria-label={`Cancel`} className="cursor-pointer" onClick={() => removeFile(files[0]?.id)}
                  size="sm" variant="outline" disabled={uploading}>
                  Cancel
                </Button>
              </>
            )}

          </div>
        </div>

      </CardContent>
    </Card>
  );
}
