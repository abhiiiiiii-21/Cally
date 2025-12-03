"use client";

import { useMemo } from "react";
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import meetings from "@/data/meetings";
import Link from "next/link";

export default function MeetingsTable({ status }) {
  // Filter based on status
  const filteredData = useMemo(() => {
    return meetings.filter((m) => m.status === status);
  }, [status]);

  return (
    <div className="rounded-md border overflow-hidden w-full mx-auto mt-8">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Slot Booked</TableHead>
            <TableHead>Google Meet Link</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filteredData.length ? (
            filteredData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.slotBooked}</TableCell>
                <TableCell>
                  {row.meetingUrl ? (
                    <Link
                      href={row.meetingUrl}
                      target="_blank"
                      className="text-blue-500 underline"
                    >
                      Join Meet
                    </Link>
                  ) : (
                    "No Link Provided"
                  )}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-6">
                No meetings found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
