"use client";

import { TRPCReactProvider } from "app/trpc/react";
import { NextUIProvider } from "@nextui-org/react";
import type { ReactNode } from "react";
import { store } from "./store";
import { Provider } from "react-redux";

export default function Providers({ children }: { children: ReactNode }) {
    return (
        <NextUIProvider>
            <Provider store={store}>
                <TRPCReactProvider>{children}</TRPCReactProvider>
            </Provider>
        </NextUIProvider>
    );
}