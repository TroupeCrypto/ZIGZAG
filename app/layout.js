import './globals.css'

export const metadata = {
  title: 'ZIG ZAG - Deluxe Hub Space',
  description: 'Deluxe and psychedelic hub space for music and digital artist ZIG ZAG',
  keywords: ['music', 'art', 'nft', 'crypto', 'web3', 'digital-art', 'blockchain'],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
