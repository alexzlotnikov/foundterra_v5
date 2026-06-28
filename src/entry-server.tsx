import { PassThrough } from "node:stream";
import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import type { HelmetServerState } from "react-helmet-async";
import { AppFrame, AppRoutes } from "@/App";
import { getLanguageFromPathname } from "@/utils/languagePath";

export interface RenderedPage {
  appHtml: string;
  headHtml: string;
  htmlAttributes: string;
}

export async function render(url: string): Promise<RenderedPage> {
  const language = getLanguageFromPathname(url);
  const helmetContext: { helmet?: HelmetServerState } = {};
  const app = (
    <AppFrame initialLanguage={language} helmetContext={helmetContext}>
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </AppFrame>
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
