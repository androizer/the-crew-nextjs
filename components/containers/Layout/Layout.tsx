import { PropsWithChildren } from "react";

import { Footer, Header } from "../../presentational";

export const Layout = (props: PropsWithChildren<{}>) => {
  return (
    <>
      <Header></Header>
      {props.children}
      <Footer></Footer>
    </>
  );
};

export default Layout;
