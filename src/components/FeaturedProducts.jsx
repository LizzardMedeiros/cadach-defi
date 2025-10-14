import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { Button } from '@/components/ui/button'
import Modal from '@/components/Modal';
import ModalContent from '@/components/ModalContent';
import { Shield, TrendingUp, Users, DollarSign, Info, Star } from 'lucide-react'
import useEthereum from '@/hooks/use-ethereum'

const strategyList = [
  [
    '0x46455684E06A811A4BDeb93D3acb421EFe8e4C97',
    'Estratégia Blindando meu $',
    'Baixo Risco',
    'green',
    Shield,
    0, // Rentabilidade
    'Investimento em tokens lastreados em dólar para proteção contra inflação',
    'Esta estratégia foca na preservação do patrimônio através de investimentos em tokens lastreados no dólar. Ideal para quem busca proteção contra a volatilidade do mercado.',
    0, // Total investido
    0, // Total de investidores
    [['AAVE Pool', 100, 'bg-green-500']],
    ['Risco de smart contract', 'Volatilidade do preço do dólar'],
    ['Auditado por empresas de segurança','Rebalanceamento automático','Saque a qualquer momento'],
  ],
]

export default function FeaturedProducts({ signer }) {
  const [products, setProducts] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [modal, setModal] = useState();
  const [productDetails, setProductDetails] = useState({})

  const [, call, send] = useEthereum();

  useEffect(() => {
    let promises = [];
    strategyList.forEach((s) => {
      const [address] = s;
      promises.push(
        call(address, 'getApy', 'STRATEGY')
          .then((r) => s[5] = Number(ethers.formatUnits(r, 27) * 100).toFixed(2)),
        call(address, 'getTotalAllocated', 'STRATEGY')
          .then((r) => s[8] = Number(ethers.formatUnits(r, 27) * 100).toFixed(2)),
        call(address, 'investorCounter', 'STRATEGY').then((r) => s[9] = r),
      );
    });

    Promise.all(promises)
      .then(() => {
        const keys = [
          'id', 'name', 'category', 'categoryColor', 'icon', 'currentReturn',
          'description', 'longDescription', 'tvl', 'investors', 'composition',
          'risks', 'features',
        ];
        const p = strategyList.map(
          (data) => Object.fromEntries(data.map((el, i) => [keys[i], el]))
        )
        setProducts(p);
      })
  }, [])

  const handleProductClick = async (productId) => {
    const unselect = selectedProduct === productId;
    if (!unselect && signer?.address) {
      const erc20Addr = await call(productId, 'erc20Token', 'STRATEGY');
      const decimals = await call(erc20Addr, 'decimals', 'ERC20');
      const available = await call(erc20Addr, 'balanceOf', 'ERC20', signer.address);
      const balance = await send(signer, productId, 'getBalance', 'STRATEGY');

      setProductDetails({
        available: Number(ethers.formatUnits(available, decimals)).toFixed(2), // Total Aplicado
        balance: Number(ethers.formatUnits(balance, decimals)).toFixed(2), // Disponível para resgate
        gas: Number(ethers.formatEther(signer.balanceWei)).toFixed(2),
      })
    }
    setSelectedProduct(unselect ? null : productId);
  }

  const handleInvest = (productId) => {
    setSelectedProduct(productId);
    setModal('buy');
  }

  const handleSubmit = async ({ amount, mode }) => {
    console.log({ amount, mode });
    if (!selectedProduct || amount <= 0) return;
    const erc20Addr = await call(selectedProduct, 'erc20Token', 'STRATEGY');
    const decimals = await call(erc20Addr, 'decimals', 'ERC20');
    const parsedAmount = ethers.parseUnits(String(amount).replace(',', '.'), decimals);
    const balance = Number(ethers.formatUnits(
      await call(erc20Addr, 'balanceOf', 'ERC20', signer.address), decimals,
    ));

    switch (mode) {
      case 'sell': {
        await send(signer, selectedProduct, 'withdraw', 'STRATEGY', parsedAmount);
        return;
      }
      default: {
        if (balance < amount) throw new Error('Unsuficient amount!');
        await send(signer, erc20Addr, 'approve', 'ERC20', selectedProduct, parsedAmount);
        await send(signer, selectedProduct, 'deposit', 'STRATEGY', parsedAmount);
      }
    }
  }

  const getCategoryBadgeColor = (color) => {
    const colors = {
      green: 'bg-green-100 text-green-800 border-green-200',
      red: 'bg-red-100 text-red-800 border-red-200',
      yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200'
    }
    return colors[color] || colors.green
  }

  return (
    <section className="py-10 bg-white md:py-20" id="strategies">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Star className="w-6 h-6 text-yellow-500" />
            <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
              Produtos em Destaque
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Estratégias mais populares
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Conheça as estratégias que estão gerando os melhores resultados para nossos investidores
          </p>
        </div>

        <div className={`grid lg:grid-cols-${Math.min(products.length, 2)} gap-8 max-w-6xl mx-auto`}>
          {products.map((product) => {
            const IconComponent = product.icon
            const isSelected = selectedProduct === product.id
            
            return (
              <div
                key={product.id}
                className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${
                  isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''
                }`}
              >
                {/* Product Header */}
                <div className="p-8 max-[450px]:p-6">
                  <div className="flex items-start justify-between mb-6 gap-2 max-[350px]:mb-3">
                    <div className="flex items-top space-x-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-r h-fit mt-1.5 ${
                        product.categoryColor === 'green' ? 'from-green-500 to-emerald-600' :
                        product.categoryColor === 'red' ? 'from-red-500 to-pink-600' :
                        'from-yellow-500 to-orange-500'
                      } text-white`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-gray-900 mb-1 sm:text-xl">
                          {product.name}
                        </h3>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border  max-[350px]:hidden ${getCategoryBadgeColor(product.categoryColor)}`}>
                          {product.category}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1 text-green-600 mb-1">
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-base font-bold sm:text-2xl">{product.currentReturn}%</span>
                      </div>
                      <span className="text-sm text-gray-500">ao ano</span>
                    </div>
                  </div>
                  {/* Category Badge for small screens */}
                  <p className={`visible items-center px-2.5 py-0.5 rounded-full text-xs font-medium border     mb-6 max-w-[50%] mx-auto text-center
                    min-[351px]:hidden ${getCategoryBadgeColor(product.categoryColor)}`}>
                          {product.category}
                  </p>

                  {/* Description */}
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6">

                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <div className="flex items-center justify-center space-x-2 mb-1">
                        <DollarSign className="w-4 h-4 text-gray-600" />
                        <span className="text-lg font-bold text-gray-900">{product.tvl}</span>
                      </div>
                      <span className="text-sm text-gray-500">Total Investido</span>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <div className="flex items-center justify-center space-x-2 mb-1">
                        <Users className="w-4 h-4 text-gray-600" />
                        <span className="text-lg font-bold text-gray-900">{product.investors}</span>
                      </div>
                      <span className="text-sm text-gray-500">Investidores</span>
                    </div>

                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3 flex-wrap gap-3">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => handleProductClick(product.id)}
                    >
                      <Info className="w-4 h-4 mr-2" />
                      {isSelected ? 'Menos detalhes' : 'Ver detalhes'}
                    </Button>
                    <Button 
                      className={`flex-1 bg-gradient-to-r ${
                        product.categoryColor === 'green' ? 'from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700' :
                        product.categoryColor === 'red' ? 'from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700' :
                        'from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600'
                      } text-white`}
                      disabled={!signer?.address}
                      onClick={() => handleInvest(product.id)}
                    >
                      Investir agora
                    </Button>
                  </div>
                </div>

                {/* Expanded Details */}
                {isSelected && (
                  <div className="border-t bg-gray-50 p-8 max-[450px]:p-6">

                    <div className="grid grid-cols-3 gap-4 mb-6 max-[510px]:flex max-[510px]:flex-col max-[510px]:gap-3">

                      <div className="bg-white rounded-lg p-4 text-center">
                        <div className="flex items-center justify-center space-x-2 mb-1">
                          <DollarSign className="w-4 h-4 text-gray-600" />
                          <span className="text-base font-bold text-gray-900 sm:text-lg">
                            {productDetails.available || 0}
                          </span>
                        </div>
                        <span className="text-sm text-gray-500">Disponível para investir</span>
                      </div>

                      <div className="bg-white rounded-lg p-4 text-center">
                        <div className="flex items-center justify-center space-x-2 mb-1">
                          <Users className="w-4 h-4 text-gray-600" />
                          <span className="text-base font-bold text-gray-900 sm:text-lg">
                            {productDetails.gas || 0} ETH
                          </span>
                        </div>
                        <span className="text-sm text-gray-500">Gas disponível</span>
                      </div>

                      <div className="bg-white rounded-lg p-4 text-center">
                        <div className="flex items-center justify-center space-x-2 mb-1">
                          <DollarSign className="w-4 h-4 text-gray-600" />
                          <span className="text-base font-bold text-gray-900 sm:text-lg">
                            {productDetails.balance || 0}
                          </span>
                        </div>
                        <span className="text-sm text-gray-500">Capital investido</span>
                      </div>

                    </div>

                    <div className="flex justify-center pb-2  sm:grid sm:grid-cols-3 sm:gap-2">
                      <div />
                      <Button
                        className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                        // disabled={!productDetails.amount}
                        onClick={() => setModal('sell')}
                      >
                        <DollarSign className="w-4 h-4 mr-2" />
                        Resgatar patrimônio
                      </Button>
                      <div />
                    </div>

                    <div className="space-y-6">
                      {/* Long Description */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Sobre a estratégia</h4>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {product.longDescription}
                        </p>
                      </div>

                      {/* Composition */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Composição</h4>
                        <div className="space-y-2">
                          {product.composition.map(([name, percent, color], index) => (
                            <div key={index} className="flex items-center space-x-3">
                              <div className={`w-3 h-3 rounded-full ${color}`}></div>
                              <span className="text-sm text-gray-600 flex-1">{name}</span>
                              <span className="text-sm font-semibold text-gray-900">{percent}%</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Features and Risks */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Principais recursos</h4>
                          <ul className="space-y-2">
                            {product.features.map((feature, index) => (
                              <li key={index} className="flex items-start space-x-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                <span className="text-sm text-gray-600">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Principais riscos</h4>
                          <ul className="space-y-2">
                            {product.risks.map((risk, index) => (
                              <li key={index} className="flex items-start space-x-2">
                                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                                <span className="text-sm text-gray-600">{risk}</span>
                              </li>
                            ))}
                          </ul>
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
            Quer ver todas as estratégias disponíveis?
          </p>
          <Button size="lg" variant="outline" className="rounded-full">
            Ver todas as estratégias
          </Button>
        </div>
      </div>
      <Modal isOpen={!!modal} onClose={() => {setModal(); setSelectedProduct(null);}}>
        <ModalContent
          product={products.find((p) => p.id === selectedProduct)}
          mode={modal}
          userBalance={productDetails.balance}
          onClose={() => setModal()}
          onSubmit={handleSubmit}
        />
      </Modal>
    </section>
  )
}

