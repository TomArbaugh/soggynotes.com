import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import { getUser } from "~/session.server";
import stylesheet from "~/tailwind.css";
import { useEffect } from "react";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  {rel: "manifest", href: "/manifest.json"},
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  { rel: "apple-touch-icon", href: "/icons/apple-icon.png" },
  { rel: "apple-touch-startup-image", href: "/icons/apple-splash-2048-2732.jpg", sizes: "2048x2732" },
  { rel: "apple-touch-startup-image", href: "/icons/apple-splash-1668-2388.jpg", sizes: "1668x2388" },
  { rel: "apple-touch-startup-image", href: "/icons/apple-splash-1536-2048.jpg", sizes: "1536x2048" },
  { rel: "apple-touch-startup-image", href: "/icons/apple-splash-1125-2436.jpg", sizes: "1125x2436" },
  { rel: "apple-touch-startup-image", href: "/icons/apple-splash-1242-2208.jpg", sizes: "1242x2208" },
  { rel: "apple-touch-startup-image", href: "/icons/apple-splash-750-1334.jpg", sizes: "750x1334" },
  { rel: "apple-touch-startup-image", href: "/icons/apple-splash-640-1136.jpg", sizes: "640x1136" }
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return json({ user: await getUser(request) });
};

export default function App() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/service-worker.js")
        .then((registration) => {
          console.log("Service Worker Registered:", registration);
        })
        .catch((error) => {
          console.error("Service Worker Registration Failed:", error);
        });
    }
  }, []);
  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
