import Header from '../../components/Header'
import WebDevSection from '../../components/WebDevSection'
import Footer from '../../components/Footer'

export default function WebDevPage() {
  return (
    <div className="container">
      <Header />
      <main>
        <WebDevSection />
      </main>
      <Footer />
    </div>
  )
}
