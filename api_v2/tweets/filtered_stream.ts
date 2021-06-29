import { addParamOption, endpoints, getUrl } from "../../util.ts";

import { IncludesObject, TweetObject } from "../data_interface/tweet.ts";

export interface StreamParam {
  "expansions"?: {
    "attachments.poll_ids"?: boolean;
    "attachments.media_keys"?: boolean;
    "author_id"?: boolean;
    "entities.mentions.username"?: boolean;
    "geo.place_id"?: boolean;
    "in_reply_to_user_id"?: boolean;
    "referenced_tweets.id"?: boolean;
    "referenced_tweets.id.author_id"?: boolean;
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

interface RequestRule {
  tag?: string;
  value: string;
}
interface ResponseRule extends RequestRule {
  id: string;
}

export interface RequestsBody {
  add?: RequestRule[];
  delete?: { ids: string[] };
}

export interface ResponseBody {
  data?: ResponseRule[];
  meta: {
    sent?: string;
    summary?: {
      created: number;
      not_created: number;
      valid: number;
      invalid: number;
    };
    error?: object;
  };
}

export interface StreamTweet {
  data: TweetObject;
  includes?: IncludesObject;
  matching_rules: { id: string; tag: string }[];
}

interface StreamRes extends StreamTweet {
  errors?: {
    title: string;
    disconnect_type: string;
    detail: string;
    type: string;
  }[];
}

/**
 * Add or delete rules from your stream.
 * https://developer.twitter.com/en/docs/twitter-api/tweets/filtered-stream/api-reference/post-tweets-search-stream-rules
 * @export
 * @param {string} bearerToken
 * @param {RequestsBody} rules
 * @param {boolean} [dry_run]
 * @return {ResponseBody}
 */
export async function changeRules(
  bearerToken: string,
  rules: RequestsBody,
  dry_run?: boolean,
) {
  const endPoint = getUrl(endpoints.api_v2.filterd_stream.rules);
  if (dry_run) {
    endPoint.searchParams.append("dry_run", dry_run.toString());
  }
  //console.log(url.toString());
  const res = await (await fetch(
    endPoint,
    {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${bearerToken}`,
      }),
      body: JSON.stringify(rules),
    },
  )).json() as ResponseBody;
  //console.log(filterRes);
  return res;
}

/**
 * Retrieve your stream's rules.
 * You can get a specific rule by specifying the id.
 * https://developer.twitter.com/en/docs/twitter-api/tweets/filtered-stream/api-reference/get-tweets-search-stream-rules
 * @export
 * @param {string} bearerToken
 * @param {string} [ids]
 * @return {ResponseBody}
 */
export async function getRules(bearerToken: string, ids?: string) {
  const url = getUrl(endpoints.api_v2.filterd_stream.rules);
  if (ids) {
    url.searchParams.append("ids", ids);
  }
  const res = await (await fetch(
    url.toString(),
    {
      headers: new Headers({
        "Authorization": `Bearer ${bearerToken}`,
      }),
    },
  )).json() as ResponseBody;
  return res;
}

/**
 * Connect to the stream.
 * https://developer.twitter.com/en/docs/twitter-api/tweets/filtered-stream/api-reference/get-tweets-search-stream
 * @export
 * @param {string} bearerToken
 * @param {(data: StreamTweet) => void} callback
 * @param {StreamParam} [option]
 */
export async function connectStream(
  bearerToken: string,
  callback: (data: StreamTweet) => void,
  option?: StreamParam,
) {
  const reconnect = (error: string, sec: number) => {
    console.log(error, `Reconnect after ${sec} sec...`);
    setTimeout(
      () => connectStream(arguments[0], arguments[1], arguments[2]),
      sec * 1000,
    );
  };
  const url = getUrl(endpoints.api_v2.filterd_stream.connect);
  addParamOption(url, option);
  //console.log(url.toString());
  const res = await fetch(
    url,
    {
      headers: new Headers({
        "Authorization": `Bearer ${bearerToken}`,
      }),
    },
  );

  console.log("Connecting...");
  if (res.status === 200) {
    console.log("Connected");
    if (res.body) {
      const reconnect = (error: string, sec: number) => {
        console.log(error, `Reconnect after ${sec} sec...`);
        setTimeout(
          () => connectStream(arguments[0], arguments[1], arguments[2]),
          sec * 1000,
        );
      };
      try {
        for await (const a of res.body) {
          try {
            const data = new TextDecoder().decode(a);
            if (data === "\r\n") continue;
            const json = JSON.parse(data) as StreamRes;
            if (json.errors) {
              json.errors.forEach((e) => {
                console.log("Error", e.detail);
              });
              reconnect("Receive Error.", 10);
              return;
            } else {
              //console.log(JSON.parse(data));

              setTimeout(() => callback(json as StreamTweet), 0);
            }
          } catch (e) {
            if (e instanceof SyntaxError) continue;
            console.log(e);
            return;
          }
        }
      } catch (e) {
        if (e instanceof Error) {
          reconnect("Response body error", 0);
          return;
        } else console.log(e);
      }
    }
  } else {
    if (res.status === 503) {
      reconnect("503 Service Unavaliable.", 10);
      return;
    } else {
      console.log("Code:" + res.status, res, await res.json());
      throw Error("Code:" + res.status);
    }
  }
}
