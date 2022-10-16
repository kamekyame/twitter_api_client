import "https://deno.land/x/dotenv/load.ts";

import { assertRejects } from "../deps-test.ts";

import { getBearerToken } from "../auth/oauth2.ts";

const apiKey = Deno.env.get("apikey") || "";
const apiSecretKey = Deno.env.get("apisecretkey") || "";

Deno.test("Get bearertoken", async () => {
  assertRejects(await getBearerToken(apiKey, apiSecretKey));
});
