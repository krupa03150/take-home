"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Provider as StyletronProvider } from "styletron-react";
import { Client as StyletronClient } from "styletron-engine-monolithic";

/**
 * Client-only Styletron. Next 16 / React 19 was hydrating a StyletronServer
 * instance into the browser (useState initializer from SSR), so classNames
 * were emitted but CSS never injected into the document.
 */
export function StyletronRegistry({ children }: { children: ReactNode }) {
  const [engine, setEngine] = useState<StyletronClient | null>(null);

  useEffect(() => {
    const client = new StyletronClient({
      // Prefer readable style tags over CSSOM-only speedy inserts for reliability.
      speedy: false,
    });
    setEngine(client);
  }, []);

  if (!engine) {
    return (
      <div
        style={{
          minHeight: "100dvh",
          display: "grid",
          placeItems: "center",
          background: "#F3EDE4",
          color: "#2A2420",
          fontFamily:
            'UberMoveText, system-ui, "Helvetica Neue", Helvetica, Arial, sans-serif',
          fontSize: 17,
        }}
      >
        Loading Common Ground…
      </div>
    );
  }

  return <StyletronProvider value={engine}>{children}</StyletronProvider>;
}
