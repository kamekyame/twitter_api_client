import { oAuth1Fetch, OAuth1Info } from "../deps.ts";

import { endpoints, getUrl } from "../util.ts";

type RequestTokenParam = {
  oauth_callback: string;
  x_auth_access_type?: "read" | "write";
};
type AuthenticationParam = {
  oauth_token: string;
  force_login?: boolean;
  screen_name?: string;
};
type AuthorizeParam = AuthenticationParam;
type AccessTokenParam = {
  oauth_token: string;
  oauth_verifier: string;
};

/**
 * **Step 1** of the 3-legged OAuth flow and Sign in with Twitter
 *
 * Allows a Consumer application to obtain an OAuth Request Token to request user authorization.
 *
 * https://developer.twitter.com/en/docs/authentication/api-reference/request_token
 */
export async function requestOAuthToken(
  auth: OAuth1Info,
  param: RequestTokenParam,
) {
  const url = getUrl(endpoints.oauth.requestToken);
  url.searchParams.set("oauth_callback", param.oauth_callback);
  if (param.x_auth_access_type) {
    url.searchParams.set("x_auth_access_type", param.x_auth_access_type);
  }
  const res = await oAuth1Fetch(auth, url);
  if (res.ok === false) {
    throw new Error("Failed to request OAuth token");
  }

  const bodyText = await res.text();
  const bodySp = new URLSearchParams(bodyText);
  const oauth_token = bodySp.get("oauth_token") as string;
  const oauth_token_secret = bodySp.get("oauth_token_secret") as string;
  const oauth_callback_confirmed =
    bodySp.get("oauth_callback_confirmed") === "true" ? true : false;

  return { oauth_token, oauth_token_secret, oauth_callback_confirmed };
}

/**
 * **Step 2** of the 3-legged OAuth flow and Sign in with Twitter
 *
 * Allows a Consumer application to use an OAuth Request Tokento request user authorization.
 *
 * https://developer.twitter.com/en/docs/authentication/api-reference/authenticate
 */
export function getAuthenticateUrl(param: AuthenticationParam) {
  const url = getUrl(endpoints.oauth.authenticate);
  url.searchParams.set("oauth_token", param.oauth_token);
  if (param.force_login !== undefined) {
    url.searchParams.set("force_login", param.force_login.toString());
  }
  if (param.screen_name) {
    url.searchParams.set("screen_name", param.screen_name);
  }

  return url;
}

/**
 * **Step 2** of the 3-legged OAuth flow and Sign in with Twitter
 *
 * Allows a Consumer application to use an OAuth Request Tokento request user authorization.
 *
 * https://developer.twitter.com/en/docs/authentication/api-reference/authorize
 */
export function getAuthorizeUrl(param: AuthorizeParam) {
  const url = getUrl(endpoints.oauth.authorize);
  url.searchParams.set("oauth_token", param.oauth_token);
  if (param.force_login !== undefined) {
    url.searchParams.set("force_login", param.force_login.toString());
  }
  if (param.screen_name) {
    url.searchParams.set("screen_name", param.screen_name);
  }

  return url;
}

/**
 * **Step 3** of the 3-legged OAuth flow and Sign in with Twitter
 *
 * Allows a Consumer application to exchange the OAuth Request Token for an OAuth Access Token.
 *
 * https://developer.twitter.com/en/docs/authentication/api-reference/access_token
 */
export async function getOAuthAccessToken(param: AccessTokenParam) {
  const url = getUrl(endpoints.oauth.accessToken);
  url.searchParams.set("oauth_token", param.oauth_token);
  url.searchParams.set("oauth_verifier", param.oauth_verifier);

  const res = await fetch(url);
  const a = new URLSearchParams(await res.text());
  const oauth_token = a.get("oauth_token") as string;
  const oauth_token_secret = a.get("oauth_token_secret") as string;
  const user_id = a.get("user_id") as string;
  const screen_name = a.get("screen_name") as string;

  return {
    oauth_token,
    oauth_token_secret,
    user_id,
    screen_name,
  };
}

export async function invalidateOAuthToken(auth: OAuth1Info) {
  const url = getUrl(endpoints.oauth.invalidateToken);
  const res = await oAuth1Fetch(auth, url);
  if (res.ok === false) {
    throw new Error("invalidateToken failed");
  }
}
