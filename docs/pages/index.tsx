import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <Head>
        <title>MAI Data Grid</title>
        <meta name="description" content="Elegant, composable, unstyled React Data Grid library" />
      </Head>
      <main className="flex flex-col items-center gap-8">
        <h1 className="text-5xl font-bold">MAI Data Grid</h1>
        <p className="text-xl max-w-2xl text-center">
          The next-generation, composable, unstyled, virtualized Data Grid for React. <br/>
          Built for customization, performance, and elegant integration.
        </p>
        <div className="flex gap-4">
          <Link href="/docs/datagrid" className="px-6 py-3 bg-white text-black rounded font-semibold hover:bg-gray-200 transition">Documentation</Link>
          <a href="#pricing" className="px-6 py-3 border border-white rounded font-semibold hover:bg-white hover:text-black transition">Pricing</a>
        </div>
      </main>
      <section id="pricing" className="mt-20 w-full flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-6">Pricing</h2>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="border border-white rounded p-8 min-w-[250px] flex flex-col items-center">
            <h3 className="text-xl font-semibold mb-2">Open Source</h3>
            <p className="mb-4">MIT License</p>
            <span className="text-2xl font-bold mb-4">Free</span>
            <ul className="mb-4 text-center">
              <li>✔️ Community support</li>
              <li>✔️ Core features</li>
              <li>✔️ Unstyled, composable</li>
            </ul>
          </div>
          <div className="border border-white rounded p-8 min-w-[250px] flex flex-col items-center bg-white text-black">
            <h3 className="text-xl font-semibold mb-2">Pro (Coming Soon)</h3>
            <p className="mb-4">Commercial License</p>
            <span className="text-2xl font-bold mb-4">TBA</span>
            <ul className="mb-4 text-center">
              <li>✔️ Advanced features</li>
              <li>✔️ Priority support</li>
              <li>✔️ Commercial usage</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
