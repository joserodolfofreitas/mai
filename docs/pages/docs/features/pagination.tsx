import Head from 'next/head';
import Link from 'next/link';
import { LiveExample } from '../../../components/LiveExample';
import { DataGrid } from '@mai/datagrid';

export default function PaginationDocs() {
  const columns = [
    { field: 'id', headerName: 'ID', width: 60 },
    { field: 'name', headerName: 'Name' },
    { field: 'age', headerName: 'Age' },
  ];
  const rows = Array.from({ length: 50 }, (_, i) => ({ id: i + 1, name: `User ${i + 1}`, age: 20 + (i % 10) }));

  function CustomPagination() {
    return (
      <div className="flex justify-end items-center gap-2 mt-2">
        <button className="px-3 py-1 border border-black bg-white text-black rounded hover:bg-black hover:text-white transition">Prev</button>
        <span className="text-black">Page 1 of 10</span>
        <button className="px-3 py-1 border border-black bg-white text-black rounded hover:bg-black hover:text-white transition">Next</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-4 py-8">
      <Head>
        <title>Pagination - MAI Data Grid Documentation</title>
        <meta name="description" content="Pagination feature documentation for the MAI Data Grid component" />
      </Head>
      <nav className="mb-8 flex gap-4">
        <Link href="/" className="underline">Home</Link>
        <span>/</span>
        <Link href="/docs/datagrid" className="underline">Docs</Link>
        <span>/</span>
        <span>Features</span>
        <span>/</span>
        <span>Pagination</span>
      </nav>
      <main className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Pagination</h1>
        <p className="mb-8 text-lg">
          MAI Data Grid supports built-in pagination, allowing you to efficiently display large datasets by splitting them into pages.
        </p>
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-2">Basic Usage</h2>
          <pre className="bg-gray-900 rounded p-4 overflow-x-auto text-sm mb-2">{`<DataGrid columns={columns} rows={rows} pageSize={10} enablePagination />`}</pre>
        </section>
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-2">Controlled Pagination</h2>
          <p className="mb-2">You can control the current page and page size using <code>page</code>, <code>onPageChange</code>, <code>pageSize</code>, and <code>onPageSizeChange</code> props.</p>
          <pre className="bg-gray-900 rounded p-4 overflow-x-auto text-sm mb-2">{`<DataGrid
  columns={columns}
  rows={rows}
  page={page}
  onPageChange={setPage}
  pageSize={pageSize}
  onPageSizeChange={setPageSize}
  enablePagination
/>`}</pre>
        </section>
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-2">Custom Pagination Component</h2>
          <p className="mb-2">You can provide your own pagination component via the <code>components.Pagination</code> slot and <code>componentsProps.pagination</code> for customization.</p>
          <pre className="bg-gray-900 rounded p-4 overflow-x-auto text-sm mb-2">{`<DataGrid
  columns={columns}
  rows={rows}
  components={{ Pagination: MyPagination }}
  componentsProps={{ pagination: { ... } }}
  enablePagination
/>`}</pre>
        </section>
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-2">Live Example (Slot-based)</h2>
          <LiveExample
            code={`<DataGrid columns={columns} rows={rows} pageSize={5} enablePagination>
  <DataGrid.Pagination>
    <CustomPagination />
  </DataGrid.Pagination>
</DataGrid>`}
            scope={{ DataGrid, columns, rows, CustomPagination }}
          />
        </section>
      </main>
    </div>
  );
}
