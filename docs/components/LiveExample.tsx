import * as React from 'react';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';

interface LiveExampleProps {
  code: string;
  scope?: Record<string, any>;
}

export const LiveExample: React.FC<LiveExampleProps> = ({ code, scope = {} }) => {
  return (
    <LiveProvider code={code} scope={scope} theme={undefined}>
      <div className="mb-2 border border-black rounded bg-gray-100 p-4">
        <LivePreview />
      </div>
      <LiveEditor className="rounded bg-gray-200 p-2 text-sm font-mono text-black" />
      <LiveError>
        {(error) => (
          <div className="text-red-600 mt-2 border border-red-300 bg-red-50 p-2 rounded" style={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
            <strong>Playground Error:</strong>
            <br />
            {error}
            {error && error.includes('is not defined') && (
              <div className="text-xs text-red-800 mt-2">
                <em>
                  Tip: Check that all required symbols are provided in the playground scope!
                </em>
              </div>
            )}
          </div>
        )}
      </LiveError>
    </LiveProvider>
  );
};
