import { useState, useEffect } from "react";

export default function usePaginationApi(fetchUrlGenerator, initialPage = 1) {
  const [page, setPage] = useState(initialPage);
  const [url, setUrl] = useState(fetchUrlGenerator(initialPage));

  useEffect(() => {
    setUrl(fetchUrlGenerator(page)); // aggiorna URL con la nuova pagina
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page, fetchUrlGenerator]);

  return {
    page,
    setPage,
    url,
  };
}
