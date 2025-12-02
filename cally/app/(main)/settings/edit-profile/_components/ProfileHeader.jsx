"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Mail } from "lucide-react";
import FullUserData from '@/data/FullUserData';

function formatJoined(dateString) {

  const date = new Date(dateString);

  return date.toLocaleString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export default function ProfileHeader() {
  const profile = FullUserData;

  return (
    <Card className="bg-black">
      <CardContent>
        {profile.map((i) => (
          <div key={i.userID} className="flex flex-col items-start gap-6 md:flex-row md:items-center">
            
            <Avatar className="h-24 w-24">
              <AvatarImage src={i.profilePic || "/Profile/avatar1.png"} alt="Profile" />
            </Avatar>

            <div className="flex-1 space-y-2">
              <h1 className="text-2xl font-bold">{i.name}</h1>

              <div className="text-muted-foreground flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Mail className="size-4" />
                  {i.email}
                </div>

                <div className="flex items-center gap-1">
                  <Calendar className="size-4" />
                  Joined {formatJoined(i.createdAt)}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Button size="sm" variant="outline" className="cursor-pointer">Change Avatar</Button>
              <Button size="sm" variant="outline" className="cursor-pointer">Remove Avatar</Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
