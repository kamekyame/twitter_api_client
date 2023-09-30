import { addParamOption, endpoints, getUrl } from "../../util.ts";

import { SelectTweetFields, TweetObject } from "../data_interface/tweet.ts";
import { SelectUserFields, UserObject } from "../data_interface/user.ts";

interface UsersMeParam {
  "expansions"?: {
    "pinned_tweet_id"?: boolean;
  };
  "tweet.fields"?: SelectTweetFields;
  "user.fields"?: SelectUserFields;
}

interface UsersMeResponse {
  data: UserObject;
  includes?: {
    tweets?: TweetObject[];
  };
}

/**
 * Returns information about an authorized user.
 *
 * https://developer.twitter.com/en/docs/twitter-api/users/lookup/api-reference/get-users-me
 */
export async function getUsersMe(auth: string, param: UsersMeParam) {
  const url = getUrl(endpoints.api_v2.users.me);
  //url.searchParams.set("ids", param.ids);
  addParamOption(url, param);
  console.log(url);
  const res = await (await fetch(
    url.toString(),
    {
      headers: new Headers({
        "Authorization": `Bearer ${auth}`,
      }),
    },
  )).json();

  return res as UsersMeResponse;
}
