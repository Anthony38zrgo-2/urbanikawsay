<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import BaseIcon from '@/components/ui/BaseIcon.vue'
import { siteData } from '@/constants/site'

const emit = defineEmits(['open-reserve'])
const menuOpen = ref(false)
const scrolled = ref(false)

const imageModules = import.meta.glob('@/assets/images/*.png', {
  eager: true,
  import: 'default',
})
const logo = imageModules[`/src/assets/images/${siteData.brand.logo}`]

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
        <img class="brand-logo" :src="logo" alt="" width="120" height="120" />
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
          @click="closeMenu"
        >
          {{ item.label }}
        </a>
      </nav>

      <button
        type="button"
        class="btn-aero btn-aero-primary header-cta"
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
.brand-logo {
  width: 2.75rem;
  height: 2.75rem;
  object-fit: contain;
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
.side-nav a {
  color: var(--color-text-inverse);
  text-decoration: none;
  font-weight: 500;
  opacity: 0.9;
  padding: 0.5rem 0.25rem;
}
.side-nav a:hover {
  opacity: 1;
  text-decoration: underline;
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
  .side-nav a {
    padding: 0.9rem 0.25rem;
    border-bottom: 1px solid rgb(255 255 255 / 0.08);
  }
  .side-nav a:last-child {
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
