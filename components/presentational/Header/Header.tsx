import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { NextRouter, useRouter } from "next/router";
import { signOut } from "next-auth/react";
import { useEffect } from "react";
import { Session } from "next-auth";

const Header = () => {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    const tokens = session?.tokens as any;
    if (tokens?.accessToken && tokens?.refreshToken) {
      localStorage.setItem("ACCESS_TOKEN", tokens.accessToken);
      localStorage.setItem("REFRESH_TOKEN", tokens.refreshToken);
    } else {
      localStorage.removeItem("ACCESS_TOKEN");
      localStorage.removeItem("REFRESH_TOKEN");
    }
  }, [session?.tokens]);

  return (
    <div className="sticky top-0 w-full z-[100] flex justify-center bg-[#212121]">
      <header className="h-16 w-[1200px] px-4 flex">
        <div className="flex-1">
          <Image
            src="/icons/the-crew.svg"
            alt="logo.svg"
            height="60px"
            width="70px"
            className="cursor-pointer"
            onClick={() => {
              router.push("/");
            }}
          />
        </div>
        <div className="flex justify-start items-center gap-x-3">
          <Link href="/" passHref={true} prefetch={false}>
            <a className="text-base text-white font-bold">
              REGISTER AS PROFESSIONAL
            </a>
          </Link>
          <VerticalDivider />
          {session?.user ? (
            <>
              <Link href="/orders" passHref={true}>
                <a className="text-base text-white font-bold">ORDERS</a>
              </Link>
              <VerticalDivider />
              <Avatar session={session} router={router} />
            </>
          ) : (
            <Link href="/login" passHref={true}>
              <a className="text-base text-white font-bold">LOGIN</a>
            </Link>
          )}
        </div>
      </header>
    </div>
  );
};

const VerticalDivider = () => {
  return <div className="h-4 w-[1px] bg-[#fff]"></div>;
};

const Avatar = ({
  session,
  router,
}: {
  session: Session;
  router: NextRouter;
}) => {
  return (
    <>
      <div
        className="relative cursor-pointer avatar-md"
        title={`${session.user!.name!} | Click to Logout`}
      >
        <Image
          src={session.user!.image!}
          alt="user avatar"
          layout="fill"
          objectFit="cover"
          className="rounded-full"
          onClick={async () => {
            try {
              await fetch(`api/auth/logout`);
              localStorage.removeItem("ACCESS_TOKEN");
              localStorage.removeItem("REFRESH_TOKEN");
              signOut();
            } catch (error) {
              alert("Failed to logout");
            }
          }}
        />
      </div>
    </>
  );
};

export default Header;
