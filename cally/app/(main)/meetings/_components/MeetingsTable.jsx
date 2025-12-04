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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { apiClient } from "@/lib/api";
import Link from "next/link";

export default function MeetingsTable({ status }) {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [filter, setFilter] = useState("all");
  const [meta, setMeta] = useState({ total: 0, page: 1, limit: 10, totalPages: 1 });

  useEffect(() => {
    const fetchMeetings = async () => {
      setLoading(true);
      try {
        const res = await apiClient.get(`/bookings?type=${status}&page=${page}&limit=${limit}&filter=${filter}`);
        setMeetings(res.data.data);
        setMeta(res.data.meta);
      } catch (error) {
        console.error("Failed to fetch meetings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMeetings();
  }, [status, page, limit, filter]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= meta.totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="w-full mx-auto mt-8 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold capitalize">{status} Meetings</h2>
        <div className="w-[200px]">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              {(() => {
                const options = [];
                const today = new Date();

                if (status === "upcoming") {
                  for (let i = 0; i < 6; i++) {
                    const d = new Date(today.getFullYear(), today.getMonth() + i, 1);
                    const value = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
                    const label = d.toLocaleString('default', { month: 'long', year: 'numeric' });
                    options.push(<SelectItem key={value} value={value}>{label}</SelectItem>);
                  }
                } else if (status === "past") {
                  for (let i = 0; i < 6; i++) {
                    const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
                    const value = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
                    const label = d.toLocaleString('default', { month: 'long', year: 'numeric' });
                    options.push(<SelectItem key={value} value={value}>{label}</SelectItem>);
                  }
                }
                return options;
              })()}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border overflow-hidden">
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
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6">
                  Loading...
                </TableCell>
              </TableRow>
            ) : meetings.length ? (
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

      {meta.totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(page - 1)}
                className={page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>

            <PaginationItem>
              <span className="px-4 text-sm text-muted-foreground">
                Page {page} of {meta.totalPages}
              </span>
            </PaginationItem>

            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageChange(page + 1)}
                className={page === meta.totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
