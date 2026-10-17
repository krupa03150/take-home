"use client";

import { useMemo, useState, type ReactNode } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { Provider as StyletronProvider } from "styletron-react";
import { Client as StyletronClient, Server as StyletronServer } from "styletron-engine-monolithic";

const HYDRATE_CLASS = "_styletron_hydrate_";
const CONTAINER_ID = "_styletron_container_";

type StyletronEngine = StyletronClient | StyletronServer;

function createEngine(): StyletronEngine {
  if (typeof window === "undefined") {
    return new StyletronServer();
  }

  const oldContainer = document.getElementById(CONTAINER_ID);
  const container = document.createElement("style");
  container.id = CONTAINER_ID;
  document.head.appendChild(container);

  const hydrateElements = document.getElementsByClassName(
    HYDRATE_CLASS
  ) as HTMLCollectionOf<HTMLStyleElement>;

  // Next can occasionally insert hydration styles into body on client navigations.
  if (hydrateElements.length > 1) {
    for (let i = hydrateElements.length - 1; i >= 0; i -= 1) {
      if (hydrateElements[i].parentNode === document.body) {
        hydrateElements[i].remove();
      }
    }
  }

  const client = new StyletronClient({
    hydrate: hydrateElements,
    container,
  });

  oldContainer?.remove();
  return client;
}

export function StyletronRegistry({ children }: { children: ReactNode }) {
  const [engine] = useState(createEngine);
  // Keep a stable reference across renders for SSR stylesheet extraction.
  const styletron = useMemo(() => engine, [engine]);

  useServerInsertedHTML(() => {
    if (!("getStylesheets" in styletron)) {
      return null;
    }

    const stylesheets = styletron.getStylesheets() ?? [];
    return (
      <>
        {stylesheets.map((sheet, index) => (
          <style
            key={index}
            className={HYDRATE_CLASS}
            dangerouslySetInnerHTML={{ __html: sheet.css }}
            media={sheet.attrs.media}
            data-hydrate={sheet.attrs["data-hydrate"]}
          />
        ))}
      </>
    );
  });

  return <StyletronProvider value={styletron}>{children}</StyletronProvider>;
}
