"use client";;
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function RoadmapCard({ title = "Timeline", description = "A real-time view of what's scheduled for today.", items }

) {

  const now = new Date()
  const statusVariantMap = {
    "in-progress": "default",
    "done": "outline",
    "upcoming": "outline",
  };

  // const status = getMeetingStatus(items.startTime,items.endTime)
  // const startingTime = items.startTime.split()
  return (
    <Card className="w-full shadow-xl hover:bg-accent/10 transition-colors duration-300 bg-background border border-border rounded-xl">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription className="text-sm text-neutral-500">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <div className="absolute left-0 right-0 top-4 h-px bg-border" />

          <div className="flex justify-between">
            {items.map((item, index) => (
              <motion.div
                key={index}
                className="relative pt-8 text-center w-1/4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.15 }}>

                {/* Timeline Dot */}
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className={`absolute left-1/2 top-2 -translate-x-1/2 h-4 w-4 rounded-full flex items-center justify-center ${status === "done" || status === "in-progress"
                    ? "bg-primary"
                    : "bg-muted"
                    }`}>
                  <div className="h-1.5 w-1.5 rounded-full bg-background" />
                </motion.div>

                {/* Quarter */}
                <Badge variant={statusVariantMap[status] ?? "outline"}
                  className="mb-1 text-[11px]">
                  {item.startTime} - {item.endTime}
                </Badge>

                {/* Title + Description */}
                <h4 className={`text-sm font-medium ${status === "done" ? "text-neutral-500 line-through" : "text-foreground"}`}>
                  {item.eventTitle}
                </h4>
                <p className={`text-xs mt-1 ${status === "done" ? "text-muted-foreground line-through" : "text-muted-foreground"}`}>
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// function getMeetingStatus(startTime,endTime, now){

//   const [startH, startM] = startTime.split(":").map(Number)
//   const [endH, endM] = endTime.split(":").map(Number)

//   const start = new Date(now);
//   start.setHours(startH,startM,0,0)

//   const end = new Date(now);
//   end.setHours(endH,endM,0,0)

//   if (now > end) {
//     return "done"
//   }

//   if (now >= start && now <= end){
//     return "in-progress"
//   }

//   return "upcoming"
// }