import { env } from "./env";
import { createAPI } from "nextkit";

export const api = createAPI({
  async onError(_req, _res, err) {
    console.warn(err);
    return {
      status: 500,
      message: err.message,
    };
  },

  async getContext() {
    return {
      async turnstile(token: string, ip: string | null) {
        const formData = new URLSearchParams();

        formData.append("secret", env.TURNSTILE_SECRET_KEY);
        formData.append("token", token);

        if (ip) {
          formData.append("remoteip", ip);
        }

        const url = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

        const result = await fetch(url, {
          body: formData,
          method: "POST",
        });

        return (await result.json()) as
          | {
              success: true;
              challenge_ts: string;
              hostname: string;
              "error-codes": string[];
              action: string;
              cdata: string;
            }
          | {
              success: false;
              "error-codes": string[];
            };
      },
    };
  },
});