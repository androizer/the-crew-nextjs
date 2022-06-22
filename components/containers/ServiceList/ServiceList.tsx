import { PropsWithChildren } from "react";
import { ServiceRequest } from "../../../models";
import { ServiceCard } from "../../presentational";

interface ServiceListProps {
  data: ServiceRequest[];
}

const ServiceList = (props: PropsWithChildren<ServiceListProps>) => {
  return (
    <div className="flex flex-wrap flex-1 gap-6 p-4 justify-center">
      {props.data.map((item, index) => {
        return <ServiceCard key={index} service={item} />;
      })}
    </div>
  );
};

export default ServiceList;
