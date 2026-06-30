import assert from "node:assert/strict";
import test from "node:test";
import {
  buildContactPayload,
  recordRateLimitAttempt,
  resolveResourceListId,
  shouldSilentlyAccept,
  subscribeContact,
  validateSubscribeInput,
} from "./logic.ts";

test("validates and normalizes subscription input", () => {
  const result = validateSubscribeInput({
    email: " Founder@Example.COM ",
    firstName: " Alex ",
    locale: "he",
    website: "",
  });

  assert.equal(result.ok, true);
  assert.deepEqual(result.value, {
    email: "founder@example.com",
    firstName: "Alex",
    locale: "he",
    website: "",
  });
});

test("rejects invalid email and missing name", () => {
  assert.equal(validateSubscribeInput({ email: "invalid", firstName: "Alex" }).ok, false);
  assert.equal(validateSubscribeInput({ email: "a@example.com", firstName: "" }).ok, false);
});

test("silently accepts a populated honeypot", () => {
  const input = validateSubscribeInput({
    email: "founder@example.com",
    firstName: "Ari",
    locale: "en",
    website: "https://spam.example",
  });

  assert.equal(input.value && shouldSilentlyAccept(input.value), true);
});

test("rate limiting expires old attempts and blocks at the limit", () => {
  const first = recordRateLimitAttempt([0, 950], 1_000, 100, 2);
  assert.deepEqual(first, { limited: false, attempts: [950, 1_000] });

  const second = recordRateLimitAttempt(first.attempts, 1_020, 100, 2);
  assert.deepEqual(second, { limited: true, attempts: [950, 1_000] });
});

test("builds an update-enabled Brevo contact payload", () => {
  assert.deepEqual(
    buildContactPayload(
      { email: "a@example.com", firstName: "Alex", locale: "en", website: "" },
      42,
    ),
    {
      email: "a@example.com",
      attributes: { FIRSTNAME: "Alex" },
      listIds: [42],
      updateEnabled: true,
    },
  );
});

test("resolves the exact Foundterra Resources list", async () => {
  const fetcher = async () =>
    new Response(JSON.stringify({
      lists: [
        { id: 10, name: "Newsletter" },
        { id: 42, name: "Foundterra Resources" },
      ],
      count: 2,
    }), { status: 200 });

  assert.equal(await resolveResourceListId("secret", fetcher as typeof fetch), 42);
});

test("paginates list lookup until it finds the exact list", async () => {
  let calls = 0;
  const fetcher = async () => {
    calls += 1;
    return new Response(JSON.stringify(
      calls === 1
        ? { lists: Array.from({ length: 50 }, (_, id) => ({ id, name: `List ${id}` })), count: 51 }
        : { lists: [{ id: 72, name: "Foundterra Resources" }], count: 51 },
    ), { status: 200 });
  };

  assert.equal(await resolveResourceListId("secret", fetcher as typeof fetch), 72);
  assert.equal(calls, 2);
});

test("rejects missing or duplicate exact list names", async () => {
  const missing = async () =>
    new Response(JSON.stringify({ lists: [{ id: 1, name: "Other" }], count: 1 }), { status: 200 });
  const duplicate = async () =>
    new Response(JSON.stringify({
      lists: [
        { id: 1, name: "Foundterra Resources" },
        { id: 2, name: "Foundterra Resources" },
      ],
      count: 2,
    }), { status: 200 });

  await assert.rejects(() => resolveResourceListId("secret", missing as typeof fetch), /NOT_FOUND/);
  await assert.rejects(() => resolveResourceListId("secret", duplicate as typeof fetch), /NOT_UNIQUE/);
});

test("submits the contact through Brevo and accepts successful upserts", async () => {
  let requestBody = "";
  const fetcher = async (_url: string | URL | Request, init?: RequestInit) => {
    requestBody = String(init?.body);
    return new Response(null, { status: 201 });
  };

  await subscribeContact(
    "secret",
    { email: "a@example.com", firstName: "Alex", locale: "en", website: "" },
    42,
    fetcher as typeof fetch,
  );

  assert.deepEqual(JSON.parse(requestBody), {
    email: "a@example.com",
    attributes: { FIRSTNAME: "Alex" },
    listIds: [42],
    updateEnabled: true,
  });
});

test("maps Brevo contact failures to a sanitized internal error", async () => {
  const fetcher = async () => new Response(null, { status: 400 });
  await assert.rejects(
    () => subscribeContact(
      "secret",
      { email: "a@example.com", firstName: "Alex", locale: "en", website: "" },
      42,
      fetcher as typeof fetch,
    ),
    /BREVO_CONTACT_UPSERT_FAILED/,
  );
});
