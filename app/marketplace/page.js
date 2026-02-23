import Header from '../../components/Header'
import Marketplace from '../../components/Marketplace'
import Footer from '../../components/Footer'

export const metadata = {
  title: 'Marketplace | ZIG ZAG'
}

export default function MarketplacePage() {
  return (
    <div className="container">
      <Header />
      <main>
        <Marketplace />
      </main>
      <Footer />
    </div>
  )
}
