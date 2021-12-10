export enum RouteNames {
  PARTICIPANT_CARD = 'participant-card',
}

export type RoutesDictionary = {
  [K in keyof typeof RouteNames]: string;
}
