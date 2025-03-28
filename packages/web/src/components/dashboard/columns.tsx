"use client";

import { ColumnDef } from "@tanstack/react-table";
import IconPlaceholder from "../shared/IconPlaceholder";
import { DataTableColumnHeader } from "../ui/data-table-column-header";

export const tokenColumns: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Token" />
    ),
    cell: ({ row }) => (
      <div className="w-max text-primary-text truncate flex gap-1 items-center text-lg">
        <IconPlaceholder className="h-7 w-7" />
        {row.getValue("name")}
        <span className="text-grayish"> {row.original.env}</span>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2 text-lg">
          <span className="max-w-[500px] truncate">
            ${row.getValue("price")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "hourChange",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="1 Hour" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="block max-w-[500px] text-tealish border border-tealish rounded-full px-2.5">
            {row.getValue("hourChange")}%
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "dayChange",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="24 Hours" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px]  text-destructive border border-destructive rounded-full px-2.5">
            {row.getValue("dayChange")}%
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "balance",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Balance" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex flex-col text-lg">
          <span className="max-w-[500px] truncate">
            ${row.getValue("balance")}
          </span>
          <span className="text-xs">$0</span>
        </div>
      );
    },
  },
];

export const tradeTokenColums: ColumnDef<any>[] = [
  {
    accessorKey: "s/n",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="S/N" />
    ),
    cell: ({ row }) => (
      <div className="w-min text-primary-text truncate flex gap-1 items-center text-lg">
        #{row.index + 1}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Token" />
    ),
    cell: ({ row }) => (
      <div className="w-max text-primary-text truncate flex gap-1 items-center text-lg">
        <IconPlaceholder className="h-7 w-7" />
        {row.getValue("name")}
        <span className="text-grayish"> {row.original.env}</span>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2 text-lg">
          <span className="max-w-[500px] truncate">
            ${row.getValue("price")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "hourChange",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="1 Hour" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="block max-w-[500px] text-tealish border border-tealish rounded-full px-2.5">
            {row.getValue("hourChange")}%
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "dayChange",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="24 Hours" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px]  text-destructive border border-destructive rounded-full px-2.5">
            {row.getValue("dayChange")}%
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "volume",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Volume" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex flex-col text-lg">
          <span className="max-w-[500px] truncate">
            ${row.getValue("volume")} M
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "mcap",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="M/Cap" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex flex-col text-lg">
          <span className="max-w-[500px] truncate">
            ${row.getValue("mcap")} M
          </span>
        </div>
      );
    },
  },
];
