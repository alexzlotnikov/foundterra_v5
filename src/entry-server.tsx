import { PassThrough } from "node:stream";
import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { Routes, Route } from "react-router-dom";
import { HelmetProvider, type HelmetServerState } from "react-helmet-async";
import { LanguageProvider, type Language } from "@/hooks/useLanguage";
import { appRoutes, NotFoundPage } from "@/routes";
import RouteSeo from "@/components/RouteSeo";
import ErrorBoundary from "@/components/ErrorBoundary";

export interface RenderedPage {
  appHtml: string;
  headHtml: string;
  htmlAttributes: string;
}

export async function render(url: string): Promise<RenderedPage> {
  const language: Language = url.startsWith("/he") ? "he" : "en";
  const helmetContext: { helmet?: HelmetServerState } = {};
  const app = (
    <HelmetProvider context={helmetContext}>
      <LanguageProvider initialLanguage={language}>
        <ErrorBoundary>
          <StaticRouter location={url}>
            <Routes>
              {appRoutes.map(({ path, component: Component }) => (
                <Route key={path} path={path} element={<Component />} />
              ))}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <RouteSeo />
          </StaticRouter>
        </ErrorBoundary>
      </LanguageProvider>
    </HelmetProvider>
  );

  const appHtml = await new Promise<string>((resolve, reject) => {
    let html = "";
    const output = new PassThrough();
    output.setEncoding("utf8");
    output.on("data", (chunk) => {
      html += chunk;
    });
    output.on("end", () => resolve(html));
    output.on("error", reject);

    const stream = renderToPipeableStream(app, {
      onAllReady() {
        stream.pipe(output);
      },
      onShellError: reject,
      onError(error) {
        console.error(`[prerender] ${url}`, error);
      },
    });
  });

  const helmet = helmetContext.helmet;
  return {
    appHtml,
    headHtml: helmet
      ? [helmet.title.toString(), helmet.meta.toString(), helmet.link.toString(), helmet.script.toString()].join("\n")
      : "",
    htmlAttributes: helmet?.htmlAttributes.toString() ?? `lang="${language}" dir="${language === "he" ? "rtl" : "ltr"}"`,
  };
}
