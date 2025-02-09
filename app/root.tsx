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
   {rel: "icon", href: "/icons/icon-48x48.png", sizes: "48x48", type: "image/png"},
   {rel: "icon", href: "/icons/icon-72x72.png", sizes: "72x72", type: "image/png"},
   {rel: "icon", href: "/icons/icon-96x96.png", sizes: "96x96", type: "image/png"},
   {rel: "icon", href: "/icons/icon-128x128.png", sizes: "128x128", type: "image/png"},
   {rel: "icon", href: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png"},
   {rel: "icon", href: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png"},
   {rel: "icon", href: "/icons/maskable-icon-512x512.png", sizes: "512x512", type: "image/png", purpose: "maskable"},
   {rel: "apple-touch-icon", href: "/splash/splash-640x640.png", sizes: "640x640"},
   {rel: "apple-touch-icon", href: "/splash/splash-750x750.png", sizes: "750x750"},
   {rel: "apple-touch-icon", href: "/splash/splash-1125x1125.png", sizes: "1125x1125"},
   {rel: "apple-touch-icon", href: "/splash/splash-1536x1536.png", sizes: "1536x1536"}
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
