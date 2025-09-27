import { useState } from "react";
import {
  IconBuilding,
  IconDownload,
  IconEdit,
  IconFilter,
  IconPlus,
  IconSearch,
  IconTrash,
  IconX,
} from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AddWingDialog } from "./AddWingDialog";
import { RowActionsMenu } from "./ActionMenu";
import { useGetWings, type Wing } from "@/hooks/wings/useGetWings";
import { PageSize } from "@/enums/pagination/pagination";

interface WingsTableProps {
  onExportClick?: () => void;
  onAddClick?: () => void;
}

export function WingsTable({ onExportClick, onAddClick }: WingsTableProps) {
  const [page, setPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const perPage = PageSize.TEN;
  const { data } = useGetWings(page, perPage);

  // Map real data to mock structure; extend with placeholders for missing fields
  const wings = data?.items.map((wing) => ({
    id: wing.wing_id,
    wingName: wing.wing_name || "",
    totalFloors: 0, // Placeholder for floors (not in API response yet)
    totalApartments: wing.total_apartments || 0,
    occupiedApartments: 0, // Placeholder; fetch or calculate later
    vacantApartments: 0, // Placeholder
    status: "Active", // Placeholder
    constructionYear: "2024", // Placeholder
    description: "", // Placeholder
  })) || [];

  const handleAddClick = () => {
    if (onAddClick) {
      onAddClick();
    } else {
      setIsDialogOpen(true);
    }
  };

  const handleExport = () => {
    if (onExportClick) {
      onExportClick();
    } else {
      console.log("Exporting wings data...");
    }
  };

  const filteredWings = wings.filter((wing) => {
    const matchesSearch =
      wing.wingName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      wing.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      wing.status.toLowerCase().replace(" ", "-") === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      {/* Search and Actions Bar */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <IconSearch className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search wing by name or description"
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" size="sm" style={{ cursor: "pointer" }}>
          <IconFilter className="mr-2 h-4 w-4" style={{ color: "#1a5fd8" }} />
          FILTERS
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleExport}
          style={{ cursor: "pointer" }}
        >
          <IconDownload className="mr-2 h-4 w-4" style={{ color: "#1a5fd8" }} />
          Export
        </Button>
        <Button
          size="sm"
          onClick={handleAddClick}
          style={{
            backgroundColor: "#ffb400",
            color: "#1a5fd8",
            border: "none",
            cursor: "pointer",
          }}
        >
          <IconPlus className="mr-2 h-4 w-4" />
          Add
        </Button>
      </div>

      {/* Filters Bar */}
      <div className="flex items-center gap-4">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Filter by Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="under-construction">
              Under Construction
            </SelectItem>
          </SelectContent>
        </Select>
        {statusFilter !== "all" && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setStatusFilter("all")}
            style={{
              backgroundColor: "#ffb400",
              color: "#1a5fd8",
              border: "none",
              cursor: "pointer",
            }}
          >
            <IconX className="mr-2 h-4 w-4" />
            CLEAR
          </Button>
        )}
        <Button variant="outline" size="sm" style={{ cursor: "pointer" }}>
          HIDE
        </Button>
      </div>

      {/* Wings Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto w-full">
            <Table className="min-w-[700px]">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <input type="checkbox" className="rounded" />
                  </TableHead>
                  <TableHead>TOWER NAME</TableHead>
                  <TableHead>FLOORS</TableHead>
                  <TableHead>APARTMENTS</TableHead>
                  <TableHead>OCCUPANCY</TableHead>
                  <TableHead>STATUS</TableHead>
                  <TableHead>BUILT YEAR</TableHead>
                  <TableHead>ACTION</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredWings.map((wing) => (
                  <TableRow key={wing.id}>
                    <TableCell>
                      <input type="checkbox" className="rounded" />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-100">
                          <IconBuilding
                            className="h-5 w-5"
                            style={{ color: "#1a5fd8" }}
                          />
                        </div>
                        <div>
                          <div className="font-medium">{wing.wingName}</div>
                          <div className="text-sm text-muted-foreground">
                            {wing.description}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{wing.totalFloors}</TableCell>
                    <TableCell>{wing.totalApartments}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div
                          style={{ color: "#1a5fd8" }}
                          className="font-medium"
                        >
                          {wing.occupiedApartments} Occupied
                        </div>
                        <div style={{ color: "#ffb400" }}>
                          {wing.vacantApartments} Vacant
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        style={{
                          backgroundColor:
                            wing.status === "Active" ? "#1a5fd8" : "#ffb400",
                          color: wing.status === "Active" ? "#fff" : "#1a5fd8",
                        }}
                      >
                        {wing.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{wing.constructionYear}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          style={{
                            backgroundColor: "#1a5fd8",
                            color: "#fff",
                            border: "none",
                            cursor: "pointer",
                          }}
                          onClick={() => console.log("Update wing:", wing.id)}
                        >
                          <IconEdit className="mr-2 h-4 w-4" />
                          UPDATE
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          style={{
                            backgroundColor: "#ffb400",
                            color: "#1a5fd8",
                            border: "none",
                            cursor: "pointer",
                          }}
                          onClick={() => console.log("Delete wing:", wing.id)}
                        >
                          <IconTrash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing 1 to {filteredWings.length} of {wings.length} results
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            style={{ cursor: page === 1 ? "not-allowed" : "pointer" }}
          >
            <
          </Button>
          <Button
            variant="default"
            size="sm"
            style={{
              backgroundColor: "#1a5fd8",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            {page}
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={page * perPage >= (data?.total || 0)}
            onClick={() => setPage((p) => p + 1)}
            style={{
              cursor: page * perPage >= (data?.total || 0) ? "not-allowed" : "pointer",
            }}
          >
            >
          </Button>
        </div>
      </div>

      <AddWingDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </div>
  );
}