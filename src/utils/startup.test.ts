import assert from "node:assert/strict";
import test from "node:test";
import { getLanguageFromPathname } from "./languagePath.ts";
import { safeStorage } from "./storage.ts";

test("URL path determines the initial language", () => {
  assert.equal(getLanguageFromPathname("/"), "en");
  assert.equal(getLanguageFromPathname("/startup-deals"), "en");
  assert.equal(getLanguageFromPathname("/he"), "he");
  assert.equal(getLanguageFromPathname("/he/startup-deals?source=test"), "he");
});

test("safeStorage tolerates denied storage access", () => {
  const originalWindow = globalThis.window;
  Object.defineProperty(globalThis, "window", {
    configurable: true,
    value: Object.defineProperty({}, "localStorage", {
      configurable: true,
      get() {
        throw new Error("Storage denied");
      },
    }),
  });

  assert.equal(safeStorage.getItem("localStorage", "preferred-language"), null);
  assert.equal(safeStorage.setItem("localStorage", "preferred-language", "he"), false);

  Object.defineProperty(globalThis, "window", {
    configurable: true,
    value: originalWindow,
  });
});

test("safeStorage tolerates storage methods throwing", () => {
  const originalWindow = globalThis.window;
  Object.defineProperty(globalThis, "window", {
    configurable: true,
    value: {
      localStorage: {
        getItem() {
          throw new Error("Read denied");
        },
        setItem() {
          throw new Error("Write denied");
        },
      },
    },
  });

  assert.equal(safeStorage.getItem("localStorage", "preferred-language"), null);
  assert.equal(safeStorage.setItem("localStorage", "preferred-language", "en"), false);

  Object.defineProperty(globalThis, "window", {
    configurable: true,
    value: originalWindow,
  });
});
