export default function TokenCard({
  logo,
  code,
  company,
  tags,
  status,
  rate,
  cdi,
  investors,
  dueDate,
  amount,
  raised,
  available,
  finalizedAt,
}) {
  const progress = Math.round((raised / amount) * 100)

  return (
    <div className="bg-white rounded-2xl shadow-sm border p-5 w-full h-full">
      {/* Cabeçalho */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-bold text-lg text-gray-900">{code}</h2>
          <img src={logo} alt={company} className="w-10 h-10 rounded-full object-contain" />
        </div>
        <p className="text-sm text-gray-600 mb-3">Por {company}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span
              key={index}
              className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                tag.color ? tag.color : 'bg-gray-100 text-gray-700'
              }`}
            >
              {tag.label}
            </span>
          ))}
        </div>

        {/* Rentabilidade */}
        <div className="bg-green-50 rounded-lg p-3 mb-4">
          <p className="text-sm text-gray-600">Rentabilidade</p>
          <p className="text-xl font-semibold text-green-600">
            {rate}% <span className="text-sm font-normal">ao ano</span>
          </p>
          <p className="text-xs text-gray-500">Equivalente a {cdi}% do CDI</p>
        </div>

        {/* Dados */}
        <div className="text-sm space-y-1 mb-4">
          <p className="text-gray-700">
            <strong >Número de investidores:</strong> {investors}
          </p>
          <p className="text-gray-700">
            <strong >{status === 'Finalizada' ? 'Liquidado em:' : 'Vencimento:'}</strong>{' '}
            {dueDate}
          </p>
          <p className="text-gray-700">
            <strong className="text-gray-700">Volume de captação:</strong>{' '}
            {amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </p>
        </div>

        {/* Barra de progresso */}
        <div>
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>
              Captado:{' '}
              {raised.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
            <div
              className="bg-purple-400 h-2 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-600">
            Disponível:{' '}
            {available.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </p>
        </div>

        {status === 'Finalizada' && finalizedAt && (
          <p className="text-xs text-gray-500 mt-2">
            Captação finalizada: {finalizedAt}
          </p>
        )}
      </div>
    </div>
  )
}
