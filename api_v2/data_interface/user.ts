import { Entities } from "./entity.ts";
import { WithHeld } from "./withheld.ts";

export interface UserObject {
  id: string;
  name: string;
  username: string;
  created_at?: Date;
  description?: string;
  entities?: Entities;
  location?: string;
  pinned_tweet_id?: string;
  profile_image_url: string;
  protected?: boolean;
  public_metrics?: {
    followers_count: number;
    following_count: number;
    tweet_count: number;
    listed_count: number;
  };
  url?: string;
  verified?: boolean;
  withheld?: WithHeld;
}
