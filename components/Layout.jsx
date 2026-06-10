import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

export const Layout = ({ children }) => (
  <>
    <SiteHeader />
    <main>{children}</main>
    <SiteFooter />
  </>
);
