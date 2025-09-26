import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Client(){
  return (
    <div>
      <Header />
      <main className="container py-12">
        <h1 className="text-2xl font-bold">Client area & bookings</h1>
        <p className="mt-4">Open your job portal and bookings in GetSoapy.</p>
        <a href={process.env.NEXT_PUBLIC_GETSOAPY_URL} target="_blank" rel="noreferrer" className="mt-4 inline-block px-4 py-2 border rounded">Open GetSoapy</a>
      </main>
      <Footer />
    </div>
  )
}
