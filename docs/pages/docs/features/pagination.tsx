import Head from 'next/head';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import * as React from 'react';
import { DataGrid, PrevButton, NextButton, useDataGridPaginationContext } from '@mai/datagrid';
import { LiveCodePlayground } from '../../../components/LiveCodePlayground';
import { ClientOnly } from '../../../components/ClientOnly';

// Dynamically import the example to prevent SSR issues
const PaginationExample = dynamic(
  () => import('../../../components/examples/PaginationExample').then(mod => mod.PaginationExample),
  { ssr: false }
);

const paginationSource = `function PaginationExample() {
  const columns = [
    { field: 'id', headerName: 'ID', width: 60 },
    { field: 'name', headerName: 'Name' },
    { field: 'age', headerName: 'Age' },
  ];
  const rows = Array.from({ length: 50 }, (_, i) => ({ id: i + 1, name: \`User \${i + 1}\`, age: 20 + (i % 10) }));

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
}`;

export default function PaginationDocs() {
  const scope = {
    React,
    DataGrid,
    PrevButton,
    NextButton,
    useDataGridPaginationContext,
  };

  return (
    <div className="min-h-screen bg-white text-black px-4 py-8">
      <Head>
        <title>Pagination - MAI Data Grid Documentation</title>
        <meta name="description" content="Pagination feature documentation for the MAI Data Grid component" />
      </Head>
      <nav className="mb-8 flex gap-4">
        <Link href="/" className="underline text-black font-semibold hover:text-white hover:bg-black px-2 py-1 rounded transition">Home</Link>
        <span>/</span>
        <Link href="/docs/datagrid" className="underline text-black font-semibold hover:text-white hover:bg-black px-2 py-1 rounded transition">Docs</Link>
        <span>/</span>
        <span>Features</span>
        <span>/</span>
        <span>Pagination</span>
      </nav>
      <main className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Pagination</h1>
        <p className="mb-4">
          The DataGrid supports pagination via slot-based composition. Use the provided <code>PrevButton</code>, <code>NextButton</code>, and <code>useDataGridPaginationContext</code> primitives for full control.
        </p>
        <section className="mb-12">
          <p className="mb-4">The playground below demonstrates pagination:</p>
          <ClientOnly>
            <LiveCodePlayground
              initialCode={paginationSource}
              scope={scope}
              exampleFunctionName="PaginationExample"
            />
          </ClientOnly>
        </section>
      </main>
    </div>
  );
}
