// src/components/InvestmentList.jsx
import TokenCard from '../../components/TokenCard';

export default function InvestmentList() {
  const investments = [
    {
      code: 'KAVAK6SR01',
      company: 'Kavak Tecnologia e Comércio S.A.',
      logo: '../../../public/logos/bitCoinOrange.png',
      tags: [
        { label: 'Em captação', color: 'bg-green-100 text-green-700' },
        { label: 'Sênior', color: 'bg-purple-100 text-purple-700' },
        { label: 'Longo prazo', color: 'bg-pink-100 text-pink-700' },
        { label: 'CR', color: 'bg-gray-100 text-gray-600' },
        { label: 'RCVM 88', color: 'bg-gray-100 text-gray-600' },
      ],
      status: 'Em captação',
      rate: 21.27,
      cdi: 139.22,
      investors: 5,
      dueDate: '28/10/2026',
      amount: 175000,
      raised: 10859.13,
      available: 164140.87,
    },
    {
      code: 'MLLR1SR02',
      company: 'Mellro Serviços de TI Ltda.',
      logo: '/logos/mellro.png',
      tags: [
        { label: 'Em captação', color: 'bg-green-100 text-green-700' },
        { label: 'Sênior', color: 'bg-purple-100 text-purple-700' },
        { label: 'Curto prazo', color: 'bg-pink-100 text-pink-700' },
        { label: 'CR', color: 'bg-gray-100 text-gray-600' },
        { label: 'RCVM 88', color: 'bg-gray-100 text-gray-600' },
      ],
      status: 'Em captação',
      rate: 18.57,
      cdi: 122.83,
      investors: 1,
      dueDate: '08/04/2026',
      amount: 200000,
      raised: 10000,
      available: 190000,
    },
    {
      code: 'MOV2SR03',
      company: 'Movens Intelligence & Capital',
      logo: '/logos/movens.png',
      tags: [
        { label: 'Em captação', color: 'bg-green-100 text-green-700' },
        { label: 'Sênior', color: 'bg-purple-100 text-purple-700' },
        { label: 'Médio prazo', color: 'bg-pink-100 text-pink-700' },
        { label: 'CR', color: 'bg-gray-100 text-gray-600' },
        { label: 'RCVM 88', color: 'bg-gray-100 text-gray-600' },
      ],
      status: 'Em captação',
      rate: 21.0,
      cdi: 137.54,
      investors: 32,
      dueDate: '15/04/2026',
      amount: 100000,
      raised: 18444.33,
      available: 81555.67,
    },
    {
      code: 'CFIR1SR13',
      company: 'ConferIR Tecnologia S.A.',
      logo: '/logos/conferir.png',
      tags: [
        { label: 'Finalizada', color: 'bg-blue-100 text-blue-700' },
        { label: 'Sênior', color: 'bg-purple-100 text-purple-700' },
        { label: 'Curto prazo', color: 'bg-pink-100 text-pink-700' },
        { label: 'CR', color: 'bg-gray-100 text-gray-600' },
        { label: 'RCVM 88', color: 'bg-gray-100 text-gray-600' },
      ],
      status: 'Finalizada',
      rate: 23.87,
      cdi: 154.61,
      investors: 64,
      dueDate: '14/08/2025',
      amount: 75024.96,
      raised: 75024.96,
      available: 0,
      finalizedAt: '11/10/2025',
    },
  ]

  return (
    <div className=" py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Oportunidades de investimento</h2>
        <div className="grid gap-6 justify-items-center
          grid-cols-[repeat(auto-fit,minmax(280px,1fr))]">
          {investments.map((item, index) => (
            <TokenCard key={index} {...item} />
          ))}
        </div>
      </div>
    </div>
  )
}
