import * as React from 'react';
import { DataGrid } from '@mai/datagrid';

const columns = [
  { field: 'id', headerName: 'ID', width: 60 },
  { field: 'name', headerName: 'Name' },
  { field: 'age', headerName: 'Age' },
];
const rows = Array.from({ length: 20 }, (_, i) => ({ id: i + 1, name: `User ${i + 1}`, age: 20 + (i % 10) }));

export function ToolbarExample() {
  return (
    <DataGrid columns={columns} rows={rows}>
      <DataGrid.Toolbar>
        <button className="px-4 py-2 bg-black text-white border border-black rounded hover:bg-white hover:text-black font-semibold transition">Export</button>
      </DataGrid.Toolbar>
    </DataGrid>
  );
}
