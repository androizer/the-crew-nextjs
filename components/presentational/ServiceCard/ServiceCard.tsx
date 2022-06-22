import { StarIcon } from "@heroicons/react/solid";
import Image from "next/image";
import { useCallback } from "react";
import { PropsWithChildren } from "react";

import { ServiceType } from "../../../enums";
import { ServiceRequest } from "../../../models";

interface ServiceCardProps {
  service: ServiceRequest;
}

const serviceToImgMap: Record<ServiceType, string> = {
  [ServiceType.CARPENTERING]: "/images/services/carpenter.jpg",
  [ServiceType.CLEANING]: "/images/services/pest-control.jpg",
  [ServiceType.ELECTRICIAN]: "/images/services/electrician.jpg",
  [ServiceType.PAINT]: "/images/services/painter.jpg",
  [ServiceType.PLUMBING]: "/images/services/plumber.jpg",
  [ServiceType.SALON_FEMALE]: "/images/services/salon-women.jpg",
  [ServiceType.SALON_MALE]: "/images/services/salon-men.jpg",
};

const ServiceCard = ({ service }: PropsWithChildren<ServiceCardProps>) => {
  const getRatings = useCallback(() => {
    if (service.reviews?.length) {
      return (
        service.reviews.reduce((acc, item) => {
          acc += item.rating;
          return acc;
        }, 0) / service.reviewIds.length
      );
    }
    return 0;
  }, [service]);

  return (
    <div className="w-[350px] h-[500px] shadow-lg rounded flex flex-col">
      <div className="h-[250px] w-auto relative">
        <Image
          src={serviceToImgMap[service.type[0]]}
          alt={service.type[0]}
          layout="fill"
          objectFit="cover"
        />
        <span className="absolute bottom-[-16px] right-2">
          <Image
            className="rounded-[50%]"
            src="/images/services/avatar.jpeg"
            alt="avatar.jpeg"
            height="75"
            width="75"
            objectFit="cover"
          />
        </span>
      </div>
      <div className="flex flex-col flex-1 p-2 gap-y-2">
        <div className="text-xl font-bold">{service.title}</div>
        <div className="flex justify-between items-center">
          <span className="inline-flex gap-x-1 items-center">
            <StarIcon className="h-6 w-6 text-green-500 inline-block" />
            <span className="text-green-500 font-bold text-lg">
              {getRatings()}
            </span>
          </span>
          <span className="text-gray-500">
            {service.reviewIds.length} ratings
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="inline-flex gap-x-1 items-center">
            <span className="font-bold">₹</span>
            <span>{service.price}</span>
          </span>
        </div>
        <div className="whitespace-pre-line text-sm tracking-wide">{service.description}</div>
      </div>
    </div>
  );
};

export default ServiceCard;
