import { cva } from "class-variance-authority";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import LineLoader from "./LineLoader";

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  variant?: "default" | "flat";
  isLoading?: boolean
};

const tableStyles = cva("", {
  variants: {
    variant: {
      default: "border-separate border-spacing-x-0 border-spacing-y-2",
      flat: "bg-background text-text-500",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
const tableHeaderStyles = cva("", {
  variants: {
    variant: {
      default: "mb-6 rounded-lg text-text-500",
      flat: "bg-background text-text-500",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
const tableHeaderRowStyles = cva("", {
  variants: {
    variant: {
      default:
        "rounded-lg border border-[#EBEDF0] bg-primary-50 hover:bg-primary-50",
      flat: "bg-background text-text-500",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
const tableCellStyle = cva("", {
  variants: {
    variant: {
      default:
        "border-y border-[#EFF0F2] px-4 py-2 first-of-type:overflow-hidden first-of-type:rounded-l-lg first-of-type:border-l last-of-type:overflow-hidden last-of-type:rounded-r-lg last-of-type:border-r",
      flat: "bg-background text-text-500",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
const tableBodyRowStyle = cva("", {
  variants: {
    variant: {
      default: "shadow-[10px_10px_20px_0px_#8993A426] bg-white",
      flat: "bg-background text-text-500",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export function DataTable<TData, TValue>({
  columns,
  data,
  variant = "default",
  isLoading = false
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div>
      <div className="w-full">
        {isLoading && <LineLoader />}
        <Table className={tableStyles({ variant })}>
          <TableHeader className={tableHeaderStyles({ variant })}>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                className={tableHeaderRowStyles({ variant })}
                key={headerGroup.id}
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className={tableBodyRowStyle({ variant })}
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      className={tableCellStyle({ variant })}
                      key={cell.id}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
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
    </div>
  );
}
