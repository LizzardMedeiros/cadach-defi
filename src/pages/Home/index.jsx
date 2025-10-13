import Hero from '../../components/Hero'
import RiskCategories from '../../components/RiskCategories'
import FeaturedProducts from '../../components/FeaturedProducts'

export default function Home({ signer }) {
  return (
    <>
      <Hero />
      <RiskCategories />
      <FeaturedProducts signer={signer} />
    </>
  )
}
