import { useState, useCallback } from "react";

// interface IHeaders {
//   ["Content-Type"]?: string;
//   Authorization?: string;
// }

export const useHttp = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const request = useCallback(
    async (
      url: string,
      method = "GET",
      body: any = null,
      headers: any = {}
    ) => {
      setLoading(true);

      try {
        if (body) {
          console.log("body in request before stringify => ", body);
          body = JSON.stringify(body);
          console.log("body in request => ", body);
          headers["Content-Type"] = "application/json";
        }

        console.log("http req ", url, { method, body, headers });
        const response = await fetch(`http://localhost:5002${url}`, {
          method,
          body,
          headers,
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Что-то пошло не так");
        }

        setLoading(false);

        return data;
      } catch (e: any) {
        console.log("e... ", e.message);
        setLoading(false);

        setError(e.message);

        throw e;
      }
    },
    []
  );

  const clearError = useCallback(() => setError(""), []);

  return { loading, request, error, clearError };
};
