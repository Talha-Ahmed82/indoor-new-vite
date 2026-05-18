import { createRootRouteWithContext, HeadContent, Outlet, Scripts, useRouter, useRouterState, useNavigate } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "../components/ui/sonner";
import { AppSidebar } from "../components/layout/AppSidebar";
import { Topbar } from "../components/layout/Topbar";
import { isAuthed } from "../lib/auth";
import { useEffect, useState } from "react";
import appCss from "../index.css?url";

const PUBLIC_ROUTES = ["/", "/login", "/signup", "/forgot-password"];

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-gradient">404</h1>
        <p className="mt-4 text-muted-foreground">Page not found</p>
        <a href="/" className="mt-6 inline-flex rounded-xl gradient-primary text-white px-5 py-2.5 text-sm font-semibold shadow-glow">Go home</a>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">Something went wrong</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
        <button onClick={() => { router.invalidate(); reset(); }} className="mt-6 rounded-xl gradient-primary text-white px-5 py-2.5 text-sm font-semibold shadow-glow">Try again</button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "IndoorGo Vendor Panel — Premium Sports Booking Dashboard" },
      { name: "description", content: "Premium vendor dashboard for managing indoor sports bookings, tournaments, marketing and earnings." },
      { property: "og:title", content: "IndoorGo Vendor Panel — Premium Sports Booking Dashboard" },
      { name: "twitter:title", content: "IndoorGo Vendor Panel — Premium Sports Booking Dashboard" },
      { property: "og:description", content: "Premium vendor dashboard for managing indoor sports bookings, tournaments, marketing and earnings." },
      { name: "twitter:description", content: "Premium vendor dashboard for managing indoor sports bookings, tournaments, marketing and earnings." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/08aa152c-a580-4384-b616-4155e8a24acb/id-preview-38df4b17--1b7b4d2f-f1ab-433b-9a81-8fe5968cda41.lovable.app-1778427090767.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/08aa152c-a580-4384-b616-4155e8a24acb/id-preview-38df4b17--1b7b4d2f-f1ab-433b-9a81-8fe5968cda41.lovable.app-1778427090767.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sora:wght@500;600;700;800&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const isPublic = PUBLIC_ROUTES.includes(pathname);

  const [authed, setAuthed] = useState<boolean | null>(null);
  useEffect(() => {
    const sync = () => setAuthed(isAuthed());
    sync();
    window.addEventListener("indoorgo-auth-change", sync);
    return () => window.removeEventListener("indoorgo-auth-change", sync);
  }, []);

  useEffect(() => {
    if (authed === false && !isPublic) {
      navigate({ to: "/" });
    }
  }, [authed, isPublic, pathname, navigate]);

  return (
    <QueryClientProvider client={queryClient}>
      {isPublic ? (
        <Outlet />
      ) : authed ? (
        <div className="min-h-screen flex bg-background bg-grid">
          <AppSidebar />
          <div className="flex-1 flex flex-col min-w-0">
            <Topbar />
            <main className="flex-1 px-4 md:px-8 py-8">
              <Outlet />
            </main>
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-background" />
      )}
      <Toaster richColors position="top-right" />
    </QueryClientProvider>
  );
}
