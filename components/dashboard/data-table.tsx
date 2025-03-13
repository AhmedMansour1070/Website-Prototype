"use client"

import React from "react"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Column {
  header: string
  accessorKey: string
  cell?: (info: any) => React.ReactNode
}

interface Action {
  label: string
  onClick: (row: any) => void
  isDanger?: boolean
  separator?: boolean
}

interface DataTableProps {
  columns: Column[]
  data: any[]
  actions?: Action[]
  isLoading?: boolean
  emptyMessage?: string
}

export function DataTable({ columns, data, actions, isLoading, emptyMessage = "No data found" }: DataTableProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-10">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((column, index) => (
            <TableHead key={index}>{column.header}</TableHead>
          ))}
          {actions && <TableHead className="text-right">Actions</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length === 0 ? (
          <TableRow>
            <TableCell colSpan={columns.length + (actions ? 1 : 0)} className="text-center py-10 text-muted-foreground">
              {emptyMessage}
            </TableCell>
          </TableRow>
        ) : (
          data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((column, colIndex) => (
                <TableCell key={colIndex}>{column.cell ? column.cell(row) : row[column.accessorKey]}</TableCell>
              ))}
              {actions && (
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      {actions.map((action, actionIndex) => (
                        <React.Fragment key={actionIndex}>
                          {action.separator && <DropdownMenuSeparator />}
                          <DropdownMenuItem
                            onClick={() => action.onClick(row)}
                            className={action.isDanger ? "text-red-600" : ""}
                          >
                            {action.label}
                          </DropdownMenuItem>
                        </React.Fragment>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              )}
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  )
}

