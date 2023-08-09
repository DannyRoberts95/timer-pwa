import "../styles/globals.css";

import {
  Inconsolata,
  Inter,
  Noto_Sans_Mono,
  Zen_Dots,
  Zen_Old_Mincho,
} from "@next/font/google";

import Layout from "../components/layout/Layout";
//Preload the oswald font from google
const font = Noto_Sans_Mono({
  subsets: ["latin"],
  variable: "--font-zen-dots",
  weight: "400",
});

import type { AppProps } from "next/app";
import { useEffect, useState } from "react";

//reference key for local data storage
const DATA_KEY = `localData`;

export interface LocalDataShape {
  sessionTime?: number;
  intervalTime?: number;
}

const emptyData = { sessionTime: 0, intervalTime: 0 };

export default function App({ Component, pageProps }: AppProps) {
  const [data, setData] = useState<LocalDataShape>();

  // update local data function
  const updateLocalData = (newData: LocalDataShape) => {
    localStorage.setItem(DATA_KEY, JSON.stringify(newData));
    setData(newData);
  };

  // Clear local data function
  const clearLocalData = () => {
    localStorage.clear();
    setData(emptyData);
  };
  // populate state using local data on app mount
  useEffect(() => {
    console.clear();
    console.log("Console Cleared by App.tsx");
  }, []);

  // populate state using local data on app mount
  useEffect(() => {
    const localData = localStorage.getItem(DATA_KEY);
    setData(localData ? JSON.parse(localData) : emptyData);
  }, []);

  // Arrange props to be passed to children. These could also be served via a context
  const commonProps = { data, updateLocalData, clearLocalData };
  const componentProps = { ...commonProps, ...pageProps };

  return (
    <main className={`${font.variable} font-sans`}>
      <Layout>
        <Component {...componentProps} />
      </Layout>
    </main>
  );
}
