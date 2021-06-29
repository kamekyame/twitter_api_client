import { Entities } from "./entity.ts";
import { ContextAnnotation } from "./annotation.ts";
import { WithHeld } from "./withheld.ts";
import { UserObject } from "./user.ts";
import { PlaceObject } from "./place.ts";
import { MediaObject } from "./media.ts";
import { PollObject } from "./poll.ts";

export interface TweetObject {
  id: string;
  text: string;
  attachments?: {
    media_keys?: string;
    poll_ids?: string;
  };
  author_id?: string;
  context_annotations?: ContextAnnotation[];
  conversation_id?: string;
  created_at?: string;
  in_reply_to_user_id?: string;
  referenced_tweets?: {
    type: "retweeted" | "quoted" | "replied_to";
    id: string;
  }[];
  geo?: {
    coordinates?: {
      type: string;
      coordinates: number[];
    };
    place_id: string;
  };
  entities?: Entities;
  withheld?: WithHeld;
  public_metrics?: {
    retweet_count: number;
    reply_count: number;
    like_count: number;
    quote_count: number;
  };
  non_public_metrics?: { // Requid OAuth1.0a
    impression_count: number;
    url_link_clicks: number;
  };
  organic_matrics?: {
    impression_count: number; // Requid OAuth1.0a
    url_link_clicks: number; // Requid OAuth1.0a
    user_profile_clicks: number; // Requid OAuth1.0a
    retweet_count: number;
    reply_count: number;
    like_count: number;
  };
  promoted_metrics?: {
    impression_count: number; // Requid OAuth1.0a
    url_link_clicks: number; // Requid OAuth1.0a
    user_profile_clicks: number; // Requid OAuth1.0a
    retweet_count: number;
    reply_count: number;
    like_count: number;
  };
  possivly_sensitive?: boolean;
  lang?: string;
  source?: string;
  errors?: Object;
}

export interface IncludesObject {
  tweets?: TweetObject[];
  users?: UserObject[];
  places?: PlaceObject[];
  media?: MediaObject[];
  polls?: PollObject;
}
