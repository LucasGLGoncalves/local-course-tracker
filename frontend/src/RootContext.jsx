import { createContext, useState } from "react";

export const RootContext = createContext();

export function RootProvider({ children }) {
  const [rootDirectory, setRootDirectory] = useState("");

  const setAndSyncRoot = async (path) => {
    try {
      const res = await fetch("http://localhost:4000/set-root", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ root: path }),
      });

      if (!res.ok) throw new Error("Erro ao definir diretório");
      setRootDirectory(path);
      alert("Diretório configurado com sucesso!");
    } catch (err) {
      alert("Falha ao configurar diretório raiz: " + err.message);
    }
  };

  return (
    <RootContext.Provider value={{ rootDirectory, setAndSyncRoot }}>
      {children}
    </RootContext.Provider>
  );
}
