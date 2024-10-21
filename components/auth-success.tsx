import { useSession } from "@hono/auth-js/react";
import { useEffect } from "react";

export function AuthSuccess() {
	const { data: session, status } = useSession();

	useEffect(() => {
		if (status !== "loading" && window.opener) {
			if (session?.user) {
				window.opener.postMessage(
					{
						status: "success",
					},
					window.location.origin,
				)
			} else {
				window.opener.postMessage({
					status: "errored",
					error: "some error",
				}, window.location.origin);
			}
			window.close();
		}
	}, [session?.user, status]);

	return <p>Auth Success</p>;
}
