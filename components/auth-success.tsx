import { useSession } from "@hono/auth-js/react";
import { useEffect } from "react";

export function AuthSuccess() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status !== "loading" && window.opener) {
      if (session?.user) {
        const message = {
          status: "success",
          error: null,
        };
        window.opener.postMessage(message, window.location.origin);
      }else{
        const message = {
          status: "errored",
          error: "",
        };
        window.opener.postMessage(message, window.location.origin);
      }
      window.close();
    }
  }, [session?.user, status]);

  return <p>Auth Success</p>;
}
