import NavBar from "./NavBar";

const Layout = ({ children }: any) => {
  return (
    <>
      <NavBar />
      {children}
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
