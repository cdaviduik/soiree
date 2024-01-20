export interface BaseEvent {
  name: string;
  startDate: Date;
  location: string;
  description: string;
  imageID?: string;
  imageURL?: string;
}

export interface EventDetails extends BaseEvent {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
  isCreatedByUser: boolean;

  attendeeIds: string[];
  interestedIds: string[];
  notInterestedIds: string[];
}
