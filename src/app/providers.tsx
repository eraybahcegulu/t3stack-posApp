"use client";

import { TRPCReactProvider } from "app/trpc/react";
import { NextUIProvider } from "@nextui-org/react";
import type { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
    return (
        <NextUIProvider>
            <TRPCReactProvider>{children}</TRPCReactProvider>
        </NextUIProvider>
    );
}