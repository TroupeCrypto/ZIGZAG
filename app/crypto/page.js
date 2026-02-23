import Header from '../../components/Header'
import CryptoHub from '../../components/CryptoHub'
import Footer from '../../components/Footer'

export default function CryptoPage() {
  return (
    <div className="container">
      <Header />
      <main>
        <CryptoHub />
      </main>
      <Footer />
    </div>
  )
}
