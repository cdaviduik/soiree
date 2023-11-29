export interface BaseEvent {
  name: string;
  startDate: Date;
  location: string;
  description: string;
}

export interface EventDetails extends BaseEvent {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
  isCreatedByUser: boolean;

  attendees: string[];
}
