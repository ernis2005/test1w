import ProviderRedux from "./store/Provider/Provider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ProviderRedux>
        <body>{children}</body>
      </ProviderRedux>
    </html>
  );
}
