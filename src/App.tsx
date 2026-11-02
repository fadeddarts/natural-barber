import { BookingProvider } from "./context/BookingContext"
import { Barbers } from "./components/Barbers"
import { BookingModal } from "./components/BookingModal"
import { Experience } from "./components/Experience"
import { Footer } from "./components/Footer"
import { Gallery } from "./components/Gallery"
import { Hero } from "./components/Hero"
import { Location } from "./components/Location"
import { Nav } from "./components/Nav"
import { Philosophy } from "./components/Philosophy"
import { SectionIndex } from "./components/SectionIndex"
import { Services } from "./components/Services"
import { Testimonials } from "./components/Testimonials"
import { ProgressBar } from "./components/ui"

export default function App() {
  return (
    <BookingProvider>
      <a href="#content" className="skip-link">
        Skip to content
      </a>
      <ProgressBar />
      <Nav />
      <main id="content" tabIndex={-1} className="outline-none">
        <Hero />
        <Philosophy />
        <Services />
        <Barbers />
        <Experience />
        <Gallery />
        <Testimonials />
        <Location />
      </main>
      <Footer />
      <SectionIndex />
      <BookingModal />
    </BookingProvider>
  )
}
