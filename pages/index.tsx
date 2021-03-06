import type {
  GetStaticPropsContext,
  GetStaticPropsResult,
  NextPage,
} from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { ChangeEvent } from "react";
import { Select } from "../components/common";
import { ServiceLocation } from "../enums";
import styles from "../styles/Home.module.css";

const whyTheCrewContent = [
  {
    img: "/images/home/price.png",
    heading: "Transparent pricing",
    desc: "See fixed prices before you book. No hidden charges.",
  },
  {
    img: "/images/home/person.png",
    heading: "Experts only",
    desc: "Our professionals are well trained and have on-job expertise.",
  },
  {
    img: "/images/home/equipment.png",
    heading: "Fully equipped",
    desc: "We bring everything needed to get the job done well.",
  },
];

const Home: NextPage = () => {
  const router = useRouter();

  const onCityChange = (evt: ChangeEvent<HTMLSelectElement>) => {
    const type = evt.target.value;
    router.push(`/search?city=${type}`);
  };

  return (
    <div className="flex h-screen flex-col">
      <Head>
        <title>The Crew</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.bannerContainer}>
        <div className={styles.titleRootContainer}>
          <div className="text-4xl font-bold">THE CREW</div>
          <div className="text-2xl font-bold">
            Quality home services, on demand
          </div>
          <div className="text-xl text-gray-300">
            Experienced & hand-picked professionals to serve you at your
            doorstep
          </div>
          <div className="pt-12 w-full flex flex-col gap-y-8">
            <div className="text-white">Where do you need a service?</div>
            <Select onChange={onCityChange}>
              {Object.values(ServiceLocation).map((location, index) => {
                return (
                  <Fragment key={index}>
                    {index === 0 && <option>Select a city</option>}
                    <option value={location}>{location}</option>
                  </Fragment>
                );
              })}
            </Select>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-y-6 pt-4 pb-8">
        <div className="text-black text-5xl font-bold mx-auto">
          Why The Crew?
        </div>
        <div className="flex justify-evenly">
          <div className="flex flex-col gap-y-4">
            {whyTheCrewContent.map((content, index) => {
              return (
                <div key={index} className="flex relative gap-x-2">
                  <Image
                    src={content.img}
                    alt={content.img}
                    height="72"
                    width="72"
                  />
                  <div className="flex flex-col gap-y-1 justify-center">
                    <span className="font-bold">{content.heading}</span>
                    <span>{content.desc}</span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex relative gap-x-4">
            <Image
              src="/images/home/assured.png"
              alt="assured.png"
              height="100"
              width="100"
              objectFit="contain"
            />
            <div className="flex flex-col gap-y-1 justify-center">
              <span className="text-2xl font-bold">100% Quality Assured</span>
              <span>If you don???t love our service, we will make it right.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps(
  context: GetStaticPropsContext
): Promise<GetStaticPropsResult<{}>> {
  return { props: {} };
}

export default Home;
