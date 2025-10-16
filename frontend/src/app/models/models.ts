export interface Event {
  eventId: string;
  eventName: string;
  departmentId: string;
  posterPath: string;
  rulebookPath: string;
  coordinators: { [key: string]: string };
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  username: string;
  role: string;
}

export interface EventResult {
  id?: number;
  coordinatorId: string;
  eventId: string;
  winnersDept: string;
  runnersDept: string;
  submittedAt?: Date;
}

export interface Notification {
  id?: number;
  coordinatorId: string;
  eventId: string;
  message: string;
  status: string;
  createdAt?: Date;
}

export interface ChampionsCount {
  deptId: string;
  deptName: string;
  count: number;
}

