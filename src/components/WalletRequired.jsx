import { Wallet } from "lucide-react";
import { NETWORK_CONFIG } from "@/hooks/use-ethereum";

export default function WalletRequired() {
  return (
    <div className="flex flex-col items-center text-center space-y-5 p-6">
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-100">
        <Wallet className="w-8 h-8 text-blue-600" />
      </div>

      <h2 className="text-2xl font-semibold text-gray-800">
        Conecte sua carteira
      </h2>

      <p className="text-gray-600 text-xl pb-10">
        Para acessar as funcionalidades, é necessário conectar uma carteira compatível com a rede {NETWORK_CONFIG.chainName || "Arbitrum"}.
      </p>


    </div>
  );
}
