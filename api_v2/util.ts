export class DisconnectedError extends Error {
  constructor(e: StreamErrorType) {
    const message = `${e.detail} See ${e.type}`;
    super(message);
    this.name = "DisconnectedError";
  }
}

export type StreamErrorType = {
  title: string;
  disconnect_type: string;
  detail: string;
  type: string;
};
