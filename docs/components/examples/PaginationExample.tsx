import * as React from 'react';
import { DataGrid, PrevButton, NextButton, useDataGridPaginationContext } from '@mai/datagrid';

export function PaginationExample() {
  const columns = [
    { field: 'id', headerName: 'ID', width: 60 },
    { field: 'name', headerName: 'Name' },
    { field: 'age', headerName: 'Age' },
  ];
  const rows = Array.from({ length: 50 }, (_, i) => ({ id: i + 1, name: `User ${i + 1}`, age: 20 + (i % 10) }));

  // Add mounted state for client-side detection
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Always declare pagination variables outside of conditions
  let page = 0;
  let pageCount = 1;
  
  // Only call hooks when mounted (client-side)
  if (mounted) {
    try {
      const ctx = useDataGridPaginationContext();
      page = ctx.page;
      pageCount = ctx.pageCount;
    } catch (e) {
      // Silent catch for SSR/initial mount
    }
  }

  return (
    <DataGrid columns={columns} rows={rows}>
      <DataGrid.Pagination>
        {/* Only render pagination controls when mounted */}
        {mounted && (
          <div className="flex justify-end items-center gap-2 mt-2">
            <PrevButton />
            <span className="text-black">Page {page + 1} of {pageCount}</span>
            <NextButton />
          </div>
        )}
      </DataGrid.Pagination>
    </DataGrid>
  );
}
