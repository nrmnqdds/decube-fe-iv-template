import Navbar from "@/components/navbar";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";

const client = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
	return (
		<QueryClientProvider client={client}>
			<Navbar />
			<Component {...pageProps} />
		</QueryClientProvider>
	);
}
