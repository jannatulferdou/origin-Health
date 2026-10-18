import {
  ArrowDown,
  ArrowUpRight,
  CalendarDays,
  Check,
  CircleHelp,
  Heart,
  HeartHandshake,
  Leaf,
  MessageCircle,
  Sprout,
} from 'lucide-react'
import { useState } from 'react'
import Header from './components/Header'
import useScrollReveal from './hooks/useScrollReveal'
import { AppointmentButton, Brand, Button, Eyebrow } from './components/UI'
import {
  AppointmentDialog,
  PrivacyDialog,
  ServiceDialog,
} from './components/Dialogs'
import { services } from './data/services'
import consultationImage from './assets/images/calm-consultation.jpg'
import consultationSmall from './assets/images/calm-consultation-small.jpg'
import wellnessImage from './assets/images/wellness-coast.jpg'
import wellnessSmall from './assets/images/wellness-coast-small.jpg'
import './App.css'

const benefits = [
  { icon: HeartHandshake, text: 'Care built around you' },
  { icon: MessageCircle, text: 'Space to be heard' },
  { icon: Sprout, text: 'A whole-person perspective' },
  { icon: CalendarDays, text: 'A thoughtful next step' },
]
const principles = [
  {
    icon: MessageCircle,
    title: 'Start with your priorities.',
    text: 'Bring the questions you want to discuss and what you hope to get from the visit.',
  },
  {
    icon: Heart,
    title: 'Look at the bigger picture.',
    text: 'A conversation about relevant health history, current medications, and the routines that shape your day.',
  },
  {
    icon: Sprout,
    title: 'Understand the next step.',
    text: 'Discuss possible follow-up, questions to revisit, and when another conversation may be useful.',
  },
]
function Hero({ onBook }) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-copy">
        <Eyebrow>A more personal kind of care</Eyebrow>
        <h1 id="hero-title">
          Care that
          <br />
          begins <em>with you.</em>
        </h1>
        <p className="hero-description text-base leading-relaxed">
          Primary care for everyday questions, routine check-ins, and ongoing
          support.
        </p>
        <div className="hero-actions">
          <AppointmentButton onClick={onBook} />
          <a className="text-link" href="#care">
            Explore our care <ArrowDown size={17} aria-hidden="true" />
          </a>
        </div>
        <p className="hero-note text-sm leading-relaxed">
          <span aria-hidden="true" />
          Booking is not live. Use example details.
        </p>
      </div>
      <figure className="hero-photo">
        <div className="hero-image">
          <img
            src={consultationImage}
            srcSet={`${consultationSmall} 800w, ${consultationImage} 1440w`}
            sizes="(max-width: 767px) 600px, (max-width: 900px) 100vw, 900px"
            width="1440"
            height="960"
            alt="A smiling clinician and a seated man sharing a conversation in a softly lit consultation room"
            fetchPriority="high"
          />
        </div>
        <figcaption>
          <span>A little more listening. A little more you.</span>
          <HeartHandshake size={20} strokeWidth={1.5} aria-hidden="true" />
        </figcaption>
      </figure>
    </section>
  )
}
function TrustStrip() {
  return (
    <section className="trust-strip" aria-label="Our care philosophy">
      <div className="container trust-grid">
        {benefits.map(({ icon: Icon, text }) => (
          <div className="trust-item" key={text}>
            <Icon size={22} strokeWidth={1.4} aria-hidden="true" />
            <span>{text}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
function Services({ onSelect }) {
  return (
    <section
      className="section services"
      id="care"
      aria-labelledby="care-heading"
    >
      <div className="container">
        <Eyebrow>Care for your kind of life</Eyebrow>
        <div className="section-heading" data-reveal>
          <h2 id="care-heading">
            Good care.
            <br />
            At every turn.
          </h2>
          <p className="text-base leading-relaxed">
            Explore the care concept: routine visits, prevention, ongoing
            support, and everyday wellness.
          </p>
        </div>
        <div className="service-grid" data-reveal>
          {services.map((service, index) => {
            const Icon = service.icon
            const featured = index === 0
            return (
              <article
                className={`service-card ${featured ? 'service-card--featured' : ''}`}
                key={service.id}
              >
                <div className="service-top">
                  <span className="service-icon">
                    <Icon size={32} strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  {featured && (
                    <span className="service-kicker">Your starting point</span>
                  )}
                </div>
                <div className="service-content">
                  <h3>{service.title}</h3>
                  <p className="text-base leading-relaxed">
                    {service.description}
                  </p>
                  {featured && (
                    <ul
                      className="service-highlights"
                      aria-label="Primary care topics"
                    >
                      {service.includes.map((item) => (
                        <li key={item}>
                          <Check
                            size={18}
                            strokeWidth={1.6}
                            aria-hidden="true"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <button
                  className="service-link"
                  onClick={() => onSelect(service)}
                  aria-label={`Explore ${service.title.toLowerCase()}`}
                >
                  {featured ? 'Explore primary care' : 'Explore care'}
                  <ArrowUpRight size={21} aria-hidden="true" />
                </button>
              </article>
            )
          })}
        </div>
        <p className="services-note text-sm leading-relaxed">
          <CircleHelp size={18} aria-hidden="true" /> Not sure where to start?
          <button onClick={() => onSelect(services[0])}>
            Let&apos;s take the first step together.
          </button>
        </p>
      </div>
    </section>
  )
}
function Wellness({ onSelect }) {
  return (
    <section
      className="wellness-section"
      id="wellness"
      aria-labelledby="wellness-heading"
    >
      <div className="container wellness-grid">
        <div className="wellness-photo" data-reveal>
          <img
            src={wellnessImage}
            srcSet={`${wellnessSmall} 640w, ${wellnessImage} 1100w`}
            sizes="(max-width: 767px) 640px, 1000px"
            width="1100"
            height="733"
            alt="A woman enjoying a walk beside the waves on a quiet, sunlit beach"
            loading="lazy"
            decoding="async"
          />
          <div className="wellness-photo-label">
            <Leaf size={16} aria-hidden="true" /> A little space to feel like
            you.
          </div>
        </div>
        <div className="wellness-copy" data-reveal>
          <Eyebrow>Wellness, woven into life</Eyebrow>
          <h2 id="wellness-heading">
            A healthier rhythm.
            <br />
            <em>Your own pace.</em>
          </h2>
          <p>
            Movement, nourishment, and rest are part of the wellness
            conversation.
          </p>
          <p>
            Explore your current routines, identify what feels manageable, and
            consider one small change at a time.
          </p>
          <ul className="wellness-list">
            {[
              'Movement that fits your schedule',
              'Everyday food and nourishment habits',
              'Sleep, rest, and time to recharge',
            ].map((item) => (
              <li key={item}>
                <Check size={17} strokeWidth={1.5} aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
          <Button variant="outline" onClick={() => onSelect(services[3])}>
            Explore wellness
          </Button>
        </div>
      </div>
    </section>
  )
}
function Approach() {
  return (
    <section
      className="section approach"
      id="approach"
      aria-labelledby="approach-heading"
    >
      <div className="container">
        <div className="approach-heading" data-reveal>
          <div>
            <Eyebrow>The Origin approach</Eyebrow>
            <h2 id="approach-heading">
              A first visit,
              <br />
              made clearer.
            </h2>
          </div>
          <p className="text-base leading-relaxed">
            A first-visit outline for this care concept: share your priorities,
            review your health context, and discuss next steps.
          </p>
        </div>
        <div className="principles-grid" data-reveal>
          {principles.map(({ icon: Icon, title, text }) => (
            <article className="principle" key={title}>
              <span className="principle-icon">
                <Icon size={30} strokeWidth={1.5} aria-hidden="true" />
              </span>
              <h3>{title}</h3>
              <p className="text-base leading-relaxed">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
function AppointmentCTA({ onBook }) {
  return (
    <section
      className="appointment-section"
      aria-labelledby="appointment-heading"
    >
      <div className="container appointment-inner" data-reveal>
        <div className="appointment-copy">
          <Eyebrow light>A good place to begin</Eyebrow>
          <h2 id="appointment-heading">
            Your next chapter
            <br />
            starts with a conversation.
          </h2>
        </div>
        <div className="appointment-action">
          <p className="text-base leading-relaxed">
            Try the form with example details.
            <br />
            Nothing is sent or saved.
          </p>
          <AppointmentButton variant="light" onClick={onBook} />
          <span className="cta-demo-note text-sm leading-relaxed">
            Demo experience. Booking is not live.
          </span>
        </div>
      </div>
    </section>
  )
}
function Footer({ onPrivacy, onBook }) {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-intro">
            <Brand footer />
            <p>
              Thoughtful care.
              <br />
              For the whole of you.
            </p>
          </div>
          <nav className="footer-links" aria-label="Footer navigation">
            <div>
              <span>Explore</span>
              <a href="#care">Our care</a>
              <a href="#wellness">Wellness</a>
              <a href="#approach">Our approach</a>
            </div>
            <div>
              <span>Let’s connect</span>
              <button onClick={onBook}>
                Appointment demo <ArrowUpRight size={14} aria-hidden="true" />
              </button>
              <button onClick={onPrivacy}>Privacy & your data</button>
              <a href="#home">
                Back to top <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            </div>
          </nav>
          <div className="footer-signoff">
            <Leaf size={20} strokeWidth={1.2} aria-hidden="true" />
            <p>
              Rooted in care.
              <br />
              Growing with you.
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} Origin Health. A demonstration website.
          </p>
          <p>
            Booking is not live. No medical advice or clinical services are
            provided.
          </p>
        </div>
      </div>
    </footer>
  )
}
export default function App() {
  const [dialog, setDialog] = useState(null)
  const contentRef = useScrollReveal()
  const book = () => setDialog({ type: 'appointment' })
  const select = (service) => setDialog({ type: 'service', service })
  const close = () => setDialog(null)
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div id="home" />
      <Header onBook={book} />
      <main id="main-content" ref={contentRef}>
        <Hero onBook={book} />
        <TrustStrip />
        <Services onSelect={select} />
        <Wellness onSelect={select} />
        <Approach />
        <AppointmentCTA onBook={book} />
      </main>
      <Footer onPrivacy={() => setDialog({ type: 'privacy' })} onBook={book} />
      {dialog?.type === 'appointment' && (
        <AppointmentDialog key="appointment" onClose={close} />
      )}
      {dialog?.type === 'service' && (
        <ServiceDialog
          key={dialog.service.id}
          service={dialog.service}
          onClose={close}
          onBook={book}
        />
      )}
      {dialog?.type === 'privacy' && (
        <PrivacyDialog key="privacy" onClose={close} />
      )}
    </>
  )
}
