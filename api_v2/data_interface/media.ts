export interface MediaObject {
  media_key: string;
  type: string;
  duration_ms?: number;
  height?: number;
  non_public_metrics?: {
    playback_0_count: number;
    playback_25_count: number;
    playback_50_count: number;
    playback_75_count: number;
    playback_100_count: number;
  }; //need oauth1.0a
  organic_metrics?: {
    playback_0_count: number;
    playback_25_count: number;
    playback_50_count: number;
    playback_75_count: number;
    playback_100_count: number;
    view_count: number;
  }; //need oauth1.0a
  preview_image_url?: string;
  url?: string;
  promoted_metrics?: {
    playback_0_count: number;
    playback_25_count: number;
    playback_50_count: number;
    playback_75_count: number;
    playback_100_count: number;
    view_count: number;
  }; //need oauth1.0a
  public_metrics?: {
    view_count: number;
  };
  width?: number;
}
