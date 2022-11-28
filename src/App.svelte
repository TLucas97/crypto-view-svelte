<script>
import Home from "./routes/Home.svelte";
import History from "./routes/History.svelte";
import Header from "./lib/Header.svelte";
import { QueryClient, QueryClientProvider } from "@sveltestack/svelte-query";
import { Router, Route } from "svelte-navigator";
const queryClient = new QueryClient();
</script>

<QueryClientProvider client="{queryClient}">
  <Router>
    <Header />
    <Route path="/" component="{Home}" />
    <Route path="/history" component="{History}" />
  </Router>
</QueryClientProvider>
