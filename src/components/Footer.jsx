import { Mail, MessageCircle, FileText, Shield, Globe, Twitter, Github, Linkedin, Instagram } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Cadach Finance
            </h3>
            <p className="text-gray-400 mb-6 leading-relaxed max-w-md">
              Aqui você encontra estratégias profissionais prontas para usar, automação que protege seu capital e suporte prático para começar hoje no DEFI
            </p>
            <div className="flex space-x-4">
            <a href="https://x.com/cadachd?s=21" 
                target="_blank"
                rel="noopener noreferrer"className="text-gray-400 hover:text-white transition-colors" aria-label="X (antigo Twitter)"
            >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.508 11.24H15.12l-5.18-6.774L3.972 21.75H.664l7.73-8.845L.254 2.25h6.594l4.704 6.19L18.244 2.25zM17.1 19.35h1.832L7.05 4.78H5.09L17.1 19.35z" />
                </svg>
              </a>
              <a
                href="https://github.com/LizzardMedeiros/cadach-defi" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/cadach.defi?igsh=OXZhMzczZWE0ZHZj&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Plataforma</h4>
            <ul className="space-y-3">
              <li>
                <a href="#estrategias" className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2">
                  <Globe className="w-4 h-4" />
                  <span>Estratégias</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2">
                  <Shield className="w-4 h-4" />
                  <span>Segurança</span>
                </a>
              </li>
              <li>
                <a   
                  href="../../public/docs/whitepaper.pdf"
                  download="whitepaper.pdf"
                  className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2"
                >
                  <FileText className="w-4 h-4" />
                  <span>Documentação</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-4">Suporte</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2">
                  <MessageCircle className="w-4 h-4" />
                  <span>Central de Ajuda</span>
                </a>
              </li>
              <li>
                <a href="mailto:contato@cadachfinance.com.br" className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>Contato</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Stats Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-2xl font-bold text-white mb-1">R$ 4.3M+</div>
              <div className="text-sm text-gray-400">Total Investido</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white mb-1">2.1k+</div>
              <div className="text-sm text-gray-400">Investidores</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white mb-1">12</div>
              <div className="text-sm text-gray-400">Estratégias</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white mb-1">99.9%</div>
              <div className="text-sm text-gray-400">Uptime</div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © {currentYear} Cadach Finance. Todos os direitos reservados.
          </div>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Termos de Uso
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Política de Privacidade
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Cookies
            </a>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="bg-gray-800 rounded-lg p-4">
            <p className="text-xs text-gray-400 leading-relaxed">
              <strong className="text-gray-300">Aviso de Risco:</strong> Investimentos em DeFi envolvem riscos significativos, 
              incluindo a possibilidade de perda total do capital investido. Os retornos passados não garantem resultados futuros. 
              Recomendamos que você entenda completamente os riscos antes de investir e considere buscar aconselhamento financeiro independente.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

