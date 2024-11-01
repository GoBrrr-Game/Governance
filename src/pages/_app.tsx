import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../store/store"; // Adjust the path to your store
import "../styles/globals.css";
import {NextUIProvider} from "@nextui-org/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </NextUIProvider>
  );
}
