import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BiMessageRoundedDots } from "react-icons/bi";

const NavBar = () => {
  const [color, setColor] = useState("yellow");
  const [isActive, setIsActive] = useState(1);

  const router = useRouter();
  useEffect(() => {
    if (router.pathname === "/users") {
      setColor("green");
    } else if (router.pathname === "/") {
      setColor("#60a5fa");
    }
  }, [router]);

  const pushRoute = () => {
    router.push("/inbox");
  };

  const route = [
    { id: 1, path: "/", name: "HOME" },
    { id: 2, path: "/users", name: "USERS" },
    { id: 3, path: "/chat", name: "CHAT" }
  ];
  console.log(isActive);

  return (
    <div className="nav mb-[0%]">
      <nav style={{ backgroundColor: color }} className={`top-0 left-0 z-20 w-ful  border-gray-200  px-2 py-2.5  dark:bg-[#ffffff] sm:px-4`}>
        <div className="container mx-auto flex flex-wrap items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" width={50} height={100} />
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-black">Communication Platform</span>
          </Link>
          {/* <div>
            <button>Sign In</button>
          </div> */}
          <div onClick={pushRoute} className=" bg- flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-gray-400 text-center md:order-2">
            <BiMessageRoundedDots className=" text-3xl text-white " />
          </div>
          <div className="hidden w-full items-center justify-between md:order-1 md:flex md:w-auto" id="navbar-sticky">
            <ul className="mt-4 flex flex-col rounded-lg border  0 p-4  md:mt-0 md:flex-row md:space-x-8 md:border-0  md:text-sm md:font-medium transition ">
              {route.map(({ id, name, path }) => (
                <div key={id}>
                  <li onClick={() => setIsActive(id)} className={isActive === id ? " text-black font-bold hover" : "text-white"}>
                    <Link href={path}>{name}</Link>
                  </li>
                </div>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
