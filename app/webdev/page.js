import Header from '../../components/Header'
import WebDevSection from '../../components/WebDevSection'
import Footer from '../../components/Footer'

export const metadata = {
  title: 'Web Dev | ZIG ZAG'
}

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
