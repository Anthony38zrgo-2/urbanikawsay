<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import BaseIcon from '@/components/ui/BaseIcon.vue'
import ResponsiveImage from '@/components/ui/ResponsiveImage.vue'
import { siteData } from '@/constants/site'
import { imageAssets } from '@/assets/generated/image-assets.js'

const emit = defineEmits(['open-reserve'])
const menuOpen = ref(false)
const scrolled = ref(false)

const logo = imageAssets[siteData.brand.logo]

const onScroll = () => {
  scrolled.value = window.scrollY > 10
}

const closeMenu = () => {
  menuOpen.value = false
}

const handleKeydown = (e) => {
  if (e.key === 'Escape' && menuOpen.value) closeMenu()
}

onMounted(() => {
  window.addEventListener('scroll', onScroll)
  document.addEventListener('keydown', handleKeydown)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <header
    class="site-header"
    :class="{ 'is-scrolled': scrolled, 'is-open': menuOpen }"
  >
    <div class="container-page header-inner">
      <a
        class="brand-lockup"
        href="#inicio"
        :aria-label="siteData.brand.logoAlt"
        @click="closeMenu"
      >
        <ResponsiveImage
          :asset="logo"
          alt=""
          picture-class="brand-logo-picture"
          img-class="brand-logo"
          sizes="44px"
          loading="eager"
          fetchpriority="high"
        />
        <span class="brand-copy">
          <strong>{{ siteData.brand.name }}</strong>
          <small>{{ siteData.brand.tagline }}</small>
        </span>
      </a>

      <nav
        id="main-navigation"
        class="side-nav"
        :class="{ 'is-open': menuOpen }"
        aria-label="Navegación principal"
        :aria-hidden="menuOpen ? 'false' : 'true'"
      >
        <a
          v-for="item in siteData.navigation"
          :key="item.href"
          :href="item.href"
          class="nav-link nav-link--inverse"
          @click="closeMenu"
        >
          {{ item.label }}
        </a>
      </nav>

      <button
        type="button"
        class="btn-aero btn-aero-primary btn-sm header-cta"
        @click="emit('open-reserve')"
      >
        Separa tu lote
      </button>

      <button
        class="menu-toggle"
        type="button"
        :aria-expanded="menuOpen"
        aria-controls="main-navigation"
        aria-label="Abrir o cerrar menú"
        @click="menuOpen = !menuOpen"
      >
        <BaseIcon :name="menuOpen ? 'close' : 'menu'" :size="24" decorative />
      </button>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 30;
  background: var(--color-brand-primary);
  box-shadow: none;
  transition: box-shadow 0.2s ease;
}
.site-header.is-scrolled {
  box-shadow: 0 4px 20px rgb(9 46 28 / 0.25);
}
.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  min-height: 4.5rem;
}
.brand-lockup {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  text-decoration: none;
  color: var(--color-text-inverse);
}
:deep(.brand-logo) {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
:deep(.brand-logo-picture) {
  display: block;
  width: 2.75rem;
  height: 2.75rem;
}
.brand-copy {
  display: flex;
  flex-direction: column;
  line-height: 1.1;
}
.brand-copy strong {
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 600;
}
.brand-copy small {
  font-size: 0.75rem;
  opacity: 0.85;
}
.side-nav {
  display: none;
  gap: 1.5rem;
}
.side-nav .nav-link {
  font-weight: 500;
  padding: 0.5rem 0.25rem;
}
.header-cta {
  display: none;
}
.menu-toggle {
  display: grid;
  place-items: center;
  width: 2.75rem;
  height: 2.75rem;
  border: 1px solid var(--color-text-inverse);
  background: transparent;
  color: var(--color-text-inverse);
  border-radius: var(--radius-md);
  cursor: pointer;
}
.menu-toggle:focus-visible {
  outline: 3px solid var(--color-focus-ring);
  outline-offset: 2px;
}

/* Menú móvil (flat, visible cuando is-open) */
@media (max-width: 767px) {
  .side-nav {
    position: fixed;
    top: 4.5rem;
    left: 0;
    right: 0;
    z-index: 29;
    flex-direction: column;
    gap: 0;
    background: var(--color-brand-primary-dark);
    border-bottom: 1px solid rgb(255 255 255 / 0.12);
    padding: 0.5rem 1.25rem;
    display: none;
  }
  .side-nav.is-open {
    display: flex;
  }
  .side-nav .nav-link {
    padding: 0.9rem 0.25rem;
    border-bottom: 1px solid rgb(255 255 255 / 0.08);
  }
  .side-nav .nav-link:last-child {
    border-bottom: none;
  }
}

@media (min-width: 768px) {
  .side-nav {
    display: flex;
    position: static;
    flex-direction: row;
    background: transparent;
    border-bottom: none;
    padding: 0;
  }
  .header-cta {
    display: inline-flex;
  }
  .menu-toggle {
    display: none;
  }
}
</style>
