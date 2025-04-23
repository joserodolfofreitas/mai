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
      <LiveError className="text-red-500 mt-2" />
    </LiveProvider>
  );
};
