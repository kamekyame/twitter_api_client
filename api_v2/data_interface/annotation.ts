// https://developer.twitter.com/en/docs/twitter-api/annotations

export interface ContextAnnotation {
  domain: {
    id: string;
    name: string;
    discription: string;
  };
  entity: {
    id: string;
    name: string;
    discription?: string;
  };
}
