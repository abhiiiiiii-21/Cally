"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AnnouncementBadge() {
  return (
    <Link
      href="#link"
      className="group mx-auto flex w-fit items-center gap-4 rounded-full border border-zinc-800 bg-[#1a1a1a] p-1 pl-4 shadow-md shadow-zinc-950/5 transition-colors duration-300 hover:bg-background dark:border-t-white/5 dark:hover:border-t-border dark:shadow-zinc-950"
    >
      <span className="text-foreground text-sm">
        Introducing Support for AI Models
      </span>

      <span className="block h-4 w-0.5 border-l border-zinc-700 bg-white dark:bg-zinc-700"></span>

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
    </Link>
  );
}
