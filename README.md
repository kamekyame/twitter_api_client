# Twitter API client for Deno

![](https://img.shields.io/github/v/release/kamekyame/twitter_api_client)

> ⚠️ **Important** This client is incomplete and breaking changes in the future.
> When you use this, beware of version updates.

## Features

- TypeScript support. (Arguments and return value for each endpoint has a type.)

## Usage

See each README.

- [Twitter API v1.1](./api_v1/README.md)
- [Twitter API v2(Early Access)](./api_v2/README.md)
- [Authentication](./auth/README.md)

## Implemented

- v1.1
  - Tweets
    - search/:product/:label (Premium)
    - statuses/update
    - statuses/retweet
    - statuses/home_timeline
- v2
  - Tweets
    - Lookup
    - Filtered stream

## Contribute

This client is imcomplete. So bug fix and new feature is welcome. Feel free to
issue, PR.

## License

[MIT](./LICENSE)
