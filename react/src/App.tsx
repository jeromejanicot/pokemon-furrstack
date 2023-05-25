import superjson from "superjson";
import { trpc } from "./trpc/client";
import { httpBatchLink } from "@trpc/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import Nav from "./components/nav";
import Details from "./components/pokemons/details";

const queryClient = new QueryClient();
const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: "http://localhost:4500/trpc",
    }),
  ],
  transformer: superjson,
});

function App() {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <div className="max-full">
          <Nav />
          <Details />
        </div>
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
