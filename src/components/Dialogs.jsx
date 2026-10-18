import { useEffect, useId, useRef, useState } from 'react'
import { Check, CheckCircle2, LockKeyhole, X } from 'lucide-react'
import { AppointmentButton, Button, Eyebrow } from './UI'

export function Dialog({ title, children, onClose, className = '' }) {
  const ref = useRef(null)
  const titleId = useId()
  useEffect(() => {
    const dialog = ref.current
    const opener = document.activeElement
    const previousOverflow = document.body.style.overflow
    dialog.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      dialog.close()
      document.body.style.overflow = previousOverflow
      if (opener instanceof HTMLElement && opener.isConnected) {
        opener.focus({ preventScroll: true })
      }
    }
  }, [])
  return (
    <dialog
      ref={ref}
      className={`dialog ${className}`}
      aria-labelledby={titleId}
      onCancel={onClose}
      onKeyDown={(event) => {
        if (event.key !== 'Tab') return
        const focusable = [
          ...event.currentTarget.querySelectorAll(
            'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex="0"]',
          ),
        ].filter((element) => element.getClientRects().length > 0)
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last?.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first?.focus()
        }
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          const bounds = event.currentTarget.getBoundingClientRect()
          if (
            event.clientX < bounds.left ||
            event.clientX > bounds.right ||
            event.clientY < bounds.top ||
            event.clientY > bounds.bottom
          )
            onClose()
        }
      }}
    >
      <button
        className="dialog-close"
        onClick={onClose}
        aria-label="Close dialog"
      >
        <X size={21} aria-hidden="true" />
      </button>
      <div className="dialog-heading">
        <Eyebrow>Origin Health</Eyebrow>
        <h2 id={titleId}>{title}</h2>
      </div>
      {children}
    </dialog>
  )
}
export function ServiceDialog({ service, onClose, onBook }) {
  return (
    <Dialog title={service.title} onClose={onClose}>
      <p className="dialog-intro">{service.detail}</p>
      <ul className="detail-list">
        {service.includes.map((item) => (
          <li key={item}>
            <Check size={18} aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
      <p className="small-note">
        Illustrative services for this demo website. Availability, clinical
        suitability, and pricing have not been established.
      </p>
      <AppointmentButton onClick={onBook} />
    </Dialog>
  )
}
export function PrivacyDialog({ onClose }) {
  return (
    <Dialog title="Your privacy, respected." onClose={onClose}>
      <div className="privacy-copy">
        <p>
          This is a demonstration website, not an active healthcare or booking
          service.
        </p>
        <p>
          The appointment form is validated only in your browser. Form entries
          are not transmitted, logged, or saved to browser storage. They are
          cleared when you close the form or complete the demo. Please use
          example details and do not enter medical information.
        </p>
        <p>
          Images and fonts are hosted with this website. No analytics,
          advertising trackers, or cookies are added by this application.
        </p>
      </div>
    </Dialog>
  )
}
export function AppointmentDialog({ onClose }) {
  const [values, setValues] = useState({ name: '', email: '', day: '' })
  const [errors, setErrors] = useState({})
  const [complete, setComplete] = useState(false)
  const formRef = useRef(null)
  const successRef = useRef(null)
  const localDate = new Date()
  const today = `${localDate.getFullYear()}-${String(localDate.getMonth() + 1).padStart(2, '0')}-${String(localDate.getDate()).padStart(2, '0')}`
  useEffect(() => {
    if (complete) successRef.current?.focus()
  }, [complete])
  const update = (event) => {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: undefined }))
  }
  const submit = (event) => {
    event.preventDefault()
    const next = {}
    if (values.name.trim().length < 2)
      next.name = 'Enter an example name with at least 2 characters.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
      next.email = 'Enter a valid example email, such as alex@example.com.'
    if (
      values.day &&
      (values.day < today || !formRef.current.elements.day.validity.valid)
    )
      next.day = 'Choose today or a future date.'
    setErrors(next)
    if (Object.keys(next).length) {
      formRef.current.elements[Object.keys(next)[0]].focus()
      return
    }
    setValues({ name: '', email: '', day: '' })
    setComplete(true)
  }
  return (
    <Dialog
      title={complete ? 'A thoughtful first step.' : 'Let’s make time for you.'}
      onClose={onClose}
      className="appointment-dialog"
    >
      {complete ? (
        <div
          className="form-success"
          role="status"
          tabIndex={-1}
          ref={successRef}
        >
          <CheckCircle2 size={42} strokeWidth={1.3} aria-hidden="true" />
          <h3>Demo complete</h3>
          <p>
            No appointment has been booked. Nothing was sent or saved, and your
            example details have been cleared.
          </p>
          <Button onClick={onClose}>Back to Origin Health</Button>
        </div>
      ) : (
        <>
          <div className="demo-notice">
            <span className="demo-tag">Demo only</span>
            <p>
              Booking is not live. Try the form using example details. No
              appointment will be made.
            </p>
          </div>
          <form ref={formRef} onSubmit={submit} noValidate>
            <div className="form-field">
              <label htmlFor="appointment-name">
                Your name <span>(required)</span>
              </label>
              <input
                id="appointment-name"
                name="name"
                placeholder="Alex Morgan"
                autoComplete="off"
                maxLength={60}
                value={values.name}
                onChange={update}
                required
                aria-invalid={Boolean(errors.name)}
                aria-describedby={
                  errors.name ? 'name-error name-hint' : 'name-hint'
                }
              />
              <span className="field-hint" id="name-hint">
                Use an example name for this demo.
              </span>
              {errors.name && (
                <p className="field-error" id="name-error">
                  {errors.name}
                </p>
              )}
            </div>
            <div className="form-field">
              <label htmlFor="appointment-email">
                Email address <span>(required)</span>
              </label>
              <input
                id="appointment-email"
                type="email"
                name="email"
                inputMode="email"
                placeholder="alex@example.com"
                autoComplete="off"
                maxLength={120}
                value={values.email}
                onChange={update}
                required
                aria-invalid={Boolean(errors.email)}
                aria-describedby={
                  errors.email ? 'email-error email-hint' : 'email-hint'
                }
              />
              <span className="field-hint" id="email-hint">
                Use an example address. We won’t send an email.
              </span>
              {errors.email && (
                <p className="field-error" id="email-error">
                  {errors.email}
                </p>
              )}
            </div>
            <div className="form-field">
              <label htmlFor="appointment-day">
                Preferred day <span>(optional)</span>
              </label>
              <input
                id="appointment-day"
                type="date"
                name="day"
                min={today}
                max="2100-12-31"
                value={values.day}
                onChange={update}
                aria-invalid={Boolean(errors.day)}
                aria-describedby={
                  errors.day ? 'day-error day-hint' : 'day-hint'
                }
              />
              <span className="field-hint" id="day-hint">
                For demonstration only; this does not check availability.
              </span>
              {errors.day && (
                <p className="field-error" id="day-error">
                  {errors.day}
                </p>
              )}
            </div>
            <p className="form-privacy">
              <LockKeyhole size={15} aria-hidden="true" />
              Please do not enter symptoms or other health information. Nothing
              is sent or stored.
            </p>
            <Button type="submit" className="form-submit">
              Complete demo request
            </Button>
          </form>
        </>
      )}
    </Dialog>
  )
}
