import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Shield, Scale, Rocket, TrendingUp, Info } from 'lucide-react'

export default function RiskCategories({ setStrategyFilter }) {
  const [selectedCategory, setSelectedCategory] = useState(null)

  const categories = [
    {
      id: 'baixo-risco',
      name: 'Baixo Risco',
      icon: Shield,
      risco: 1,
      color: 'green',
      gradient: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-700',
      returnRange: '5-8%',
      description: 'Estratégias conservadoras com foco em segurança e preservação de capital',
      features: [
        'Tokens lastreados em ouro e ativos estáveis',
        'Protocolos auditados e estabelecidos',
        'Baixa volatilidade e risco controlado'
      ]
    },
    {
      id: 'moderado',
      name: 'Moderado',
      icon: Scale,
      risco: 2,
      color: 'yellow',
      gradient: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      textColor: 'text-yellow-700',
      returnRange: '8-15%',
      description: 'Equilíbrio perfeito entre segurança e rentabilidade',
      features: [
        'Diversificação entre protocolos seguros',
        'Yield farming com risco controlado',
        'Estratégias balanceadas e testadas'
      ]
    },
    {
      id: 'agressivo',
      name: 'Agressivo',
      icon: Rocket,
      color: 'red',
      risco: 3,
      gradient: 'from-red-500 to-pink-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      textColor: 'text-red-700',
      returnRange: '15-25%+',
      description: 'Maior potencial de retorno para investidores experientes',
      features: [
        'Protocolos de alto rendimento',
        'Estratégias avançadas de DeFi',
        'Maior volatilidade e potencial'
      ]
    }
  ]

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(selectedCategory === categoryId ? null : categoryId)
  }

  return (
    <section id="estrategias" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Escolha seu perfil de investimento
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Oferecemos estratégias para todos os perfis, desde conservadores até os mais arrojados
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto  overflow-visible">
          {categories.map((category) => {
            const IconComponent = category.icon
            const isSelected = selectedCategory === category.id
            
            return (
              <div
                key={category.id}
                className={`relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl overflow-visible transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                  isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''
                }`}
                onClick={() => handleCategoryClick(category.id)}
              >
                <div className="flex flex-col justify-between h-full">
                  {/* Conteúdo principal */}
                  <div>
                    {/* Icon and header */}
                    <div className="text-center mb-6">
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${category.gradient} text-white mb-4`}>
                        <IconComponent className="w-8 h-8" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2 sm:text-2xl">{category.name}</h3>
                      <div className="flex items-center justify-center space-x-2">
                        <TrendingUp className="w-5 h-5 text-green-600" />
                        <span className="text-2xl max-[1023px]:text-base font-bold text-green-600 ">{category.returnRange}</span>
                        <span className="text-gray-500 text-sm">ao ano</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-center mb-6 leading-relaxed">
                      {category.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-3 mb-6">
                      {category.features.map((feature, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button - sempre no final */}
                  <Button
                    className={`w-full bg-gradient-to-r ${category.gradient} hover:opacity-90 text-white font-semibold py-3 rounded-lg transition-all duration-300 mt-auto`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setStrategyFilter(category.risco);
                      const el = document.getElementById("strategies");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    Ver estratégias
                  </Button>
                </div>

                {/* Expanded content */}
                {isSelected && (
                  <div className="absolute top-full left-0 right-0 bg-white rounded-b-2xl shadow-xl p-6 z-50 border-t break-words ">
                    <div className="flex items-start space-x-3  ">
                      <Info className="min-w-4 min-h-4 text-blue-500 mt-1" />
                      <div className="overflow-y-auto">
                        <h4 className="font-semibold text-gray-900 mb-2">Detalhes da categoria</h4>
                        <p className="text-sm text-gray-600 mb-4 break-words">
                          Esta categoria é ideal para investidores que buscam {category.name.toLowerCase()} e estão dispostos a aceitar os riscos correspondentes em troca dos retornos esperados.
                        </p>
                        <div className="flex space-x-2 flex-wrap gap-3 justify-center">
                          <Button size="sm" variant="outline">Saiba mais</Button>
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">Ver produtos</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-6">
            Não tem certeza qual categoria escolher?
          </p>
          <Button variant="outline" size="lg" className="rounded-full">
            Fazer quiz de perfil
          </Button>
        </div>
      </div>
    </section>
  )
}

