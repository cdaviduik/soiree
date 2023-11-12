export interface BaseEvent {
  name: string;
  // TODO: make date optional
  startDate: Date;
  location: string;
  description: string;
}

export interface EventDetails extends BaseEvent {
  id: string;
  created: Date;
  updated: Date;
  createdBy: string;
  updatedBy: string;
}
