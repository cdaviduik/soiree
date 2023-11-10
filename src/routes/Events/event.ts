export interface BaseEvent {
  name: string;
  description: string;
  // TODO: make date optional
  startDate: Date;
}

export interface EventDetails extends BaseEvent {
  id: string;
  created: Date;
  updated: Date;
  createdBy: string;
  updatedBy: string;
}
