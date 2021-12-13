/*
POST statuses/search/tweets.json
https://developer.twitter.com/en/docs/twitter-api/v1/tweets/search/api-reference/get-search-tweets
*/

import { oAuth1Fetch, OAuth1Info } from "../../deps.ts";

import { endpoints, getUrl } from "../../util.ts";

/**
 * POST statuses/search/:product/:label
 * https://developer.twitter.com/en/docs/twitter-api/premium/search-api/api-reference/premium-search
 */
export type PremiumSearchParam = any;
export type Product = Required<
  Parameters<typeof endpoints.api_v1.tweets.search>
>[0]["product"];
export type Label = Required<
  Parameters<typeof endpoints.api_v1.tweets.search>
>[0]["label"];
export type PremiumSearchRes = any;
export async function PremiumSearch(
  auth: OAuth1Info | string,
  product: Product,
  label: Label,
  param?: PremiumSearchParam,
) {
  const url = getUrl(endpoints.api_v1.tweets.search({ product, label }));
  const method = "POST";
  const body = JSON.stringify(param);

  let json;
  if (typeof auth === "string") {
    json = await (await fetch(
      url.toString(),
      {
        method,
        headers: new Headers({
          "Authorization": `Bearer ${auth}`,
          "Content-Type": "application/json",
        }),
        body,
      },
    )).json();
  } else {
    json = await (await oAuth1Fetch(
      auth,
      url,
      {
        method,
        headers: new Headers({
          "Content-Type": "application/json",
        }),
        body,
      },
    )).json();
  }
  return json as PremiumSearchRes; // TODO: need to create an appropriate interface.
}
