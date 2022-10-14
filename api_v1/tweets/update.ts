/*
POST statuses/update
https://developer.twitter.com/en/docs/twitter-api/v1/tweets/post-and-engage/api-reference/post-statuses-update
*/

import { oAuth1Fetch, OAuth1Info } from "../../deps.ts";

import { addParamOption, endpoints, getUrl } from "../../util.ts";

export interface UpdateParam {
  status: string;
  in_reply_to_status_id?: string;
  auto_populate_reply_metadata?: boolean;
  exclude_reply_user_ids?: string[];
  attachment_url?: string;
  media_ids?: string[];
  possibly_sensitive?: boolean;
  lat?: number;
  long?: number;
  place_id?: string;
  display_coordinates?: boolean;
  trim_user?: boolean;
  enable_dmcommands?: boolean;
  fail_dmcommands?: boolean;
  card_uri?: string;
}

/**
 * POST statuses/update
 * https://developer.twitter.com/en/docs/twitter-api/v1/tweets/post-and-engage/api-reference/post-statuses-update
 * @export
 * @param {OAuth1Info} auth
 * @param {UpdateParam} param
 * @return {any}
 */
export async function statusUpdate(auth: OAuth1Info, param: UpdateParam) {
  const url = getUrl(endpoints.api_v1.tweets.update);
  addParamOption(url, param);

  for (const [k, v] of Object.entries(param)) {
    url.searchParams.set(k, v);
  }
  const json = await (await oAuth1Fetch(
    auth,
    url,
    { method: "POST" },
  )).json();
  return json; // TODO: need to create an appropriate interface.
}
