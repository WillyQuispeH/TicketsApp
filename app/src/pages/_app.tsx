import Login from "@/components/funcional/Login";
import Template from "@/components/layout/Template";
import { UiProvider } from "@/context/ui";
import { useUser } from "@/store/hooks";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  const {user}= useUser();
  return (
    <UiProvider>
      {user.id ? (
        <Template>
          <Component {...pageProps} />
        </Template>
      ) : (
        <Login />
      )}
    </UiProvider>
  );
}
