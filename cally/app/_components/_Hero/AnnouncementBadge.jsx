"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

export default function AnnouncementBadge() {
  return (
    <section
      className="group mx-auto flex w-fit items-center gap-2 rounded-full border border-zinc-800 bg-[#1a1a1a] p-1 pl-4 transition-colors duration-300 hover:bg-background dark:border-t-white/5 dark:hover:border-t-border dark:shadow-zinc-950 font-urbanist"
    >
      <span className="text-foreground text-sm">
        Stop emailing. Start scheduling.
      </span>
      <div className="bg-background group-hover:bg-muted size-6 overflow-hidden rounded-full duration-500">
        <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
          <span className="flex size-6">
            <ArrowRight className="m-auto size-3" />
          </span>
          <span className="flex size-6">
            <ArrowRight className="m-auto size-3" />
          </span>
        </div>
      </div>
    </section>
  );
}
