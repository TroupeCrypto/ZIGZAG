import Header from '../../components/Header'
import ArtGallery from '../../components/ArtGallery'
import Footer from '../../components/Footer'

export const metadata = {
  title: 'Art | ZIG ZAG'
}

export default function ArtPage() {
  return (
    <div className="container">
      <Header />
      <main>
        <ArtGallery />
      </main>
      <Footer />
    </div>
  )
}
