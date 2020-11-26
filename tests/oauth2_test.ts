import "https://deno.land/x/dotenv/load.ts";

import { assertThrowsAsync } from "https://deno.land/std@v0.51.0/testing/asserts.ts";

import { getBearerToken } from "../auth/oauth2.ts";

const apiKey = Deno.env.get("apikey") || "";
const apiSecretKey = Deno.env.get("apisecretkey") || "";

Deno.test("Get bearertoken", async () => {
  assertThrowsAsync(await getBearerToken(apiKey, apiSecretKey));
});
