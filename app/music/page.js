import Header from '../../components/Header'
import MusicSection from '../../components/MusicSection'
import Footer from '../../components/Footer'

export const metadata = {
  title: 'Music | ZIG ZAG'
}

export default function MusicPage() {
  return (
    <div className="container">
      <Header />
      <main>
        <MusicSection />
      </main>
      <Footer />
    </div>
  )
}
