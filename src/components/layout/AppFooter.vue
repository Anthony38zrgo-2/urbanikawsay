<script setup>
import { siFacebook, siInstagram, siTiktok } from 'simple-icons'
import BaseIcon from '@/components/ui/BaseIcon.vue'
import { siteData } from '@/constants/site'

const linkedinPath =
  'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z'

const siFacebookRaw = siFacebook.path
const siInstagramRaw = siInstagram.path
const siTiktokRaw = siTiktok.path
</script>

<template>
  <footer class="site-footer">
    <div class="container-page footer-grid">
      <div class="footer-col">
        <p class="footer-brand">{{ siteData.brand.name }}</p>
        <p class="footer-legal">{{ siteData.footer.legalName }}</p>
        <p class="footer-rights">© {{ siteData.footer.year }} {{ siteData.brand.name }}. Todos los derechos reservados.</p>
        <div class="footer-socials">
          <a
            v-for="social in siteData.footer.socials"
            :key="social.platform"
            :href="social.url"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="`Visitar Urbanikawsay en ${social.platform}`"
            :title="social.platform"
            class="social-icon"
          >
            <svg
              v-if="social.platform === 'Facebook'"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path :d="siFacebookRaw" />
            </svg>
            <svg
              v-else-if="social.platform === 'Instagram'"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path :d="siInstagramRaw" />
            </svg>
            <svg
              v-else-if="social.platform === 'TikTok'"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path :d="siTiktokRaw" />
            </svg>
            <svg
              v-else-if="social.platform === 'Linkedin'"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path :d="linkedinPath" />
            </svg>
            <svg
              v-else-if="social.platform === 'Youtube'"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
              />
            </svg>
          </a>
        </div>
      </div>

      <div class="footer-col">
        <h3 class="footer-title">Contacto</h3>
        <ul class="list-contact footer-contact">
          <li>
            <BaseIcon name="phone" decorative />
            <a :href="`tel:+${siteData.contact.phoneMainIntl}`">{{ siteData.contact.phoneMain }}</a>
          </li>
          <li>
            <BaseIcon name="mail" decorative />
            <a :href="`mailto:${siteData.contact.email}`">{{ siteData.contact.email }}</a>
          </li>
          <li>
            <BaseIcon name="location" decorative />
            <span>{{ siteData.contact.address1 }}</span>
          </li>
          <li>
            <BaseIcon name="clock" decorative />
            <span>{{ siteData.contact.schedule }}</span>
          </li>
        </ul>
      </div>

      <div class="footer-col">
        <h3 class="footer-title">Navegación</h3>
        <nav aria-label="Navegación del pie de página">
          <ul class="footer-list footer-nav">
            <li v-for="item in siteData.navigation" :key="item.href">
              <a :href="item.href" class="footer-link">{{ item.label }}</a>
            </li>
          </ul>
        </nav>
      </div>

      <div class="footer-col">
        <h3 class="footer-title">Topic</h3>
        <ul class="footer-list footer-nav">
          <li v-for="topic in siteData.footer.topic" :key="topic">
            <a href="#" class="footer-link">{{ topic }}</a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  background: var(--color-brand-primary-dark);
  color: var(--color-text-inverse);
  padding-block: 3.5rem;
}
.footer-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}
@media (min-width: 768px) {
  .footer-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
.footer-brand {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 600;
}
.footer-legal {
  font-size: 0.85rem;
  opacity: 0.8;
  margin-top: 0.35rem;
}
.footer-rights {
  font-size: 0.8rem;
  opacity: 0.7;
  margin-top: 0.5rem;
}
.footer-socials {
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
}
.footer-title {
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1rem;
}
.footer-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}
.footer-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  font-size: 0.9rem;
  opacity: 0.9;
}
.footer-list li svg {
  flex-shrink: 0;
  margin-top: 0.1rem;
  color: var(--color-brand-secondary-bright);
}
.footer-list a {
  color: var(--color-text-inverse);
  text-decoration: none;
}
.footer-list a:hover {
  text-decoration: underline;
}
.footer-nav li a {
  opacity: 0.9;
}
.footer-contact {
  gap: 0.7rem;
}
.footer-contact li {
  color: var(--color-text-inverse);
  font-size: 0.9rem;
  opacity: 0.9;
}
.footer-contact .label {
  color: var(--color-text-inverse);
}
.footer-contact a {
  color: var(--color-text-inverse);
}
</style>
