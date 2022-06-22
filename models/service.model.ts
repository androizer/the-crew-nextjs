import { ServiceType } from "../enums";
import { Review } from "./review.model";

export class ServiceRequest {
  id!: string;
  type!: ServiceType[];
  title!: string;
  description!: string;
  price!: number;
  included!: string[];
  excluded!: string[];
  providerId!: string;
  reviewIds!: string[];
  createdOn!: Date;
  modifiedOn!: Date;
  deletedOn!: Date;
  reviews?: Review[];
  // provider!: User;
}
