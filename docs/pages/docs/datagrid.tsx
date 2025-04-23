import Head from 'next/head';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import * as React from 'react';
import { DataGrid, PrevButton, NextButton, useDataGridPaginationContext } from '@mai/datagrid';
import { LiveCodePlayground } from '../../components/LiveCodePlayground';
import { ClientOnly } from '../../components/ClientOnly';

// Dynamically import examples
const BasicExample = dynamic(() => import('../../components/examples/BasicExample').then(mod => mod.BasicExample), { ssr: false });
const ToolbarExample = dynamic(() => import('../../components/examples/ToolbarExample').then(mod => mod.ToolbarExample), { ssr: false });
const DataGridPaginationExample = dynamic(() => import('../../components/examples/DataGridPaginationExample').then(mod => mod.DataGridPaginationExample), { ssr: false });

// Source code strings for playgrounds
const basicSource = `function BasicExample() {
  const columns = [
    { field: 'id', headerName: 'ID', width: 60 },
    { field: 'name', headerName: 'Name' },
    { field: 'age', headerName: 'Age' },
  ];
  const rows = Array.from({ length: 20 }, (_, i) => ({ id: i + 1, name: \`User \${i + 1}\`, age: 20 + (i % 10) }));

  return (
    <DataGrid columns={columns} rows={rows} />
  );
}`;

const toolbarSource = `function ToolbarExample() {
  const columns = [
    { field: 'id', headerName: 'ID', width: 60 },
    { field: 'name', headerName: 'Name' },
    { field: 'age', headerName: 'Age' },
  ];
  const rows = Array.from({ length: 20 }, (_, i) => ({ id: i + 1, name: \`User \${i + 1}\`, age: 20 + (i % 10) }));

  return (
    <DataGrid columns={columns} rows={rows}>
      <DataGrid.Toolbar>
        <button className="px-4 py-2 bg-black text-white border border-black rounded hover:bg-white hover:text-black font-semibold transition">Export</button>
      </DataGrid.Toolbar>
    </DataGrid>
  );
}`;

const paginationSource = `function DataGridPaginationExample() {
  const columns = [
    { field: 'id', headerName: 'ID', width: 60 },
    { field: 'name', headerName: 'Name' },
    { field: 'age', headerName: 'Age' },
  ];
  const rows = Array.from({ length: 20 }, (_, i) => ({ id: i + 1, name: \`User \${i + 1}\`, age: 20 + (i % 10) }));

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
}`;

const fullFeaturedSource = `function FullFeaturedDataGridExample() {
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
    name: \`User \${i + 1}\`,
    age: 20 + (i % 10),
    email: \`user\${i + 1}@example.com\`
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
              for (const key in next) next[key] = window.confirm(\`Show column \${key}?\`);
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
          {mounted ? \`Showing \${page * 25 + 1} - \${Math.min((page + 1) * 25, filteredRows.length)} of \${filteredRows.length}\` : ''}
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
`;

export default function DataGridDocs() {
  // Scope for playgrounds
  const scope = { React, DataGrid, PrevButton, NextButton, useDataGridPaginationContext };

  return (
    <div className="min-h-screen bg-white text-black px-4 py-8">
      <Head>
        <title>MAI Data Grid Documentation</title>
        <meta name="description" content="Documentation for the MAI Data Grid component" />
      </Head>
      <nav className="mb-8 flex gap-4">
        <Link href="/" className="underline text-black font-semibold hover:text-white hover:bg-black px-2 py-1 rounded transition">Home</Link>
        <span>/</span>
        <span>Docs</span>
        <span>/</span>
        <span>DataGrid</span>
      </nav>
      <main className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">MAI Data Grid</h1>
        <p className="mb-4">
          The next-generation, composable, unstyled, virtualized Data Grid for React. Built for customization, performance, and elegant integration.
        </p>
        {/* Basic Usage Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4 border-b pb-2">Basic Usage</h2>
          <ClientOnly>
            <LiveCodePlayground
              initialCode={basicSource}
              scope={scope}
              exampleFunctionName="BasicExample"
            />
          </ClientOnly>
        </section>
        {/* Slot-based Pagination Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4 border-b pb-2">Slot-based Pagination</h2>
          <p className="mb-4">Implement custom pagination logic using the <code>DataGrid.Pagination</code> slot. You can use the context hook for more complex state management (see <Link href="/docs/features/pagination" className="text-blue-600 underline hover:text-blue-800">Pagination Feature</Link>). Try the playground below:</p>
          <ClientOnly>
            <LiveCodePlayground
              initialCode={paginationSource}
              scope={scope}
              exampleFunctionName="DataGridPaginationExample"
            />
          </ClientOnly>
        </section>
        {/* Features Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-2">Features</h2>
          <ul className="list-disc pl-6">
            <li>Composable and unstyled</li>
            <li>Virtualized rendering for performance</li>
            <li>Customizable columns and toolbars</li>
            <li>Pagination and filtering support (<Link href="/docs/features/pagination" className="underline text-blue-600 hover:text-blue-800">see details</Link>)</li>
            <li>Export functionality</li>
          </ul>
          <div className="mt-4">
            <Link href="/docs/features/full-featured" className="text-blue-600 underline hover:text-blue-800 font-semibold">See standalone full-featured demo →</Link>
          </div>
        </section>
      </main>
    </div>
  );
}
