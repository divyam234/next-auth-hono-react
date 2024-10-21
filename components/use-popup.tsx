import { useEffect, useState, useRef, useCallback } from "react";
import { signIn } from "@hono/auth-js/react";

type WindowProps = {
  url: string;
  title: string;
  width: number;
  height: number;
};

type PopupProps = {
  title?: string;
  width?: number;
  height?: number;
  provider: string;
  onClose?: () => void;
};

type Status = "loading" | "success" | "errored";

const createPopup = ({ url, title, height, width }: WindowProps) => {
  const left = window.screenX + (window.outerWidth - width) / 2;
  const top = window.screenY + (window.outerHeight - height) / 2.5;
  const externalPopup = window.open(
    url,
    title,
    `width=${width},height=${height},left=${left},top=${top}`,
  );
  return externalPopup;
};

export const useOauthPopupLogin = (
  provider = "github",
  title = "SignIn",
  width = 500,
  height = 500,
) => {
  const [externalWindow, setExternalWindow] = useState<Window | null>();

  const [status, setStatus] = useState<Status>("loading");

  const [error, setError] = useState<string | null>(null);

  const popUpSignin = useCallback(async () => {
    const res = await signIn(provider, {
      redirect: false,
      callbackUrl: "/auth/success",
    });

    if (res?.error) {
      setStatus("errored");
      setError(res.error);

      return;
    }
    setExternalWindow(
      createPopup({
        url: res?.url!,
        title,
        width,
        height,
      }),
    );
  }, []);

  useEffect(() => {
    const handleMessage = (event:MessageEvent) => {
      if (event.origin !== window.location.origin) {
        return;
      }
      if (event.data.status) {
        setStatus(event.data.status);
        if (event.data.status === "errored") {
          setError(event.data.error);
        }
        if (externalWindow) {
          externalWindow.close();
        }
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
      externalWindow?.close();
    };
  }, [externalWindow]);

  return { popUpSignin, status, error };
};