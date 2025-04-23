import * as React from 'react';
import { DataGrid } from '@mai/datagrid';

const columns = [
  { field: 'id', headerName: 'ID', width: 60 },
  { field: 'name', headerName: 'Name' },
  { field: 'age', headerName: 'Age' },
];
const rows = Array.from({ length: 20 }, (_, i) => ({ id: i + 1, name: `User ${i + 1}`, age: 20 + (i % 10) }));

export function DataGridPaginationExample() {
  const [page, setPage] = React.useState(0);
  const pageSize = 5;
  const pagedRows = rows.slice(page * pageSize, (page + 1) * pageSize);
  const pageCount = Math.ceil(rows.length / pageSize);
  return (
    <DataGrid columns={columns} rows={pagedRows}>
      <DataGrid.Pagination>
        <div className="flex justify-end items-center gap-2 mt-2">
          <button className="px-3 py-1 border border-black bg-black text-white rounded hover:bg-white hover:text-black font-semibold transition"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
          >Prev</button>
          <span className="text-black">Page {page + 1} of {pageCount}</span>
          <button className="px-3 py-1 border border-black bg-black text-white rounded hover:bg-white hover:text-black font-semibold transition"
            onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
            disabled={page === pageCount - 1}
          >Next</button>
        </div>
      </DataGrid.Pagination>
    </DataGrid>
  );
}
