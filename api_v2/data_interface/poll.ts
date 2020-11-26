export interface PollObject {
  id: string;
  options: PollOption[];
  duration_minutes?: number;
  end_datetime?: Date;
  voting_status?: string;
}

interface PollOption {
  position: number;
  label: string;
  votes: number;
}
