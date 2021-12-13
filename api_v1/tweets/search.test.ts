import "https://deno.land/x/dotenv/load.ts";
import { OAuth1Info } from "../../deps.ts";
import { assertEquals } from "../../deps-test.ts";

import { PremiumSearch } from "./search.ts";

import { getBearerToken } from "../../mod.ts";

const apiKey = Deno.env.get("API_KEY");
const apiSecret = Deno.env.get("API_SECRET");
const token = Deno.env.get("TOKEN");
const tokenSecret = Deno.env.get("TOKEN_SECRET");
// console.log(apiKey, apiSecret, token, tokenSecret);
if (!apiKey || !apiSecret || !token || !tokenSecret) throw Error("invalid env");

const auth: OAuth1Info = {
  consumerKey: apiKey,
  consumerSecret: apiSecret,
  token: token,
  tokenSecret: tokenSecret,
};
const bearerToken = await getBearerToken(auth.consumerKey, auth.consumerSecret);
// console.log(bearerToken);

Deno.test("1.1/search premium with OAuth1.1", async () => {
  const res = await PremiumSearch(auth, "fullarchive", "test", {
    query: "Twitter API",
  });
  console.log(res);
  assertEquals(typeof res, "object");
});

Deno.test("1.1/search premium with BearerToken", async () => {
  const res = await PremiumSearch(bearerToken, "fullarchive", "test", {
    query: "Twitter API",
  });
  console.log(res);
  assertEquals(typeof res, "object");
});
