import Hero from '../../components/Hero'
import FeaturedProducts from '../../components/FeaturedProducts'

export default function Home({ signer }) {
  return (
    <>
      <Hero />
      <FeaturedProducts signer={signer} />
    </>
  )
}
