import { useState, useEffect, useCallback } from "react";

export default function useFetchApi(url) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  // const [url, updateUrl] = useState(url);

  const load = useCallback(async () => {
    if (!url) {
      setError("URL non valido");
      setData(null);
      return;
    }

    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const json = await response.json();
      setData(json);
    } catch (error) {
      setError(error.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    load();
  }, [load]);

  return {
    loading,
    error,
    data,
    load,
    // updateUrl,
  };
}
