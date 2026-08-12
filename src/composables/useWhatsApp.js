import { computed } from 'vue'
import { siteData } from '@/constants/site'

export function useWhatsApp() {
  const number = siteData.whatsapp.number.replace(/\D/g, '')

  const createWhatsAppUrl = (message) => {
    const text = encodeURIComponent(message)
    return `https://wa.me/${number}?text=${text}`
  }

  const whatsappUrl = computed(() =>
    createWhatsAppUrl(siteData.whatsapp.defaultMessage),
  )

  return { createWhatsAppUrl, whatsappUrl }
}
