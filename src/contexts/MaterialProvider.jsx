import { createContext, useContext, useState } from "react";

const MaterialContext = createContext();

export default function MaterialProvider({ children }) {
  const [materials, setMaterials] = useState([]);
  console.log(materials, " MaterialProvider");
  function addMaterial(material) {
    setMaterials(material);
    
  }

  return (
    <MaterialContext.Provider
      value={{
        materials,
        addMaterial,
      }}
    >
      {children}
    </MaterialContext.Provider>
  );
}

export function useMaterialContext() {
  return useContext(MaterialContext);
}
