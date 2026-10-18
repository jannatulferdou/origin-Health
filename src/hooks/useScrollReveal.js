import { useEffect, useRef } from 'react'

export default function useScrollReveal() {
  const ref = useRef(null)

  useEffect(() => {
    const root = ref.current
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (
      !root ||
      preference.matches ||
      !('IntersectionObserver' in window) ||
      !('animate' in Element.prototype)
    )
      return

    const active = new Set()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const { target, isIntersecting } of entries) {
          if (!isIntersecting) continue
          observer.unobserve(target)
          // Keep keyboard navigation immediate, even before the first reveal.
          if (preference.matches || target.matches(':focus-within')) continue
          const animation = target.animate(
            [
              { opacity: 0.55, transform: 'translateY(12px)' },
              { opacity: 1, transform: 'none' },
            ],
            { duration: 560, easing: 'cubic-bezier(0.22, 1, 0.36, 1)' },
          )
          active.add(animation)
          animation.onfinish = () => active.delete(animation)
          animation.oncancel = () => active.delete(animation)
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -24px 0px' },
    )

    // No hidden initial state: content stays available without motion support.
    root
      .querySelectorAll('[data-reveal]')
      .forEach((node) => observer.observe(node))
    const stop = () => {
      observer.disconnect()
      active.forEach((animation) => animation.cancel())
      active.clear()
    }
    const onPreferenceChange = () => {
      if (preference.matches) stop()
    }
    const onFocus = (event) => {
      active.forEach((animation) => {
        if (animation.effect.target.contains(event.target)) animation.cancel()
      })
    }
    preference.addEventListener('change', onPreferenceChange)
    root.addEventListener('focusin', onFocus)
    return () => {
      stop()
      preference.removeEventListener('change', onPreferenceChange)
      root.removeEventListener('focusin', onFocus)
    }
  }, [])

  return ref
}
