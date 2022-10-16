import { addParamOption, endpoints, getUrl } from "../../util.ts";

import { IncludesObject, TweetObject } from "../data_interface/tweet.ts";

interface TweetResponse {
  data: TweetObject;
  includes: IncludesObject;
}
interface TweetsResponse {
  data: TweetObject[];
  includes: IncludesObject;
}

export interface TweetsParam extends TweetParam {
  "ids": string[];
}

export interface TweetParam {
  "expansions"?: {
    "attachments.poll_ids"?: boolean;
    "attachments.media_keys"?: boolean;
    "author_id"?: boolean;
    "entities.mentions.username"?: boolean;
    "geo.place_id"?: boolean;
    "in_reply_to_user_id"?: boolean;
    "referenced_tweets.id"?: boolean;
  };
  "media.fields"?: {
    "duration_ms"?: boolean;
    "height"?: boolean;
    "media_key"?: boolean;
    "preview_image_url"?: boolean;
    "type"?: boolean;
    "url"?: boolean;
    "width"?: boolean;
    "public_metrics"?: boolean;
    "organic_metrics"?: boolean;
    "promoted_metrics"?: boolean;
  };
  "place.fields"?: {
    "contained_within"?: boolean;
    "country"?: boolean;
    "country_code"?: boolean;
    "full_mame"?: boolean;
    "geo"?: boolean;
    "id"?: boolean;
    "name"?: boolean;
    "place_type"?: boolean;
  };
  "poll.fields"?: {
    "duration_minutes"?: boolean;
    "end_datetime"?: boolean;
    "id"?: boolean;
    "options"?: boolean;
    "voting_status"?: boolean;
  };
  "tweet.fields"?: {
    "attachments"?: boolean;
    "author_id"?: boolean;
    "context_annotations"?: boolean;
    "conversation_id"?: boolean;
    "created_at"?: boolean;
    "entities"?: boolean;
    "geo"?: boolean;
    "geo.coordinates"?: boolean;
    "id"?: boolean;
    "in_reply_to_user_id"?: boolean;
    "lang"?: boolean;
    "non_public_metrics"?: boolean;
    "public_metrics"?: boolean;
    "organic_metrics"?: boolean;
    "promoted_metrics"?: boolean;
    "possibly_sensitive"?: boolean;
    "referenced_tweets"?: boolean;
    "source"?: boolean;
    "text"?: boolean;
    "withheld"?: boolean;
  };
  "user.fields"?: {
    "created_at"?: boolean;
    "description"?: boolean;
    "entities"?: boolean;
    "id"?: boolean;
    "location"?: boolean;
    "name"?: boolean;
    "pinned_tweet_id"?: boolean;
    "profile_image_url"?: boolean;
    "protected"?: boolean;
    "public_metrics"?: boolean;
    "url"?: boolean;
    "username"?: boolean;
    "verified"?: boolean;
    "withheld"?: boolean;
  };
}

/**
 * Retrieve multiple Tweets with a list of IDs.
 * https://developer.twitter.com/en/docs/twitter-api/tweets/lookup/api-reference/get-tweets
 * @export
 * @param {string} bearerToken
 * @param {TweetsParam} param
 * @return {TweetsResponse}
 */

export async function getTweets(bearerToken: string, param: TweetsParam) {
  const url = getUrl(endpoints.api_v2.lookup);
  //url.searchParams.set("ids", param.ids);
  addParamOption(url, param);
  const res = await (await fetch(
    url.toString(),
    {
      headers: new Headers({
        "Authorization": `Bearer ${bearerToken}`,
      }),
    },
  )).json() as TweetsResponse;
  return res;
}

/**
 * Retrieve a single Tweet with an ID.
 * https://developer.twitter.com/en/docs/twitter-api/tweets/lookup/api-reference/get-tweets-id
 * @export
 * @param {string} bearerToken
 * @param {string} id
 * @param {TweetParam} [param]
 * @return {TweetResponse}
 */
export async function getTweet(
  bearerToken: string,
  id: string,
  param?: TweetParam,
) {
  const url = getUrl(`${endpoints.api_v2.lookup}/${id}`);
  if (param) addParamOption(url, param as TweetsParam);
  const res = await (await fetch(
    url.toString(), //getUrl(`${endpoints.api_v2.lookup}/${id}`),
    {
      headers: new Headers({
        "Authorization": `Bearer ${bearerToken}`,
      }),
    },
  )).json() as TweetResponse;
  return res;
}
