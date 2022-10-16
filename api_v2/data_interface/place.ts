export interface PlaceObject {
  full_name: string;
  id: string;
  contained_within?: [];
  country?: string;
  contry_code?: string;
  geo?: {
    type: string;
    bbox: number[];
    // deno-lint-ignore no-explicit-any
    properties: any;
  };
  name?: string;
  place_type?: string;
}
