import ProviderRedux from "./store/Provider/Provider";

import "./layouyt.scss";
import Haeder from "../components/Haeder/Haeder";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ProviderRedux>
        <body>
          <Haeder />
          <main style={{marginTop:'30px'}}>{children}</main>
        </body>
      </ProviderRedux>
    </html>
  );
}
