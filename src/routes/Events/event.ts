export interface BaseEvent {
  name: string;
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
