"use client";

import { useEffect, useState } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);

    // Verificar si el navegador soporta matchMedia
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    // Agregar listener para cambios
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);

    // Limpiar listener al desmontar
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
}
