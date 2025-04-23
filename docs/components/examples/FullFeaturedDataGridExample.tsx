import * as React from 'react';
import { DataGrid, PrevButton, NextButton, useDataGridPaginationContext } from '@mai/datagrid';

export function FullFeaturedDataGridExample() {
  const [filters, setFilters] = React.useState({ name: '', age: '' });
  const [columnsState, setColumnsState] = React.useState({ name: true, age: true, email: true });
  const [exported, setExported] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', width: 60 },
    columnsState.name && { field: 'name', headerName: 'Name', hideable: true },
    columnsState.age && { field: 'age', headerName: 'Age', filterable: true },
    columnsState.email && { field: 'email', headerName: 'Email', hideable: true }
  ].filter(Boolean);

  const allRows = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    age: 20 + (i % 10),
    email: `user${i + 1}@example.com`
  }));

  const filteredRows = allRows.filter(row => {
    return (
      (!filters.name || row.name.toLowerCase().includes(filters.name.toLowerCase())) &&
      (!filters.age || String(row.age).includes(filters.age))
    );
  });

  // Only access pagination context on the client
  let page = 0, pageCount = 1;
  if (mounted) {
    try {
      const paginationContext = useDataGridPaginationContext();
      page = paginationContext.page;
      pageCount = paginationContext.pageCount;
    } catch (e) {
      // Silently handle context errors during initial mount
    }
  }

  function handleExport() {
    setExported(true);
    setTimeout(() => setExported(false), 2000);
  }

  return (
    <DataGrid columns={columns} rows={filteredRows}>
      <DataGrid.Toolbar>
        <div className="flex items-center gap-2 mb-2">
          <button
            className="px-3 py-1 border border-black bg-black text-white rounded hover:bg-white hover:text-black font-semibold transition"
            onClick={() => {
              const name = prompt('Filter by name:', filters.name);
              if (name !== null) setFilters(f => ({ ...f, name }));
            }}
          >Filter Panel</button>
          <button
            className="px-3 py-1 border border-black bg-black text-white rounded hover:bg-white hover:text-black font-semibold transition"
            onClick={() => {
              const next = { ...columnsState };
              for (const key in next) next[key] = window.confirm(`Show column ${key}?`);
              setColumnsState(next);
            }}
          >Columns</button>
          <span className="ml-auto font-semibold">Toolbar</span>
        </div>
      </DataGrid.Toolbar>
      <DataGrid.FilterPanel>
        <div className="border border-gray-300 rounded bg-gray-50 p-2 mb-2 flex gap-2">
          <label className="flex flex-col text-xs">Name
            <input value={filters.name} onChange={e => setFilters(f => ({ ...f, name: e.target.value }))} className="border rounded px-1 py-0.5" />
          </label>
          <label className="flex flex-col text-xs">Age
            <input value={filters.age} onChange={e => setFilters(f => ({ ...f, age: e.target.value }))} className="border rounded px-1 py-0.5" />
          </label>
        </div>
      </DataGrid.FilterPanel>
      <DataGrid.Pagination>
        {mounted && (
          <div className="flex justify-end items-center gap-2 mt-2">
            <PrevButton />
            <span className="text-black">Page {page + 1} of {pageCount}</span>
            <NextButton />
          </div>
        )}
      </DataGrid.Pagination>
      <div className="flex justify-between items-center mt-4">
        <div className="text-gray-500">
          {mounted ? `Showing ${page * 25 + 1} - ${Math.min((page + 1) * 25, filteredRows.length)} of ${filteredRows.length}` : ''}
        </div>
        <button
          className="px-3 py-1 border border-black bg-black text-white rounded hover:bg-white hover:text-black font-semibold transition"
          onClick={handleExport}
        >Export</button>
        {exported && <span className="ml-2 text-green-600">Exported!</span>}
      </div>
    </DataGrid>
  );
}
