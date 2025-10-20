import { NETWORK_CONFIG } from "@/hooks/use-ethereum";
import React, { useEffect, useState } from "react";

export default function NetworkDropdown() {
  const [chainNames , setChainName] = useState([])

    const handleNetworkSource = () => {
    const sources = [];

    if (NETWORK_CONFIG.chainName.includes("Arbitrum")) {
      sources.push("./logos/arbitrum.png");
    } // Depois tem q ser retrabalhado esse array e ser adcionado novas imagens

    setChainName(sources);
  };

  useEffect(() => {
    handleNetworkSource();
  }, []) 

  if (!chainNames.length) return null; // evita erro se array estiver vazio

  const hasMultiple = chainNames.length > 1;

  return (
    <div className="relative group inline-block">
      {/* Botão principal → primeira imagem */}
      <div className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer">
        <img
          src={chainNames[0]}
          alt="Active Network"
          className="w-6 h-6 rounded-full"
        />
      </div>

      {/* Dropdown só aparece se houver mais de uma imagem */}
      {hasMultiple && (
        <div className="absolute hidden group-hover:flex flex-col bg-white border border-gray-200 shadow-lg rounded-md p-2 top-full mt-2 z-50 w-10 left-1/2 -translate-x-1/2" >
          {chainNames.slice(1).map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Network ${i + 1}`}
              className="w-6 h-6 rounded-full cursor-pointer hover:scale-110 transition-transform mb-1 last:mb-0"
            />
          ))}
        </div>
      )}
    </div>
  );
}
