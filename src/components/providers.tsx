"use client";

import type { ReactNode } from "react";
import { BaseProvider, LightThemeMove } from "baseui";
import { StyletronRegistry } from "@/lib/styletron-provider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <StyletronRegistry>
      <BaseProvider theme={LightThemeMove} zIndex={100}>
        {children}
      </BaseProvider>
    </StyletronRegistry>
  );
}
