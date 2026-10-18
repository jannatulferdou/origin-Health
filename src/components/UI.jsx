import { ArrowUpRight } from 'lucide-react'
export function Brand({ footer = false, onClick }) {
  return (
    <a
      className={`brand ${footer ? 'brand--footer' : ''}`}
      href="#home"
      onClick={onClick}
      aria-label="Origin Health home"
    >
      <span className="brand-frame">
        <img
          className="brand-logo"
          src="/brand/origin-health-logo.png"
          alt="Origin Health"
          width="1536"
          height="1024"
          decoding="async"
        />
      </span>
    </a>
  )
}
export function Button({
  children,
  onClick,
  variant = '',
  className = '',
  type = 'button',
  ...props
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`button ${variant ? `button--${variant}` : ''} ${className}`}
      {...props}
    >
      {children}
      <ArrowUpRight size={17} aria-hidden="true" />
    </button>
  )
}
export function AppointmentButton(props) {
  return <Button {...props}>Try appointment demo</Button>
}
export function Eyebrow({ children, light = false }) {
  return (
    <p className={`eyebrow ${light ? 'eyebrow--light' : ''}`}>
      <span aria-hidden="true" />
      {children}
    </p>
  )
}
