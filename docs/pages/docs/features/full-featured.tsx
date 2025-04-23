import Head from 'next/head';
import Link from 'next/link';
import { LiveCodePlayground } from '../../../components/LiveCodePlayground';
import { ClientOnly } from '../../../components/ClientOnly';
import dynamic from 'next/dynamic';
import * as React from 'react';

const FullFeaturedDataGridExample = dynamic(
  () => import('../../../components/examples/FullFeaturedDataGridExample').then(mod => mod.FullFeaturedDataGridExample),
  { ssr: false }
);

const fullFeaturedSource = `function FullFeaturedExample() {
  const [filters, setFilters] = React.useState({ name: '', age: '' });
  const [columnsState, setColumnsState] = React.useState({ name: true, age: true, email: true });
  const [exported, setExported] = React.useState(false);

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

  // Only call the hook when mounted in the client
  // In a real app, you wouldn't need this check
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => { setMounted(true); }, []);
  
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
}`;

const scope = {
  DataGrid: require('@mai/datagrid').DataGrid,
  PrevButton: require('@mai/datagrid').PrevButton,
  NextButton: require('@mai/datagrid').NextButton,
  useDataGridPaginationContext: require('@mai/datagrid').useDataGridPaginationContext,
  React
};

export default function FullFeaturedDocs() {
  return (
    <div className="min-h-screen bg-white text-black px-4 py-8">
      <Head>
        <title>Full Featured DataGrid - MAI Data Grid Documentation</title>
        <meta name="description" content="Full featured DataGrid example with filter panel, column management, toolbar, pagination, and export button." />
      </Head>
      <nav className="mb-8 flex gap-4">
        <Link href="/" className="underline text-black font-semibold hover:text-white hover:bg-black px-2 py-1 rounded transition">Home</Link>
        <span>/</span>
        <Link href="/docs/datagrid" className="underline text-black font-semibold hover:text-white hover:bg-black px-2 py-1 rounded transition">Docs</Link>
        <span>/</span>
        <span>Features</span>
        <span>/</span>
        <span>Full Featured</span>
      </nav>
      <main className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Full Featured DataGrid</h1>
        <p className="mb-4">
          This example demonstrates a DataGrid with all major features: filter panel, column management, toolbar with pagination, and a footer export button. Use this as a starting point for building a fully interactive data grid experience.
        </p>
        <p className="mb-4">
          This example combines several features including filtering, column visibility, toolbar, pagination, and export.
        </p>
        <section className="mb-12">
          <p className="mb-4">Explore the combined features in the playground below:</p>
          <ClientOnly>
            <LiveCodePlayground
              initialCode={fullFeaturedSource}
              scope={scope}
              exampleFunctionName="FullFeaturedExample"
              height="500px"
            />
          </ClientOnly>
        </section>
      </main>
    </div>
  );
}
