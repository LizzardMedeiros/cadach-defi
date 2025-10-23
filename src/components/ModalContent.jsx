import { useEffect, useState } from 'react'
import { TrendingUp, TrendingDown, DollarSign, Info, ArrowRightLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import * as Icons from 'lucide-react';

const fn = () => null;

export default function Content({ 
  product, 
  onClose = fn, 
  onSubmit = fn,
  mode = 'buy', // 'buy' or 'sell'
  userBalance = 0, // Saldo disponível do usuário
  fees = {
    transaction: 0.5, // Taxa de transação em %
    gas: 0.1 // Taxa de gas estimada em USDT
  },
  error,
  setError,
}) {
  const [amount, setAmount] = useState(0.00);

  
  const isBuyMode = mode === 'buy';
  const totalFees = fees.transaction ? (amount * fees.transaction / 100) : 0;
  const totalWithFees = isBuyMode ? amount + totalFees + (fees.gas || 0) : amount - totalFees - (fees.gas || 0);
  const netAmount = isBuyMode ? amount : amount - totalFees - (fees.gas || 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      amount,
      mode,
      netAmount,
      fees: {
        transaction: totalFees,
        gas: fees.gas || 0
      },
      total: totalWithFees
    });
  };

  useEffect(() => {
  // Zera erro quando não há valor
  if (!amount || amount <= 0) {
    setError(null);
    return;
  }

  // Verificações principais
  if (isBuyMode && amount > userBalance) {
    setError('Saldo insuficiente');
  } else {
    setError(null)
  }
}, [amount, userBalance, isBuyMode, setError]);

  return (
    <div className="p-6 max-[470px]:p-3">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center mb-4">
          {(() => {
            if (!product) return null;
            const IconComponent = typeof product?.icon === 'string'
              ? (Icons[product.icon] || Icons.HelpCircle) 
              : (product?.icon || Icons.HelpCircle);  

            return (
              <div className={`p-3 rounded-xl bg-gradient-to-r ${
                isBuyMode 
                  ? (product.categoryColor === 'green' ? 'from-green-500 to-emerald-600' :
                    product.categoryColor === 'red' ? 'from-red-500 to-pink-600' :
                    'from-yellow-500 to-orange-500')
                  : 'from-purple-500 to-indigo-600'
              } text-white`}>
                <IconComponent className="w-8 h-8" />
              </div>
            );
          })()}
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2 sm:text-2xl">
          {isBuyMode ? 'Investir em' : 'Vender'} {product?.name}
        </h3>
        <p className="text-gray-600">
          {isBuyMode 
            ? 'Digite o valor que deseja investir em USDT'
            : 'Digite o valor que deseja resgatar em USDT'
          }
        </p>
      </div>

      <div >
        <div>
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
              Valor da {isBuyMode ? 'Compra' : 'Venda'}
            </label>
            {!isBuyMode && (
              <button
                type="button"
                onClick={() => {
                  setAmount(Number(userBalance))
                }}
                className="text-xs font-medium text-blue-600 hover:text-blue-700"
              >
                Saldo: {userBalance} USDT
              </button>
            )}
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <DollarSign className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="number"
              id="amount"
              name="amount"
              step="0.01"
              min="0"
              onFocus={() => setError(null)}
              max={!isBuyMode ? userBalance : undefined}
              value={amount}
              placeholder="0.00"
              className="block w-full pl-10 pr-14 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              onChange={(ev) => setAmount(Number(ev.target.value))}
              required
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm font-medium">USDT</span>
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            {isBuyMode ? 'Valor mínimo: 10 USDT' : `Máximo disponível: ${userBalance} USDT`}
          </p>
          <p className="mt-2 text-sm text-red-700 mb-3 h-4" >
            {error}
          </p>
        </div>

        {amount > 0 && (
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h4 className="font-medium text-gray-900 mb-3 flex items-center">
              <ArrowRightLeft className="w-4 h-4 mr-2" />
              Detalhes da Transação
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Valor {isBuyMode ? 'investido' : 'vendido'}:</span>
                <span className="font-medium text-gray-900">
                  {amount.toFixed(2)} USDT
                </span>
              </div>
              {fees.transaction > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Taxa de transação ({fees.transaction}%):</span>
                  <span className="font-medium text-gray-900">
                    {totalFees.toFixed(2)} USDT
                  </span>
                </div>
              )}
              {fees.gas > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Taxa de gas (estimada):</span>
                  <span className="font-medium text-gray-900">
                    {fees.gas} USDT
                  </span>
                </div>
              )}
              <div className="pt-2 border-t border-gray-200">
                <div className="flex justify-between">
                  <span className="text-gray-900 font-semibold">
                    {isBuyMode ? 'Total a pagar:' : 'Você receberá:'}
                  </span>
                  <span className={`font-bold ${isBuyMode ? 'text-red-600' : 'text-green-600'}`}>
                    {Math.abs(totalWithFees).toFixed(2)} USDT
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-3">Sobre o Ativo</h4>
          <div className="space-y-2 text-sm max-[400px]:text-xs">
            
            <div className="flex justify-between">
              <span className="text-gray-600 max-w-[50%]">Rendimento esperado:</span>
              <span className="font-medium text-green-600 max-[400px]:max-w-[50%]">
                {product?.currentReturn}% APY
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 max-w-[50%]">Categoria de risco:</span>
              <span className={`font-medium ${
                product?.categoryColor === 'green' ? 'text-green-600' :
                product?.categoryColor === 'red' ? 'text-red-600' :
                'text-yellow-600'
              }`}>
                {product?.category}
              </span>
            </div>
          </div>
        </div>

        <div className="flex space-x-3 pt-4 flex-wrap gap-3">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={onClose}
          >
            Cancelar
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={
              !(
                amount > 0 && // precisa ser maior que zero
                (
                  // se for venda → precisa ser menor ou igual ao saldo
                  (!isBuyMode && amount <= userBalance)
                )
              )
            }
            className={`flex-1 bg-gradient-to-r ${
              isBuyMode 
                ? (product?.categoryColor === 'green' ? 'from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700' :
                  product?.categoryColor === 'red' ? 'from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700' :
                  'from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600')
                : 'from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700'
            } text-white transition-all duration-200`}
          >
            {isBuyMode ? (
              <>
                <TrendingUp className="w-4 h-4 mr-2" />
                Confirmar Compra
              </>
            ) : (
              <>
                <TrendingDown className="w-4 h-4 mr-2" />
                Confirmar Venda
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div className="flex items-start space-x-2">
          <Info className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-yellow-800">
            <p className="font-medium mb-1">Importante:</p>
            <p>
              {isBuyMode 
                ? 'Investimentos em criptomoedas envolvem riscos. Certifique-se de ler e compreender todos os riscos antes de investir. Nunca invista mais do que pode perder.'
                : 'Ao vender seus ativos, você deixará de receber os rendimentos futuros. As taxas de transação serão deduzidas do valor total.'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
