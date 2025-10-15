import Hero from '../../components/Hero'
import RiskCategories from '../../components/RiskCategories'
import FeaturedProducts from '../../components/FeaturedProducts'
import InvestmentTable from '@/components/InvestmentTable'
import { useState } from 'react';

export default function Home({ signer }) {
  const [strategyFilter, setStrategyFilter] = useState(null);
  return (
    <>
      <Hero />
      <InvestmentTable pageSize={10} strategyFilter={strategyFilter} />
      <RiskCategories setStrategyFilter={setStrategyFilter} />
      <FeaturedProducts signer={signer} />
    </>
  )
}
