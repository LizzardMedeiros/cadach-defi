import Hero from '../../components/Hero'
import RiskCategories from '../../components/RiskCategories'
import FeaturedProducts from '../../components/FeaturedProducts'
import InvestmentTable from '@/components/InvestmentTable'

export default function Home({ signer }) {
  return (
    <>
      <Hero />
      <InvestmentTable  initialPageSize={10}  />
      <RiskCategories />
      <FeaturedProducts signer={signer} />
    </>
  )
}
