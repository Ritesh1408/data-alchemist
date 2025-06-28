'use client';

import React, { useState } from 'react';
import { Table, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { updateCell } from '@/store/dataSlice';
import { Input } from '@/components/ui/input';

interface DataGridProps {
  data: any[];
  entityType: 'clients' | 'workers' | 'tasks';
}

export const DataGrid: React.FC<DataGridProps> = ({ data, entityType }) => {
  const dispatch = useAppDispatch();
  const { errors } = useAppSelector((state) => state.data);
  const [editingCell, setEditingCell] = useState<{ rowIndex: number; column: string } | null>(null);

  const isCellInvalid = (rowIndex: number, column: string) => {
    return errors.some(
      (error) => error.rowIndex === rowIndex && error.column === column && error.entityType === entityType
    );
  };

  const handleCellChange = (rowIndex: number, column: string, value: any) => {
    dispatch(updateCell({ key: entityType, rowIndex, column, value }));
  };

  const columns = React.useMemo(
    () =>
      data.length > 0
        ? Object.keys(data[0]).map((key) => ({
            accessorKey: key,
            header: key,
            cell: ({ row }: any) => {
              const rowIndex = row.index;

              if (editingCell && editingCell.rowIndex === rowIndex && editingCell.column === key) {
                return (
                  <Input
                    type="text"
                    className={isCellInvalid(rowIndex, key) ? 'border-red-500' : ''}
                    value={row.original[key]}
                    onChange={(e) => handleCellChange(rowIndex, key, e.target.value)}
                    onBlur={() => setEditingCell(null)}
                    autoFocus
                  />
                );
              }

              return (
                <div onClick={() => setEditingCell({ rowIndex, column: key })} className="cursor-pointer">
                  {row.original[key]}
                </div>
              );
            },
          }))
        : [],
    [data, editingCell, errors]
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto border rounded-lg my-4">
      <table className="min-w-full text-sm">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="border px-4 py-2 bg-gray-100 text-left">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="border px-4 py-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
