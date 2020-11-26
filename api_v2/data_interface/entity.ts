interface EntityBase {
  start: number;
  end: number;
}

interface AnnotationEntity extends EntityBase {
  provavility: number;
  type: string;
  normalized_text: string;
}

interface UrlEntity extends EntityBase {
  url: string;
  expanded_url: string;
  display_url: string;
  unwound_url: string;
}

interface HashtagEntity extends EntityBase {
  tag: string;
}

interface MentionEntity extends EntityBase {
  username: number;
}

interface CashtagEntity extends EntityBase {
  tag: string;
}

export interface Entities {
  annotations?: AnnotationEntity[];
  urls?: UrlEntity[];
  hashtags?: HashtagEntity[];
  mentions?: MentionEntity[];
  cashtags?: CashtagEntity[];
}
