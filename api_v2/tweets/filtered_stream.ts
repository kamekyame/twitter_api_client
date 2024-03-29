import { addParamOption, endpoints, getUrl } from "../../util.ts";

import { IncludesObject, TweetObject } from "../data_interface/tweet.ts";
import { DisconnectedError, StreamErrorType } from "../util.ts";

const INITIAL_BACKOFF_TIME = 60 * 1000;

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

interface FilteredStreamRule {
  tag?: string;
  value: string;
  id: string;
}

// Specify both -> error : "Exactly one of either 'add' or 'delete' must be specified."
export type FilteredStreamRuleReq =
  | { add: Omit<FilteredStreamRule, "id">[]; delete?: undefined }
  | { add?: undefined; delete: { ids: string[] } };

export interface FilteredStreamRuleRes {
  data?: FilteredStreamRule[];
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
  errors?: StreamErrorType[];
}

/**
 * Add or delete rules from your stream.
 * https://developer.twitter.com/en/docs/twitter-api/tweets/filtered-stream/api-reference/post-tweets-search-stream-rules
 * @export
 * @param {string} bearerToken
 * @param {FilteredStreamRuleReq} rules
 * @param {boolean} [dry_run]
 * @return {FilteredStreamRuleRes}
 */
export async function changeRules(
  bearerToken: string,
  rules: FilteredStreamRuleReq,
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
  )).json() as FilteredStreamRuleRes;
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
 * @return {FilteredStreamRuleRes}
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
  )).json() as FilteredStreamRuleRes;
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
export function connectStream(
  bearerToken: string,
  callback: (data: StreamTweet) => void,
  option?: StreamParam,
) {
  return connectStreamBase(bearerToken, callback, option, {
    backoffTime: INITIAL_BACKOFF_TIME,
  });
}

export function connectStreamBase(
  bearerToken: string,
  callback: (data: StreamTweet) => void,
  option: StreamParam | undefined,
  rawOption: {
    backoffTime: number;
  },
) {
  const ac = new AbortController();

  const reconnect = (error: string, sec_: number) => {
    const sec = Math.max(1, sec_);
    console.log(error, `Reconnect after ${sec} sec...`);
    ac.abort();
    setTimeout(
      () =>
        connectStreamBase(arguments[0], arguments[1], arguments[2], {
          backoffTime: rawOption.backoffTime * 2,
        }),
      sec * 1000,
    );
  };

  setTimeout(async () => {
    const url = getUrl(endpoints.api_v2.filterd_stream.connect);
    addParamOption(url, option);
    //console.log(url.toString());
    console.log("Connecting...");
    const res = await fetch(
      url,
      {
        headers: new Headers({
          "Authorization": `Bearer ${bearerToken}`,
        }),
        signal: ac.signal,
      },
    );

    if (res.status === 200) {
      console.log("Connected");
      if (res.body) {
        try {
          for await (const a of res.body) {
            const data = new TextDecoder().decode(a);
            if (data === "\r\n") continue;

            let json: StreamRes;
            try {
              json = JSON.parse(data) as StreamRes;
            } catch {
              continue;
            }

            if (json.errors) {
              json.errors.forEach((e) => {
                throw new DisconnectedError(e);
              });
            } else {
              setTimeout(() => callback(json as StreamTweet), 0);
            }
          }
        } catch (e) {
          if (e instanceof DOMException && e.name === "AbortError") {
            return;
          }
          console.error("for await catch", e);
          if (e instanceof Error) {
            // Once an established connection drops, attempt to reconnect immediately.
            // https://developer.twitter.com/en/docs/twitter-api/tweets/filtered-stream/integrate/handling-disconnections
            reconnect("Response body error.", 0);
            return;
          } // else console.log(e);
        }
      }
    } else {
      if (res.status === 503) {
        reconnect("503 Service Unavaliable.", 10);
        return;
      } else if (res.status === 429) {
        const reset = res.headers.get("x-rate-limit-reset");
        const remaining = res.headers.get("x-rate-limit-remaining");
        // console.log(`429 error : ${reset}, ${limit}, ${remaining}`);

        let backoffTime = rawOption.backoffTime;
        if (reset && remaining) {
          if (parseInt(remaining) <= 0) {
            const resetDate = new Date(parseInt(reset) * 1000);
            backoffTime = resetDate.getTime() - Date.now() + 60 * 1000;
          }
        }
        reconnect("429 Too Many Requests.", backoffTime / 1000);
      } else {
        console.error("Code:" + res.status, res, await res.json());
        throw Error("Code:" + res.status);
      }
    }
  }, 0);
  return () => {
    ac.abort();
  };
}
