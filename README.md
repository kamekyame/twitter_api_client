# Twitter API client for Deno(未完成)

Twitter APIをDenoから利用するためのクライアントです。

## 注意点
- すべてTypeScriptで書かれているためJavascriptでは利用できません。
- 実装されていない機能、動作が不完全な機能等あります。
    - issue,PR等お待ちしております。

## 実装済みの機能
- Twitter API v1.1
    - Tweets
        - statuses/update
- Twitter API v2(Early Access)
    - Tweets
        - Lookup
        - Filtered stream

※ 未実装の機能の中で欲しいものがありましたら、issueで投げてくだされば優先して作ります。

※ 実装済みの機能についても、不具合がありましたらissueお願いします。

## 使用方法
- [Twitter API v1.1](./api_v1/README.md)
- [Twitter API v2(Early Access)](./api_v2/README.md)
- [Authentication](./auth/README.md)