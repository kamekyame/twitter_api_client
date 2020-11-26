const host = "https://api.twitter.com";

export const endpoints = {
  outh2: {
    getToken: "/oauth2/token",
  },
  api_v1: {
    tweets: {
      update: "/1.1/statuses/update.json",
    },
  },
  api_v2: {
    lookup: "/2/tweets",
    filterd_stream: {
      rules: "/2/tweets/search/stream/rules",
      connect: "/2/tweets/search/stream",
    },
  },
};

export const getUrl = (endPoint: string) => new URL(endPoint, host);

export function addParamOption(url: URL, param: Object): URL {
  for (const [key, value] of Object.entries(param)) {
    const types: string[] = [];

    if (value instanceof Object) {
      for (const [k, v] of Object.entries(value)) {
        if (typeof v === "boolean") {
          if (v == true) {
            types.push(k);
          }
        } else if (typeof v === "string") {
          types.push(v);
        }
      }
      url.searchParams.set(key, types.join(","));
    } else {
      url.searchParams.set(key, value);
    }
  }

  return url;
}
