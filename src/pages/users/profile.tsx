import { useSession } from "next-auth/react";

function Profile() {
  const { data: session }: any = useSession();
  return (
    <div className={`grid gap-4 `}>
      <section className="p-6 bg-gray-800 text-gray-50">
        <p className="text-2xl">
          Role: <span className="text-3xl text-green-500">Admin</span>{" "}
        </p>
        <form
          className="container flex flex-col mx-auto space-y-12 ng-untouched ng-pristine ng-valid"
          // onSubmit={formSubmitFunction}
        >
          <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
            <div className="col-span-full">
              <div className="flex justify-center items-center flex-col gap-2">
                {/* <Image
                  src={session?.user?.image || "https://img.freepik.com/free-icon/user_318-159711.jpg"}
                  alt="Picture of the author"
                  width={120}
                  height={120}
                  quality={100}
                /> */}
                <img src={session?.user?.image || null} className="mr-3 h-32 rounded-full " alt="Flowbite Logo" />
              </div>
            </div>
            <div className="col-span-full sm:col-span-3">
              <label htmlFor="firstName" className="text-sm">
                Name
              </label>
              <input
                id="firstName"
                value={session?.user?.name}
                name="firstName"
                type="text"
                placeholder="First name"
                className="p-2 w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900 dark:text-white"
                required
              />
            </div>
            <div className="col-span-full sm:col-span-3">
              <label htmlFor="lastName" className="text-sm">
                Last name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Last name"
                className="p-2 w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div className="col-span-full sm:col-span-3">
              <label htmlFor="email" className="text-sm">
                Email
              </label>
              <input
                id="email"
                name="email"
                value={session?.user?.email}
                type="email"
                placeholder="Email"
                className="p-2 w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900 dark:text-white"
                disabled
              />
            </div>
            <div className="col-span-full sm:col-span-3">
              <label htmlFor="age" className="text-sm">
                Age
              </label>
              <input
                type="date"
                name="age"
                placeholder="age"
                className="p-2 w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900 dark:text-white"
                required
              />
            </div>
            <div className="col-span-full">
              <label htmlFor="address" className="text-sm">
                Address
              </label>
              <input
                id="address"
                name="address"
                type="text"
                placeholder=""
                className="p-2 w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900 dark:text-white"
                required
              />
            </div>
            <div className="col-span-full sm:col-span-2">
              <label htmlFor="number" className="text-sm">
                Number
              </label>
              <input
                id="number"
                name="number"
                type="number"
                placeholder="+8800---"
                className="p-2 w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900 dark:text-white"
                required
              />
            </div>
            <div className="col-span-full sm:col-span-2">
              <label htmlFor="state" className="text-sm">
                Area / State
              </label>
              <input
                id="state"
                name="state"
                type="text"
                placeholder=""
                className="p-2 w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900 dark:text-white"
                required
              />
            </div>

            <>
              <div className="col-span-full sm:col-span-2">
                <label htmlFor="license-number" className="text-sm">
                  License Number
                </label>
                <input
                  id="license-number"
                  name="license-number"
                  type="text"
                  placeholder=""
                  className="p-2 w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 border-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>
            </>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Profile;
