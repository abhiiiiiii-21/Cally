import { RoadmapCard } from '@/components/ui/roadmap-card'
import React from 'react'


// status done,in-progress,upcoming
const TimelineCard = () => {
    return (
        <section>
            <RoadmapCard
                items={[
                    {
                        startTime: "2026-01-12T14:00:00+05:30",
                        endTime: "2026-01-12T14:30:00+05:30",
                        eventTitle: "Core Platform",
                        description: "Basic functionality and user management",
                    },
                    {
                        startTime: "2026-01-12T15:00:00+05:30",
                        endTime: "2026-01-12T15:30:00+05:30",
                        eventTitle: "Analytics",
                        description: "Reporting and data visualization",
                    },
                    {
                        startTime: "2026-01-12T16:00:00+05:30",
                        endTime: "2026-01-12T16:30:00+05:30",
                        eventTitle: "Integrations",
                        description: "Third-party app connections",
                    },
                    {
                        startTime: "2026-01-12T17:00:00+05:30",
                        endTime: "2026-01-12T17:30:00+05:30",
                        eventTitle: "AI Features",
                        description: "Smart automation and predictions",
                    }

                ]} />
        </section>
    )
}

export default TimelineCard