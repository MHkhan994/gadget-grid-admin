"use client";
import MainLayout from "@/components/layouts/MainLayout";
import { store } from "@/redux/store";
import { ThemeProvider } from "next-themes";
import React from "react";
import { Provider } from "react-redux";
import { Toaster } from 'sonner'

const GlobalProvider = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <ThemeProvider attribute="class">
      <Provider store={store}>
        <MainLayout>{children}
          <Toaster
            richColors
            position="top-center"
          />
        </MainLayout>
      </Provider>
    </ThemeProvider>
  );
};

export default GlobalProvider;