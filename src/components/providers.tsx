"use client";

import type { ReactNode } from "react";
import { BaseProvider, LightTheme } from "baseui";
import { StyletronRegistry } from "@/lib/styletron-provider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <StyletronRegistry>
      <BaseProvider theme={LightTheme} zIndex={100}>
        {children}
      </BaseProvider>
    </StyletronRegistry>
  );
}
