import { getSession, signIn } from "next-auth/react";
import Image from "next/image";
import { HTMLAttributes, PropsWithChildren, useEffect } from "react";

import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";

const LoginPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  return (
    <div className="flex flex-1 relative">
      <div className="h-full w-full relative">
        <Image
          src="/images/login/banner.jpg"
          alt="login-banner"
          layout="fill"
          objectFit="cover"
          priority={true}
        />
      </div>
      <div className="absolute top-0 w-full h-full flex flex-row-reverse bg-[#00000070] bg-blend-darken">
        {/* Login container */}
        <div className="flex w-[50%] justify-end items-center mr-14">
          <div className="bg-white p-4 rounded shadow-lg">
            <GoogleLoginButton
              onClick={async () => {
                signIn("google");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const GoogleLoginButton = ({
  children,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLButtonElement>>) => {
  return (
    <button
      {...props}
      type="button"
      className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55"
      data-testid="google-login"
    >
      <svg
        className="w-4 h-4 mr-2 -ml-1"
        aria-hidden="true"
        focusable="false"
        data-prefix="fab"
        data-icon="google"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 488 512"
      >
        <path
          fill="currentColor"
          d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
        ></path>
      </svg>
      Sign in with Google
    </button>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);
  if (session?.user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}

export default LoginPage;
