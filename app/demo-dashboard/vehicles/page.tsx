"use client";

import { useState, useEffect, JSX } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Filter,
  MoreHorizontal,
  List,
  Calendar,
  ImageIcon,
  ChevronDown,
  Search,
  Plus,
  Car,
  RefreshCw,
  AlertTriangle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";
import { DemoBadge } from "@/components/demo-dashboard/demo-badge";
import { mockVehicles } from "@/components/demo-dashboard/mock-data";

// Define a Vehicle interface
interface Vehicle {
  id: number;
  licensePlate: string;
  brand: string;
  model: string;
  status: string;
  lastMileage: number;
  image: string;
  rentals: string[];
}

// Type for grouped vehicles
type GroupedVehicles = Record<string, Vehicle[]>;

export default function VehiclesPage() {
  const router = useRouter();
  const [vehicles, setVehicles] = useState<Vehicle[]>(mockVehicles);
  const [searchTerm, setSearchTerm] = useState<string>("");
  // groupBy is a key of Vehicle; default is "brand"
  const [groupBy, setGroupBy] = useState<keyof Vehicle>("brand");
  // viewMode can be "table", "timeline", or "gallery"
  const [viewMode, setViewMode] = useState<"table" | "timeline" | "gallery">("table");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Group vehicles by the selected property (explicitly typed)
  const groupedVehicles: GroupedVehicles = vehicles.reduce((acc: GroupedVehicles, vehicle: Vehicle) => {
    // We ensure the key is a string
    const key = String(vehicle[groupBy]);
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(vehicle);
    return acc;
  }, {});

  // Filter groups based on search term
  const filteredGroups = Object.entries(groupedVehicles).filter(([group, vehicles]) => {
    return vehicles.some(
      (vehicle: Vehicle) =>
        vehicle.licensePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.model.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Functions to get styling classes
  const getStatusColor = (status: string): string => {
    switch (status) {
      case "Active":
        return "bg-emerald-100 text-emerald-800 border border-emerald-200";
      case "Repair":
        return "bg-amber-100 text-amber-800 border border-amber-200";
      case "Inactive":
        return "bg-slate-100 text-slate-800 border border-slate-200";
      default:
        return "bg-indigo-100 text-indigo-800 border border-indigo-200";
    }
  };

  const getStatusIcon = (status: string): JSX.Element | null => {
    switch (status) {
      case "Active":
        return <Car className="h-3 w-3 mr-1" />;
      case "Repair":
        return <RefreshCw className="h-3 w-3 mr-1" />;
      case "Inactive":
        return <AlertTriangle className="h-3 w-3 mr-1" />;
      default:
        return null;
    }
  };

  const getBrandColor = (brand: string): string => {
    switch (brand) {
      case "BMW":
        return "bg-blue-100 text-blue-800 border border-blue-200";
      case "Audi":
        return "bg-indigo-100 text-indigo-800 border border-indigo-200";
      case "Mercedes":
        return "bg-slate-100 text-slate-800 border border-slate-200";
      case "Toyota":
        return "bg-rose-100 text-rose-800 border border-rose-200";
      default:
        return "bg-teal-100 text-teal-800 border border-teal-200";
    }
  };

  // Toolbar button classes override for white backgrounds:
  const toolbarButtonClasses =
    "border border-gray-300 text-gray-900 bg-white hover:bg-gray-200";

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-120px)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 dark:bg-gray-800 min-h-screen p-6">
      {/* Toolbar */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Car className="h-6 w-6 mr-2 text-indigo-600" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Vehicles</h1>
        </div>
        <div className="flex gap-2">
          <Button
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
            onClick={() => router.push("/demo-dashboard/vehicles/add")}
          >
            <Plus className="mr-2 h-4 w-4" /> Add Vehicle
          </Button>
          <DemoBadge />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-700 p-5 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" size="sm" className={toolbarButtonClasses}>
              View all brands
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" className={toolbarButtonClasses}>
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm" className={toolbarButtonClasses}>
              <ChevronDown className="mr-2 h-4 w-4" />
              Sort
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className={toolbarButtonClasses}>
                  Grouped by: {groupBy}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setGroupBy("brand")}>Brand</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setGroupBy("status")}>Status</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setGroupBy("model")}>Model</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" size="sm" className={toolbarButtonClasses}>
              <ChevronDown className="mr-2 h-4 w-4" />
              Hide columns
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search vehicles..."
                className="pl-8 h-9 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Tabs defaultValue="table" onValueChange={(value: string) => setViewMode(value as "table" | "timeline" | "gallery")} className="border rounded-md">
              <TabsList className="h-9 bg-gray-100 dark:bg-gray-600">
                <TabsTrigger value="table" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">
                  <List className="h-4 w-4" />
                </TabsTrigger>
                <TabsTrigger value="timeline" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">
                  <Calendar className="h-4 w-4" />
                </TabsTrigger>
                <TabsTrigger value="gallery" className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-700">
                  <ImageIcon className="h-4 w-4" />
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Vehicle Data */}
      <div className="bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600">
        {viewMode === "table" && (
          <div>
            {filteredGroups.map(([group, vehicles]) => (
              <div key={group} className="mb-4">
                <div className="bg-gray-100 dark:bg-gray-600 p-3 flex justify-between items-center border-b border-gray-200 dark:border-gray-500">
                  <div className="flex items-center gap-2">
                    <Badge className={getBrandColor(group)}>
                      {group}
                    </Badge>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Count: <span className="font-bold">{vehicles.length}</span>
                    </span>
                  </div>
                  <div className="text-sm text-gray-700 dark:text-gray-300">
                    Total Mileage:{" "}
                    <span className="font-semibold">
                      {vehicles.reduce((sum: number, vehicle: Vehicle) => sum + vehicle.lastMileage, 0).toLocaleString()}
                    </span>
                  </div>
                </div>
                <Table>
                  <TableHeader className="bg-gray-100 dark:bg-gray-600">
                    <TableRow className="border-b border-gray-200 dark:border-gray-500">
                      <TableHead className="w-12 text-gray-700 dark:text-gray-300">#</TableHead>
                      <TableHead className="text-gray-700 dark:text-gray-300">License Plate</TableHead>
                      <TableHead className="text-gray-700 dark:text-gray-300">Brand</TableHead>
                      <TableHead className="text-gray-700 dark:text-gray-300">Pictures</TableHead>
                      <TableHead className="text-gray-700 dark:text-gray-300">Model</TableHead>
                      <TableHead className="text-gray-700 dark:text-gray-300">Rentals</TableHead>
                      <TableHead className="text-gray-700 dark:text-gray-300">Status</TableHead>
                      <TableHead className="text-gray-700 dark:text-gray-300">Last Mileage</TableHead>
                      <TableHead className="w-10"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {vehicles.map((vehicle: Vehicle, index: number) => (
                      <TableRow key={vehicle.id} className="hover:bg-gray-100 dark:hover:bg-gray-600 border-b border-gray-100 dark:border-gray-500">
                        <TableCell className="text-gray-500 dark:text-gray-400 font-medium">{index + 1}</TableCell>
                        <TableCell className="font-medium text-gray-900 dark:text-gray-100">{vehicle.licensePlate}</TableCell>
                        <TableCell>
                          <Badge className={getBrandColor(vehicle.brand)}>
                            {vehicle.brand}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="relative h-14 w-20 rounded-md overflow-hidden border border-gray-200 dark:border-gray-500 shadow-sm">
                            <Image
                              src={vehicle.image || "/placeholder.svg"}
                              alt={vehicle.model}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-700 dark:text-gray-200 font-medium">{vehicle.model}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {vehicle.rentals.map((rental: string) => (
                              <Badge key={rental} variant="outline" className="bg-indigo-50 border-indigo-200 text-indigo-700 text-xs">
                                {rental}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={`flex items-center ${getStatusColor(vehicle.status)}`}>
                            {getStatusIcon(vehicle.status)}
                            {vehicle.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-700 dark:text-gray-200 font-medium">
                          {vehicle.lastMileage.toLocaleString()} km
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => toast({ title: "View details" })}>
                                View details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => toast({ title: "Edit vehicle" })}>
                                Edit vehicle
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => toast({ title: "Schedule maintenance" })}>
                                Schedule maintenance
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ))}
          </div>
        )}

        {viewMode === "gallery" && (
          <div className="p-6">
            {Object.entries(groupedVehicles).map(([group, vehicles]) => (
              <div key={group} className="mb-8">
                <div className="flex items-center mb-4">
                  <Badge className={`mr-2 ${getBrandColor(group)}`}>{group}</Badge>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                    Vehicles ({vehicles.length})
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {vehicles.map((vehicle: Vehicle) => (
                    <div
                      key={vehicle.id}
                      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
                    >
                      <div className="relative h-48 w-full">
                        <Image
                          src={vehicle.image || "/placeholder.svg"}
                          alt={vehicle.model}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-3 right-3">
                          <Badge className={getStatusColor(vehicle.status)}>
                            {getStatusIcon(vehicle.status)}
                            {vehicle.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-semibold text-gray-900 dark:text-gray-100">{vehicle.licensePlate}</h4>
                          <Badge className={getBrandColor(vehicle.brand)}>{vehicle.brand}</Badge>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 font-medium">{vehicle.model}</p>
                        <div className="flex justify-between items-center mt-3">
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            <span className="font-medium">Mileage:</span> {vehicle.lastMileage.toLocaleString()} km
                          </p>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 rounded-full p-0"
                            onClick={() => toast({ title: "View details" })}
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {viewMode === "timeline" && (
          <div className="p-8">
            <div className="text-center py-12 bg-slate-50 dark:bg-gray-700 rounded-lg border border-dashed border-gray-300">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">Timeline view is available in the full version</h3>
              <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-md mx-auto">
                This view shows vehicle activities, maintenance history, and rental periods on an interactive timeline.
              </p>
              <Button variant="outline" className="mt-4 text-indigo-600 border-indigo-300 hover:bg-indigo-50">
                Upgrade to access
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center p-3 text-sm text-gray-600 dark:text-gray-300 mt-4 bg-white dark:bg-gray-800 rounded-md shadow-sm border border-gray-200 dark:border-gray-700">
        <div>Total vehicles: <span className="font-semibold">{vehicles.length}</span></div>
        <div>
          Total mileage:{" "}
          <span className="font-semibold">
            {vehicles.reduce((sum: number, vehicle: Vehicle) => sum + vehicle.lastMileage, 0).toLocaleString()} km
          </span>
        </div>
      </div>
    </div>
  );
}
