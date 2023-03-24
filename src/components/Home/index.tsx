const Home = () => {
  return (
    <div className=" bg-blue-400 min-h-screen">
      <div className="grid grid-cols-12 ">
        <div className=" col-span-12 sm:col-span-6 md:col-span-6 lg:col-span-7">
          <div className="pl-12 md:pl-20 pt-12">
            <h1 className="text-white text-5xl">
              Unlock your <br />
              <span className="text-yellow-300">productivity potential</span>{" "}
            </h1>
            <p className="text-white pt-8 mb-11">
              Connect the right people, find anything you need and automate <br /> the rest. That’s work in Slack, your productivity platform.
            </p>
            <button className=" bg-green-400 py-4 px-6 rounded-sm-bold text-black text-lg mb-4">SIGN UP WITH GOOGLE</button>
            <p>Slack is free to try for as long as you’d like</p>
          </div>
        </div>
        <div className="col-span-12  sm:col-span-6 md:col-span-6 lg:col-span-5 mr-4">
          <img
            className="mt-12 rounded-lg rounded-tl-lg rounded-tr-lg"
            src="https://static.toiimg.com/thumb/resizemode-4,width-1200,height-900,msid-78700394/78700394.jpg"
            alt="Picture of the author"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
