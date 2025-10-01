import { ethers } from "ethers";

const ABI = {
  STRATEGY: [
    "function erc20Token() public view returns (address)", // Token base (USDT, wBTC, ETH...)
    "function getApy() public view returns (uint128)", // Rendimento estimado ao ano (apy)
    "function locked(address) public view returns (uint40,uint256,uint256,uint256)", // Cofre do cliente (investedAt, quotaAmount, applied, feeGenerated)
    "function withdraw(uint256) public", // Saca o principal e os rendimentos se tiver
    "function withdrawYields() public", // Saca os rendimentos
    "function getYields(address) public view returns (uint256)", // Total de rendimentos disponíveis
    "function getYieldsLogs() public", // Total de rendimentos disponíveis (logs)
    "function deposit(uint256) public", // Deposita fundos no grupo
    "function getBalance() public view returns (uint256)", // Pega o saldo
    "function getTotalAllocated() public view returns (uint256)", // Pega o total alocado no grupo
    "function investorCounter() public view returns (uint256)", // número de carteiras da pool
    "event Log(uint256 ajustedAmount, uint256 applied)",
  ],
  ERC20: [
    "function approve(address, uint256) public",
    "function balanceOf(address account) view returns (uint256)",
    "function decimals() view returns (uint256)",
  ]
}

const NETWORK_CONFIG = {
  chainId: "0xa4b1", // 42161 em decimal
  chainName: "Arbitrum One",
  rpcUrls: ["https://arb1.arbitrum.io/rpc"],
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  blockExplorerUrls: ["https://arbiscan.io/"],
};
/* const NETWORK_CONFIG = {
  chainId: "0x539", // 42161 em decimal
  chainName: "Local ETH",
  rpcUrls: ["http://localhost:8545"],
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  blockExplorerUrls: ["https://arbiscan.io/"],
}; */

export default function UseEthereum(setSigner = () => null) {
  async function connect(wallet) {
    switch(wallet) {
      default: {
        // Request Accounts e get chainId
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });

        // Tries to change chain if necessary
        if (chainId !== NETWORK_CONFIG.chainId)
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: NETWORK_CONFIG.chainId }],
          })
          .catch(async (err) => {
            if (err.code === 4902)
              await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [NETWORK_CONFIG],
              });
          });

        // Gets the signer and sets the current balance
        const provider = new ethers.BrowserProvider(window.ethereum);
        const s = await provider.getSigner();
        s.balanceWei = await provider.getBalance(s.address);
        setSigner(s);
      }
    }
  }

  async function call(address, fn, contract = 'ERC20', ...params) {
    contract = contract.toUpperCase();
    if (!(contract in ABI)) throw new Error('Invalid contract!');
    const abi = ABI[contract];
    const provider = new ethers.BrowserProvider(window.ethereum);
    const c = new ethers.Contract(address, abi, provider);
    return await c[fn](...params).catch(console.error)
  }

  async function send(signer, contractAddress, fn, contract = 'ERC20', ...params) {
    if (!signer.address) throw new Error('Invalid signer!');
    contract = contract.toUpperCase();
    if (!(contract in ABI)) throw new Error('Invalid contract!');
    const abi = ABI[contract];
    const c = new ethers.Contract(contractAddress, abi, signer);
    return await c[fn](...params, { gasLimit: 500_000 });
  }

  return [
    connect,
    call,
    send,
  ]
}
