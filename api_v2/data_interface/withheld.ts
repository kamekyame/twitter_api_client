export const enum WithheldScope {
  tweet,
  user,
}

export interface WithHeld {
  copyright?: boolean;
  country_codes: [];
  scope: WithheldScope;
}
