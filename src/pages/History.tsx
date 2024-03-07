import React from "react";

import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

const data: File[] = [
  {
    date: "01/01/2022",
    filename: "A",
  },
  {
    date: "02/01/2022",
    filename: "B",
  },
  {
    date: "03/01/2022",
    filename: "C",
  },
  {
    date: "04/01/2022",
    filename: "D",
  },
  {
    date: "05/01/2022",
    filename: "E",
  },
];

export type File = {
  date: string;
  filename: string;
};

// eslint-disable-next-line react-refresh/only-export-components
export const columns: ColumnDef<File>[] = [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => <div className="capitalize">{row.getValue("date")}</div>,
  },
  {
    accessorKey: "filename",
    header: "File Name",
    cell: ({ row }) => <div className="">{row.getValue("filename")}</div>,
  },
  {
    id: "view",
    cell: () => (
      <Button className="lg:px-20 py-6 bg-[#D0D0FF] text-[#575757] hover:bg-[#8F6EFE] hover:text-white lg:text-xl">
        View
      </Button>
    ),
  },
  {
    id: "download",
    cell: () => {
      return (
        <Button className="lg:px-20 py-6 bg-[#D0D0FF] text-[#575757] hover:bg-[#8F6EFE] hover:text-white lg:text-xl">
          Download
        </Button>
      );
    },
  },
];

const History = () => {
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      columnVisibility,
    },
  });

  return (
    <div className="lg:w-[90%] w-full h-full lg:h-[90vh] m-auto bg-[#F5F4F8] lg:rounded-[100px] py-[20px]">
      <Navbar />
      <div className="rounded-md border w-[90%] m-auto mt-12">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="text-center lg:text-2xl font-medium"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-center lg:text-xl">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div> */}
    </div>
  );
};

export default History;
