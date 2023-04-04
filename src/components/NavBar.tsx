/* eslint-disable @next/next/no-img-element */
import { getSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const NavBar = () => {
  const [color, setColor] = useState("#60a5fa");
  const [isActive, setIsActive] = useState(1);
  const [session, setSession] = useState("" as any);
  const router = useRouter();

  const getAccessToken = async () => {
    const sessionInfo = await getSession();
    setSession(sessionInfo);
  };

  useEffect(() => {
    getAccessToken();
  }, [router]);

  const route = [
    { id: 1, path: "/", name: "HOME" },
    { id: 2, path: "/users", name: "USERS" },
    { id: 3, path: "/inbox", name: "Inbox" },
  ];

  const routes = session ? route : route.slice(0, 1);

  return (
    <div className="nav mb-[0%]">
      <nav style={{ backgroundColor: color }} className={`top-0 left-0 z-20 w-ful  border-gray-200  px-2 py-2.5  dark:bg-[#ffffff] sm:px-4`}>
        <div className="container mx-auto flex flex-wrap items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" width={50} height={100} />
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-black">Communication Platform</span>
          </Link>
          <div className="hidden w-full items-center justify-between md:order-1 md:flex md:w-auto" id="navbar-sticky">
            <ul className="mt-4 flex flex-col rounded-lg border  0 p-4  md:mt-0 md:flex-row md:space-x-8 md:border-0  md:text-sm md:font-medium transition ">
              {session && (
                <div
                  onClick={() => router.push("/users/profile")}
                  className=" ml-4 flex  w-11  -mt-2 cursor-pointer items-center justify-center rounded-full bg-gray-400 text-center md:order-2"
                >
                  <img src={session?.user?.image} alt={session.user.name.split("")[0]} className="w-22 h-22 rounded-full " />
                </div>
              )}
              {routes.map(({ id, name, path }) => (
                <li key={id} onClick={() => setIsActive(id)} className={isActive === id ? " text-black font-bold hover" : "text-white"}>
                  <Link href={path}>{name}</Link>
                </li>
              ))}

              <li className="-mt-3">
                {session ? (
                  <button
                    onClick={() => signOut()}
                    className=" rounded-md  transition hover:bg-black text-black
                 hover:text-white bg-yellow-300 px-6 py-3"
                  >
                    Log Out
                  </button>
                ) : (
                  <button
                    onClick={() => signIn("google")}
                    className=" rounded-md  transition hover:bg-black text-black
                 hover:text-white bg-yellow-300 px-6 py-3"
                  >
                    Sign In
                  </button>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
