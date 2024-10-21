import ClientExample from "@/components/client-example";
import { SessionProvider } from "@hono/auth-js/react";
import Layout from "./layout";
import {  Route, Switch } from "wouter";
import { AuthSuccess } from "./auth-success";

export default function App() {
  return (
    <SessionProvider>
      <Switch>
        <Route path="/">
          <Layout>
            <ClientExample />
          </Layout>
        </Route>
        <Route path="/auth/success" component={AuthSuccess}/>
        <Route>404: No such page!</Route>
      </Switch>
    </SessionProvider>
  );
}
