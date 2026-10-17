"use client";

import type { ReactNode } from "react";
import { BaseProvider } from "baseui";
import { StyletronRegistry } from "@/lib/styletron-provider";
import { commonGroundTheme } from "@/lib/theme";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <StyletronRegistry>
      <BaseProvider theme={commonGroundTheme} zIndex={100}>
        {children}
      </BaseProvider>
    </StyletronRegistry>
  );
}
