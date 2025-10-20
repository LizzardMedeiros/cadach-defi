import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Wallet, Menu, X } from 'lucide-react'
import useEthereum from '@/hooks/use-ethereum';
import { Link, NavLink } from 'react-router-dom'

export default function Header({ setSigner = () => null, signer }) {
  const [isConnected, setIsConnected] = useState(false)
  const [showWalletModal, setShowWalletModal] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [connect] = useEthereum(setSigner);

  useEffect(() => {
    if (!signer) return;
    setIsConnected(true)
    setShowWalletModal(false)
  }, [signer])

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-2.5">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <h1 className="  
                  text-xl 
                  max-[470px]:text-xl 
                  min-[470px]:text-2xl  font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              >
                Cadach Finance
              </h1>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
            {/* Restirado pra build
            <NavLink
              to="/tokens"
              className={({isActive}) =>
                `transition-colors ${isActive ? 'text-gray-900 underline' : 'text-gray-600 hover:text-gray-900'}`
              }
            >
              Tokens
            </NavLink>
            */}
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
              {!isConnected ? (
                <Button 
                  onClick={() => setShowWalletModal(true)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Wallet className="w-4 h-4 mr-2" />
                  Conectar Carteira
                </Button>
              ) : (
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">{`${signer.address.substr(0,5)}...${signer.address.substr(-5)}`}</span>
                </div>
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
                {/* Retirado pra build
                <Link  to="/tokens" className={({isActive}) =>
                  `transition-colors ${isActive ? 'text-gray-900 underline' : 'text-gray-600 hover:text-gray-900'}`
                }>
                  Tokens
                </Link>
                */}
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

      {/* Wallet Connection Modal */}
      {showWalletModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
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
