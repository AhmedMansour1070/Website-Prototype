"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Filter } from "lucide-react"

interface SearchFilterProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  placeholder?: string
  onFilterClick?: () => void
}

export function SearchFilter({
  searchTerm,
  onSearchChange,
  placeholder = "Search...",
  onFilterClick,
}: SearchFilterProps) {
  return (
    <div className="flex items-center space-x-2">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder={placeholder}
          className="pl-8"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <Button variant="outline" size="icon" onClick={onFilterClick}>
        <Filter className="h-4 w-4" />
        <span className="sr-only">Filter</span>
      </Button>
    </div>
  )
}

