import { Button } from '@/components/ui/button'
import { ArrowDown, Shield, Zap, Globe } from 'lucide-react'

export default function Hero() {
  const scrollToStrategies = () => {
    document.getElementById('estrategias')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main heading */}
          <h1 className="  
            text-4xl 
            sm:text-6xl 
            max-[550px]:text-3xl 
            font-bold 
            tracking-tight 
            text-gray-900 
            mb-6">
            Invista em{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              DeFi
            </span>
            {' '}com um clique
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            A primeira plataforma DeFi 100% em português. Simples, segura e transparente. 
            Acesse estratégias de investimento profissionais sem complicação.
          </p>
          
          {/* Feature highlights */}
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            <div className="flex items-center space-x-2 bg-white/80 rounded-full px-4 py-2 shadow-sm">
              <Zap className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">Um Clique</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/80 rounded-full px-4 py-2 shadow-sm">
              <Shield className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-gray-700">Seguro</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/80 rounded-full px-4 py-2 shadow-sm">
              <Globe className="w-5 h-5 text-purple-600" />
              <span className="text-sm font-medium text-gray-700">100% Português</span>
            </div>
          </div>
          
          {/* CTA Button */}
          <div className="flex flex-col  min-[470px]:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              onClick={scrollToStrategies}
            >
              Começar agora
              <ArrowDown className="w-5 h-5 ml-2" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="px-8 py-6 text-lg font-semibold rounded-full border-2 hover:bg-gray-50"
            >
              Ver demonstração
            </Button>
          </div>
          
          {/* Trust indicators */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-4">Confiado por mais de 2.000 investidores</p>
            <div className="flex flex-wrap justify-center items-center space-x-8 opacity-60">
              <div className="flex flex-wrap justify-center items-center space-x-8 ">
                <div className="text-2xl font-bold text-gray-400">R$ 4.3M+</div>
                <div className="text-sm text-gray-400">Total investido</div>
              </div>
              <div className="flex flex-wrap justify-center items-center space-x-8 ">
                <div className="w-1 h-8 bg-gray-300 max-[558px]:hidden"></div>
                <div className="text-2xl font-bold text-gray-400">2.1k+</div>
                <div className="text-sm text-gray-400">Investidores ativos</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating elements PERGUNTAR: Bolas desaparecem no mobile ps: muita informacao */}
      <div className="hidden sm:block absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
      <div className="hidden sm:block absolute bottom-20 right-10 w-32 h-32 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
      <div className="hidden sm:block absolute top-1/2 left-1/4 w-16 h-16 bg-green-200 rounded-full opacity-20 animate-pulse delay-500"></div>
    </section>
  )
}

