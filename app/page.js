'use client'

import { useEffect } from 'react'
import MimoAssistant from '../components/MimoAssistant'
import Header from '../components/Header'
import Navigation from '../components/Navigation'
import MusicSection from '../components/MusicSection'
import ArtGallery from '../components/ArtGallery'
import CryptoHub from '../components/CryptoHub'
import WebDevSection from '../components/WebDevSection'
import Marketplace from '../components/Marketplace'
import Footer from '../components/Footer'

export default function Home() {
  useEffect(() => {
    console.log('🎨 ZIG ZAG Hub Loaded')
  }, [])

  return (
    <>
      <MimoAssistant />
      <div className="container">
        <Header />
        <Navigation />
        <main>
          <MusicSection />
          <ArtGallery />
          <CryptoHub />
          <WebDevSection />
          <Marketplace />
        </main>
        <Footer />
      </div>
    </>
  )
}
