import { RoadmapCard } from '@/components/ui/roadmap-card'
import React from 'react'

const TimelineCard = () => {
    return (
        <section>
            <RoadmapCard
                items={[
                    {
                        quarter: "Q1 2023",
                        title: "Core Platform",
                        description: "Basic functionality and user management",
                        status: "done",
                    },
                    {
                        quarter: "Q2 2023",
                        title: "Analytics",
                        description: "Reporting and data visualization",
                        status: "in-progress",
                    },
                    {
                        quarter: "Q3 2023",
                        title: "Integrations",
                        description: "Third-party app connections",
                        status: "upcoming",
                    },
                    {
                        quarter: "Q4 2023",
                        title: "AI Features",
                        description: "Smart automation and predictions",
                        status: "upcoming",
                    },
                ]}/>
        </section>
    )
}

export default TimelineCard