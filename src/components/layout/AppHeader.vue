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

onMounted(() => window.addEventListener('scroll', onScroll))
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
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
        class="header-cta"
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
}
.side-nav a:hover {
  opacity: 1;
  text-decoration: underline;
}
.header-cta {
  display: none;
  background: var(--color-accent-gradient);
  color: var(--color-text-on-accent);
  border: none;
  border-radius: var(--radius-md);
  padding: 0.6rem 1.25rem;
  font-weight: 700;
  cursor: pointer;
}
.menu-toggle {
  display: grid;
  place-items: center;
  width: 2.75rem;
  height: 2.75rem;
  border: none;
  background: transparent;
  color: var(--color-text-inverse);
  cursor: pointer;
}

@media (min-width: 768px) {
  .side-nav {
    display: flex;
  }
  .header-cta {
    display: inline-flex;
  }
  .menu-toggle {
    display: none;
  }
}
</style>
