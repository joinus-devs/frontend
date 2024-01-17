import { ApiError } from "@/apis/types";
import ModalProvider from "@/components/providers/ModalProvider";
import "@/styles/globals.css";
import {
  ChakraProvider,
  baseTheme,
  createStandaloneToast,
  extendTheme,
  withDefaultColorScheme,
} from "@chakra-ui/react";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";

const { ToastContainer, toast } = createStandaloneToast();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false,
    },
  },
  queryCache: new QueryCache({
    onError: (error, query) => {
      console.log("error");
      // if (!(error instanceof ApiError) || query.meta?.ignoreError) return;
      // modalStore.getState().openAlert({
      //   title: "Error",
      //   content: error.message,
      // });
    },
  }),
  mutationCache: new MutationCache({
    onSuccess: (data, variables, context, mutation) => {
      // const typedData = data as ApiResponse<any>;
      // if (!("message" in typedData) || mutation.meta?.ignoreSuccess) return;
      toast({
        title: "Success",
        description: "Success",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    },
    onError: (error, variables, context, mutation) => {
      if (!(error instanceof ApiError) || mutation.meta?.ignoreError) return;
      toast({
        title: "Failed",
        description: error.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    },
  }),
});

const theme = extendTheme(
  {
    colors: {
      primary: baseTheme.colors.whatsapp,
    },
  },
  withDefaultColorScheme({
    colorScheme: "primary",
  })
);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <ModalProvider />
        <SessionProvider session={pageProps.session}>
          <Component {...pageProps} />
        </SessionProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}
