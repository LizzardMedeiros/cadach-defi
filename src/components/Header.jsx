import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Wallet, Menu, X } from 'lucide-react'
import useEthereum from '@/hooks/use-ethereum';
import { Link, NavLink } from 'react-router-dom'
import Modal from './Modal';
import WalletRequired from './WalletRequired';
import NetworkDropdown from './NetworkDropdown';

export default function Header({ setSigner = () => null, signer }) {
  const [isConnected, setIsConnected] = useState(false)
  const [showWalletModal, setShowWalletModal] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showWalletRequiredModal, setShowWalletRequiredModal] = useState(false);
  const [connect] = useEthereum(setSigner);

  useEffect(() => {
    const saved = localStorage.getItem("cadash")
    if (!saved) {
      return;
    }
    try {
      const parsed = JSON.parse(saved)
      if (parsed?.wallet) {
        connect(parsed.wallet) // reconecta automaticamente
      }
    } catch (err) {
      console.error("Erro ao ler localStorage:", err)
    }
  }, []) // Persistencia da conexão da carteira com localStorage

  useEffect(() => {
    // verifica se o signer é um JsonRpcSigner válido
    const isValidSigner =
        typeof signer === "object" &&
        signer !== null &&
        typeof signer.address === "string" &&
        "provider" in signer;

      if (!isValidSigner && signer !== 'initial') {
        setShowWalletRequiredModal(true);
        return;
      }
      const saved = localStorage.getItem("cadash") 
      if (!saved) {
        setShowWalletRequiredModal(true);
        return;
      }
      if (isValidSigner) {
        setIsConnected(true)
        setShowWalletModal(false)
      }

  }, [signer])

    useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    if (showWalletModal) {
      const y = window.scrollY || window.pageYOffset || 0;
      body.dataset.scrollY = String(y);

      // trava o fundo de forma robusta
      body.style.position = "fixed";
      body.style.top = `-${y}px`;
      body.style.left = "0";
      body.style.right = "0";
      body.style.width = "100%";

      // bloqueia overflow no root e evita scroll chaining
      html.style.overflow = "hidden";
      html.style.overscrollBehavior = "contain";
    } else {
      // restaura
      const saved = parseInt(body.dataset.scrollY || "0", 10);

      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      body.removeAttribute("data-scroll-y");

      const html = document.documentElement;
      html.style.overflow = "";
      html.style.overscrollBehavior = "";

      // volta pro ponto onde o usuário estava
      window.scrollTo(0, saved);
    }

    return () => {
      // limpeza caso o componente desmonte com o modal aberto
      const saved = parseInt(body?.dataset?.scrollY || "0", 10);

      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      body?.removeAttribute?.("data-scroll-y");

      const html = document.documentElement;
      html.style.overflow = "";
      html.style.overscrollBehavior = "";

      if (showWalletModal) window.scrollTo(0, saved);
    };
  }, [showWalletModal]);


  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-2">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <h1 className="  
                  text-2xl
                  max-[470px]:text-xl 
                  max-[400px]:text-lg
                  font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              >
                Cadach Finance
              </h1>
            </Link>


            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">

            <NavLink
              to="/tokens"
              className={
                `transition-colors text-gray-600 hover:text-gray-900`
              }
            >
              Oferta de Tokens
            </NavLink>
              <a href="#estrategias" className="text-gray-600 hover:text-gray-900 transition-colors">
                Estratégias
              </a>
              <a href="#sobre" className="text-gray-600 hover:text-gray-900 transition-colors">
                Sobre
              </a>
              <a href="#suporte" className="text-gray-600 hover:text-gray-900 transition-colors">
                Suporte
              </a>
            </nav>

            {/* Connect Wallet Button */}
            <div className="flex items-center space-x-4">
    
              <NetworkDropdown />
              {!isConnected ? (
                <Button
                  onClick={() => setShowWalletModal(true)}
                  className="
                    bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700
                    px-3 py-1.5 text-sm
                    sm:px-4 sm:py-2 sm:text-base
                  "
                >
                  <Wallet className="w-4 h-4 mr-2" />
                  <span className="max-[450px]:hidden">Conectar Carteira</span>
                  <span className="hidden max-[450px]:inline">Conectar</span>
                </Button>
              ) : (
                <button className="flex items-center space-x-2" onClick={() => setShowWalletModal(true)}>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">{`${signer.address.substr(0,5)}...${signer.address.substr(-5)}`}</span>
                </button>
              )}

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t py-4">
              <nav className="flex flex-col space-y-4">
                <Link  to="/tokens" className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Tokens
                </Link>
                <a href="#estrategias" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Estratégias
                </a>
                <a href="#sobre" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Sobre
                </a>
                <a href="#suporte" className="text-gray-600 hover:text-gray-900 transition-colors">
                  Suporte
                </a>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Modal de warning avisando q a carteira deve estar conectada */}
      <Modal isOpen={!!showWalletRequiredModal} onClose={() => {setShowWalletRequiredModal(false)}}>
          <WalletRequired />
      </Modal>

      {/* Wallet Connection Modal */}
      {showWalletModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 max-w-screen scroll-auto">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Conectar Carteira</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowWalletModal(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
    
            
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => connect('metamask')}
              >
                <div className="w-6 h-6 bg-orange-500 rounded-full mr-3 flex items-center justify-center text-white text-xs font-bold">
                  M
                </div>
                MetaMask
              </Button>
              
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => connect('walletconnect')}
              >
                <div className="w-6 h-6 bg-blue-500 rounded-full mr-3 flex items-center justify-center text-white text-xs font-bold">
                  W
                </div>
                WalletConnect
              </Button>
              
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => connect('coinbase')}
              >
                <div className="w-6 h-6 bg-blue-600 rounded-full mr-3 flex items-center justify-center text-white text-xs font-bold">
                  C
                </div>
                Coinbase Wallet
              </Button>

              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => connect('trustwallet')}
              >
                <div className="w-6 h-6 bg-blue-600 rounded-full mr-3 flex items-center justify-center text-white text-xs font-bold">
                  T
                </div>
                Trust Wallet
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
