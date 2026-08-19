import { siteData } from '@/constants/site'

// Default messenger page handle for Urbanikawsay.
const DEFAULT_PAGE = 'UrbanikawsayInmobiliaria'

// Messenger truncates long text; keep comfortably under the limit.
export const MESSENGER_TEXT_LIMIT = 1500

/**
 * Builds a pre-filled Messenger deep link: https://m.me/<page>?text=...
 * When the visitor submits it in Messenger, the message lands in the
 * Page's inbox (Meta Business Suite -> Bandeja). No email involved.
 */
export function useMessenger() {
  // Allow an env override; otherwise fall back to the Facebook handle from
  // site data, or the hard-coded default.
  const page =
    import.meta.env.VITE_MESSENGER_PAGE ||
    (siteData.footer && siteData.footer.messengerPage) ||
    DEFAULT_PAGE

  const buildMessengerUrl = ({ nombre, email, telefono, mensaje, origen }) => {
    const contactLine = [nombre, email, telefono].filter(Boolean).join(' · ')
    const origin = origen ? `\nOrigen: ${origen}` : ''
    const body = `Hola, soy ${contactLine}.\n\n${mensaje}${origin}`.slice(0, MESSENGER_TEXT_LIMIT)
    return `https://m.me/${page}?text=${encodeURIComponent(body)}`
  }

  const openMessenger = (payload) => {
    const url = buildMessengerUrl(payload)
    // window.open returns null when the popup is blocked; caller handles it.
    return typeof window !== 'undefined' ? window.open(url, '_blank', 'noopener,noreferrer') : null
  }

  const copyText = async (payload) => {
    const contactLine = [payload.nombre, payload.email, payload.telefono].filter(Boolean).join(' · ')
    const origin = payload.origen ? `\nOrigen: ${payload.origen}` : ''
    const text = `Hola, soy ${contactLine}.\n\n${payload.mensaje}${origin}`.slice(0, MESSENGER_TEXT_LIMIT)
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
      return true
    }
    return false
  }

  return { page, buildMessengerUrl, openMessenger, copyText }
}
