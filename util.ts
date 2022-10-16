let host = "https://api.twitter.com";

export const setHost = (url: string) => {
  host = url;
};

export const endpoints = {
  outh2: {
    getToken: "/oauth2/token",
  },
  api_v1: {
    tweets: {
      update: "/1.1/statuses/update.json",
      retweet(id: string) {
        return `/1.1/statuses/retweet/${id}.json`;
      },
      home_timeline: "/1.1/statuses/home_timeline.json",
      search(
        premium?: { product: "30day" | "fullarchive"; label: string },
      ) {
        if (premium) {
          return `/1.1/tweets/search/${premium.product}/${premium.label}.json`;
        } else {
          return `/1.1/tweets/search/tweets.json`;
        }
      },
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

// deno-lint-ignore ban-types
export function addParamOption(url: URL, param: Object = {}): URL {
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
