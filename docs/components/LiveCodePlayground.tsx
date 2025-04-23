import * as React from 'react';
import dynamic from 'next/dynamic';
import * as Babel from '@babel/standalone';

// Dynamically import Monaco to avoid SSR issues
const MonacoEditor = dynamic(
  () => import('@monaco-editor/react').then(mod => mod.default),
  { ssr: false }
);

interface LiveCodePlaygroundProps {
  initialCode: string;
  scope: Record<string, any>;
  exampleFunctionName: string; // Add prop for the function name
  height?: string;
}

export const LiveCodePlayground: React.FC<LiveCodePlaygroundProps> = ({ initialCode, scope, exampleFunctionName, height = '400px' }) => {
  const [code, setCode] = React.useState(initialCode);
  const [Component, setComponent] = React.useState<React.FC>(() => () => null);
  const [error, setError] = React.useState<string>('');

  function transpileAndRun(newCode: string) {
    setError('');
    const executionContext = { ResultComponent: null }; // Object to hold the result
    try {
      // Transpile TSX/JSX to JS
      const transpiled = Babel.transform(newCode, {
        presets: ['react', 'typescript'],
        filename: 'playground.tsx', // Add filename to avoid Babel error
      }).code;

      if (!transpiled) {
        throw new Error('Babel transpilation failed.');
      }

      const scopeKeys = Object.keys(scope);
      const scopeValues = Object.values(scope);

      // Construct function body: execute transpiled code, then assign the result
      const functionBody = `
        ${transpiled}
        // Assign the defined component to the execution context
        executionContext.ResultComponent = ${exampleFunctionName};
      `;

      // Create and call the function
      // eslint-disable-next-line no-new-func
      const fn = new Function(...scopeKeys, 'executionContext', functionBody);
      fn(...scopeValues, executionContext); // Pass context

      // Retrieve the component from the context
      const Comp = executionContext.ResultComponent;

      if (typeof Comp !== 'function') {
        throw new Error(`Could not find function named '${exampleFunctionName}' in the code.`);
      }

      setComponent(() => Comp); // Set state with the retrieved component
    } catch (e: any) {
      setError(e.message || String(e));
      setComponent(() => () => null); // Clear component on error
    }
  }

  // Run the initial code when the component mounts
  React.useEffect(() => {
    transpileAndRun(initialCode);
  }, [initialCode]); // Rerun if initialCode changes (though unlikely)

  function handleEditorChange(value: string | undefined) {
    setCode(value || '');
  }

  function handleRunClick() {
    transpileAndRun(code);
  }

  return (
    <div>
      {/* Rendered Component Preview (Moved to the top) */}
      <div style={{ border: '1px solid #e5e7eb', borderRadius: 6, padding: 16, minHeight: 80 }}>
        {error ? (
          <div style={{ color: 'red', marginBottom: 8, whiteSpace: 'pre-wrap' }}>{error}</div>
        ) : (
          <Component />
        )}
      </div>

      {/* Code Editor */}
      <div style={{ border: '1px solid #e5e7eb', borderRadius: 6, marginBottom: 8 }}>
        <MonacoEditor
          height={height}
          defaultLanguage="typescript"
          value={code}
          onChange={value => handleEditorChange(value)}
          theme="vs-light"
          options={{ fontSize: 14, minimap: { enabled: false } }}
        />
      </div>

      {/* Run Button */}
      <button
        onClick={handleRunClick}
        style={{
          padding: '6px 16px',
          background: '#111',
          color: '#fff',
          borderRadius: 4,
          border: 'none',
          fontWeight: 600,
          marginBottom: 12,
          cursor: 'pointer',
        }}
      >Run ﹥</button>
    </div>
  );
};
