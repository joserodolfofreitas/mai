import Head from 'next/head';
import Link from 'next/link';

export default function DataGridDocs() {
  return (
    <div className="min-h-screen bg-black text-white px-4 py-8">
      <Head>
        <title>MAI Data Grid Documentation</title>
        <meta name="description" content="Documentation for the MAI Data Grid component" />
      </Head>
      <nav className="mb-8 flex gap-4">
        <Link href="/" className="underline">Home</Link>
        <span>/</span>
        <span>Docs</span>
        <span>/</span>
        <span>DataGrid</span>
      </nav>
      <main className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">MAI Data Grid</h1>
        <p className="mb-8 text-lg">
          The Data Grid provides a powerful, composable, and unstyled grid for React. <br/>
          Easily customize every subcomponent, use only the behaviors you need, and style with your own stack.
        </p>
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-2">Getting Started</h2>
          <pre className="bg-gray-900 rounded p-4 overflow-x-auto text-sm mb-2">pnpm add @mai/datagrid</pre>
          <pre className="bg-gray-900 rounded p-4 overflow-x-auto text-sm">import {'{ DataGrid }'} from '@mai/datagrid';</pre>
        </section>
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-2">Features</h2>
          <ul className="list-disc pl-6">
            <li>Virtualization for performance</li>
            <li>Toolbar with export, filter panel, quick filter input</li>
            <li>Column management (visibility, reorder, pinning)</li>
            <li>Filtering, sorting, row grouping, pagination, aggregation</li>
            <li>Composable and customizable via props and composition</li>
            <li>Unstyled by default</li>
            <li>Behavior hooks for advanced use</li>
          </ul>
        </section>
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-2">Example</h2>
          <div className="bg-gray-900 rounded p-4 overflow-x-auto text-sm mb-2">
            {/* Example usage will go here */}
            {'<DataGrid rows={rows} columns={columns} />'}
          </div>
        </section>
      </main>
    </div>
  );
}
