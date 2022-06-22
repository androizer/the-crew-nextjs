import { ServiceRequest } from "./service.model";

export class Review {
  id!: string;
  comment!: string;
  rating!: number;
  reviewerId!: string;
  service?: ServiceRequest;
  serviceId!: string;
  createdOn!: Date;
  modifiedOn!: Date;
  deletedOn!: Date;
  // reviewer?!: User;
}
