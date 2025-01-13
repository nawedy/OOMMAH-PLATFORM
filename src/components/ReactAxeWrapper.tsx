import React, { useEffect } from 'react';

export function ReactAxeWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      const axe = require('@axe-core/react');
      axe(React, ReactDOM, 1000);
    }
  }, []);

  return <>{children}</>;
}

