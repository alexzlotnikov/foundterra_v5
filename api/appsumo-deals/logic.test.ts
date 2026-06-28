import assert from "node:assert/strict";
import test from "node:test";
import { findVerifiedDeal, isUsableReplacement } from "./logic.ts";

const deal = { company: "TidyCal", slug: "tidycal", token: "abc123" };

test("findVerifiedDeal accepts an active tracking link match", () => {
  const match = findVerifiedDeal(
    [{ Name: "TidyCal lifetime access", Description: "Calendar", TrackingLink: "https://example.com/abc123" }],
    deal,
  );
  assert.equal(match?.Name, "TidyCal lifetime access");
});

test("findVerifiedDeal rejects unmatched and linkless ads", () => {
  assert.equal(findVerifiedDeal([{ Name: "TidyCal", Description: "Calendar" }], deal), undefined);
  assert.equal(findVerifiedDeal([{ Name: "Another product", TrackingLink: "https://example.com/other" }], deal), undefined);
});

test("replacement candidates require complete usable metadata", () => {
  assert.equal(isUsableReplacement({ Name: "New deal", Description: "Useful tool", TrackingLink: "https://example.com/deal" }), true);
  assert.equal(isUsableReplacement({ Name: "New deal", Description: "", TrackingLink: "https://example.com/deal" }), false);
  assert.equal(isUsableReplacement({ Name: "New deal", Description: "Useful tool" }), false);
});
