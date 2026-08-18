<script setup>
import { siInstagram, siFacebook, siTiktok } from 'simple-icons'
import { siteData } from '@/constants/site'

const iconPaths = {
  Instagram: siInstagram.path,
  TikTok: siTiktok.path,
  Facebook: siFacebook.path,
}

const socials = (siteData.footer.socials || []).filter((s) => iconPaths[s.platform])
</script>

<template>
  <div class="social-floating" aria-label="Redes sociales de Urbanikawsay">
    <a
      v-for="social in socials"
      :key="social.platform"
      :href="social.url"
      target="_blank"
      rel="noopener noreferrer"
      class="social-floating-btn"
      :aria-label="'Visitar Urbanikawsay en ' + social.platform"
      :title="social.platform"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path :d="iconPaths[social.platform]" />
      </svg>
    </a>
  </div>
</template>

<style scoped>
.social-floating {
  position: fixed;
  right: 1rem;
  bottom: 5.5rem;
  z-index: 39;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}
.social-floating-btn {
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 9999px;
  display: grid;
  place-items: center;
  background: var(--color-surface-flat);
  color: var(--color-brand-primary);
  border: 1px solid var(--color-border-flat);
  box-shadow: var(--shadow-aero);
  text-decoration: none;
  transition: transform 0.2s ease, background 0.2s ease, color 0.2s ease;
}
.social-floating-btn:hover {
  transform: scale(1.08);
  background: var(--color-brand-primary);
  color: var(--color-text-inverse);
}
.social-floating-btn:focus-visible {
  outline: 3px solid var(--color-focus-ring);
  outline-offset: 2px;
}
.social-floating-btn svg {
  width: 1.3rem;
  height: 1.3rem;
}

@media (prefers-reduced-motion: reduce) {
  .social-floating-btn {
    transition: none;
  }
}
</style>
