import { useRouter } from "next/router";

const Error = () => {
  const router = useRouter();
  return (
    <div className="text-center mt-12">
      <h1 style={{ fontFamily: "arial" }} className="text-red-400 font-bold  ">
        USER NOT FOUND{" "}
      </h1>
      <h3 className="text-green-500 bg-black py-2 text-lg font-bold my-4"> Please ask admin to add you as a member.</h3>
      <button className=" mt-4 px-2 py-2 bg-yellow-300 rounded-md" onClick={() => router.push("/")}>
        Go Home
      </button>
    </div>
  );
};

export default Error;
