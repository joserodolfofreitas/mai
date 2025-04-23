import Head from 'next/head';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import * as React from 'react';
import { DataGrid } from '@mai/datagrid';
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

export default function DataGridDocs() {
  // Scope for playgrounds
  const scope = { React, DataGrid };

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
        {/* Slot-based Toolbar Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4 border-b pb-2">Slot-based Toolbar</h2>
          <p className="mb-4">Compose custom toolbars using the <code>DataGrid.Toolbar</code> slot. The playground below demonstrates this:</p>
          <ClientOnly>
            <LiveCodePlayground
              initialCode={toolbarSource}
              scope={scope}
              exampleFunctionName="ToolbarExample"
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
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-2">Features</h2>
          <ul className="list-disc pl-6">
            <li>Virtualization for performance</li>
            <li>Toolbar with export, filter panel, quick filter input</li>
            <li>Column management (visibility, reorder, pinning)</li>
            <li>Filtering, sorting, row grouping, pagination, aggregation</li>
            <li>Composable and customizable via <strong>slot-based composition</strong></li>
            <li>Unstyled by default</li>
            <li>Behavior hooks for advanced use</li>
            <li>
              <Link href="/docs/features/pagination" className="underline text-black font-semibold hover:text-white hover:bg-black px-2 py-1 rounded transition">Pagination</Link>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}
