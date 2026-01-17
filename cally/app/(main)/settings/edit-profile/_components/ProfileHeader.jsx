"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Mail } from "lucide-react";
import { useFileUpload } from "@/hooks/use-file-upload";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProfileHeader() {
  const router = useRouter()
  const [user, setUser] = useState({username : "",email : "",profilePic : ""});
  const [loading, setLoading] = useState(true);

  const [{ files }, { removeFile, openFileDialog, getInputProps }] =
    useFileUpload({
      accept: "image/*",
    });

  const previewUrl = files[0]?.preview || null;
  const fileName = files[0]?.file.name || null;

  const userData = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token')

      if (!token) {
        router.push('/auth/log-in')
        return;
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

      setUser({username : data.username, email : data.email, profilePic : data.profilePic})

    } catch (error) {
       console.error("User fetch failed:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    userData()
  }, [])

  return (
    <Card className="bg-black text-white">
      <CardContent>
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">

          <div aria-label={previewUrl ? "Upload preview" : "Default user avatar"}
            className="relative flex shrink-0 items-center justify-center overflow-hidden h-24 w-24"
          >
            {previewUrl ? (
              <Avatar className="h-24 w-24 size-full object-cover">
                <AvatarImage src={previewUrl} alt="Profile" />
              </Avatar>

            ) : (
              <div aria-hidden="true">
                <Avatar className="h-24 w-24 size-full object-cover">
                  <AvatarImage src={'/Profile/avatar.png'} alt="Profile" />
                </Avatar>

              </div>
            )}
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
            <input
              {...getInputProps()}
              aria-label="Upload image file"
              className="sr-only"
              tabIndex={-1}
            />

            {fileName && (
              <Button aria-label={`Remove ${fileName}`} className="cursor-pointer" onClick={() => removeFile(files[0]?.id)} size="sm" variant="outline">
                Remove Avatar
              </Button>
            )}

          </div>
        </div>

      </CardContent>
    </Card>
  );
}
