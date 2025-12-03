"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import { apiClient } from "@/lib/api";
import Link from "next/link";

export default function MeetingsTable({ status }) {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMeetings = async () => {
      setLoading(true);
      try {
        const res = await apiClient.get(`/bookings?type=${status}`);
        setMeetings(res.data);
      } catch (error) {
        console.error("Failed to fetch meetings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMeetings();
  }, [status]);

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

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
          {meetings.length ? (
            meetings.map((row) => (
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
