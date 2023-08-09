import Head from "next/head";
import React from "react";

type PropTypes = {
  children: React.ReactNode;
};

export default function Home({ children }: PropTypes) {
  return (
    <div className="min-w-screen flex min-h-screen flex-col justify-center">
      <Head>
        <title>Phantom</title>
        <meta name="description" content="A slick little link storage app!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {children}
    </div>
  );
}
