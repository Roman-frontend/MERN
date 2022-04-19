import { useState, useCallback } from "react";

interface IHeaders {
  ["Content-Type"]?: string;
  Authorization?: string;
}

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const request = useCallback(
    async (
      url: string,
      method = "GET",
      body: any = null,
      headers: IHeaders = {}
    ) => {
      setLoading(true);

      try {
        if (body) {
          body = JSON.stringify(body);
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
      } catch (e) {
        setLoading(false);
        if (
          e &&
          typeof e === "object" &&
          e.hasOwnProperty("message") &&
          e.message
        ) {
          setError(e.message);
        } else {
          setError(e);
        }
        throw e;
      }
    },
    []
  );

  const clearError = useCallback(() => setError(null), []);

  return { loading, request, error, clearError };
};
