"use client";

import type { ReactNode } from "react";
import { BaseProvider } from "baseui";
import { StyletronRegistry } from "@/lib/styletron-provider";
import { altoTheme } from "@/lib/theme";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <StyletronRegistry>
      <BaseProvider theme={altoTheme} zIndex={100}>
        {children}
      </BaseProvider>
    </StyletronRegistry>
  );
}
