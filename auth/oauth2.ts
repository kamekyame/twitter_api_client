import { baFetch } from "../deps.ts";

import { endpoints, getUrl } from "../util.ts";

/**
 * Get OAuth 2.0 Bearer Token
 * https://developer.twitter.com/en/docs/authentication/oauth-2-0
 *
 * @export
 * @param {string} apiKey
 * @param {string} apiSecretKey
 * @return {string} Bearer Token
 */
export async function getBearerToken(apiKey: string, apiSecretKey: string) {
  const res = await (await baFetch(
    getUrl(endpoints.outh2.getToken),
    { username: apiKey, password: apiSecretKey },
    {
      body: "grant_type=client_credentials",
      headers: new Headers({
        "Content-Type": "application/x-www-form-urlencoded",
      }),
      method: "POST",
    },
  )).json();

  return res.access_token;
}
