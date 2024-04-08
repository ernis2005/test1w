import ProviderRedux from "./store/Provider/Provider";

import "./layouyt.scss";
import Haeder from "../components/Haeder/Haeder";
export const metadata = {
  title: "Оптимизация производства",
  description:
    "Мы специализируемся на разработке инновационных методов оптимизации производства. Наша цель - улучшить эффективность и экономическую эффективность производственных процессов. Мы предлагаем интегрированные решения, основанные на передовых технологиях и лучших практиках отрасли.",
};

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
