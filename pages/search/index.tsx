import { camelCase, startCase } from "lodash-es";
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
  NextPage,
} from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { ChangeEvent } from "react";
import { Fragment } from "react";
import useSWR from "swr";

import { Select } from "../../components/common";
import { ServiceList } from "../../components/containers";
import { ServiceLocation, ServiceType } from "../../enums";
import style from "./search.module.css";

const serviceTypeArr = [
  {
    key: "hammer",
    ext: "png",
    value: ServiceType.CARPENTERING,
  },
  {
    key: "pestControl",
    ext: "png",
    value: ServiceType.CLEANING,
  },
  {
    key: "electricians",
    ext: "jpeg",
    value: ServiceType.ELECTRICIAN,
  },
  {
    key: "homePainting",
    ext: "png",
    value: ServiceType.PAINT,
  },
  {
    key: "plumbing",
    ext: "png",
    value: ServiceType.PLUMBING,
  },
  {
    key: "salonForWomen",
    ext: "png",
    value: ServiceType.SALON_FEMALE,
  },
  {
    key: "salonForMen",
    ext: "png",
    value: ServiceType.SALON_MALE,
  },
];

const SearchServices: NextPage = () => {
  const router = useRouter();
  const [serviceType, setServiceType] = useState<ServiceType>();
  const { data: { data } = {}, error } = useSWR(
    serviceType
      ? `http://localhost:3001/api/services?filter=type||$in||{${serviceType}}`
      : null
  );

  const onServiceTypeChange = (type: ServiceType) => {
    setServiceType(type);
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-x-hidden">
      <Head>
        <title>Services based in {router.query.city}</title>
      </Head>
      <main className="flex flex-col flex-1 relative">
        {/* BG Image container */}
        <div className={style.backgroundImageContainer}>
          <div className="flex flex-col items-center gap-y-8">
            <h2 className="text-white text-6xl font-bold">
              Home services on demand
            </h2>
            <div className="flex justify-center gap-x-4 w-full">
              <Select value={router.query.city} readOnly className="flex-1">
                {Object.values(ServiceLocation).map((city, index) => {
                  return <option key={index}>{city}</option>;
                })}
              </Select>
              <Select
                value={serviceType}
                onChange={(evt: ChangeEvent<HTMLSelectElement>) =>
                  onServiceTypeChange(evt.target.value as ServiceType)
                }
                className="w-[500px]"
              >
                {Object.values(ServiceType).map((type, index) => {
                  return (
                    <Fragment key={index}>
                      {!index && <option>Select a service type</option>}
                      <option value={type}>{startCase(camelCase(type))}</option>
                    </Fragment>
                  );
                })}
              </Select>
            </div>
          </div>
        </div>
        {/* Service types grid card  */}
        <div className="flex flex-1 w-full p-2 relative">
          <div className="rounded w-[50%] p-2 flex flex-wrap justify-center items-center bg-white mt-[-125px] mb-[50px] mx-auto shadow-lg">
            {serviceTypeArr.map((obj, index) => {
              return (
                <span
                  key={index}
                  className={`w-[150px] h-auto inline-flex flex-col p-4 cursor-pointer hover:bg-gray-300 hover:rounded ${
                    obj.value === serviceType && `bg-gray-400`
                  }`}
                  onClick={() => onServiceTypeChange(obj.value)}
                >
                  <Image
                    src={`/images/search/${obj.key}.${obj.ext}`}
                    alt={obj.key}
                    height="48"
                    width="48"
                    objectFit="contain"
                  />
                  <span className="text-center">
                    {startCase(camelCase(obj.value))}
                  </span>
                </span>
              );
            })}
          </div>
        </div>
        {/* Search services list */}
        {serviceType && <ServiceList data={data ?? []} />}
      </main>
    </div>
  );
};

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<{}>> {
  return {
    props: {},
  };
}

export default SearchServices;
