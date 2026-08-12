<script setup>
import { ref } from 'vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import TeamSection from '@/components/sections/TeamSection.vue'
import ProjectsSection from '@/components/sections/ProjectsSection.vue'
import ValuesSection from '@/components/sections/ValuesSection.vue'
import ContactSection from '@/components/sections/ContactSection.vue'
import WhatsAppButton from '@/components/ui/WhatsAppButton.vue'
import ProjectModal from '@/components/ui/ProjectModal.vue'
import ReserveLotModal from '@/components/ui/ReserveLotModal.vue'

const reserveOpen = ref(false)
const projectOpen = ref(false)
const projectSlug = ref('')

const openReserve = () => {
  projectOpen.value = false
  reserveOpen.value = true
}

const openProject = (slug) => {
  projectSlug.value = slug
  projectOpen.value = true
}
</script>

<template>
  <div class="page-shell">
    <a class="skip-link" href="#inicio">Ir al contenido</a>
    <AppHeader @open-reserve="openReserve" />
    <main class="site-main">
      <HeroSection />
      <AboutSection />
      <ProjectsSection @open-project="openProject" />
      <TeamSection />
      <ValuesSection />
      <ContactSection />
    </main>
    <AppFooter />

    <WhatsAppButton />
    <ProjectModal
      :open="projectOpen"
      :slug="projectSlug"
      @close="projectOpen = false"
      @reserve="openReserve"
    />
    <ReserveLotModal :open="reserveOpen" @close="reserveOpen = false" />
  </div>
</template>

<style scoped>
.skip-link {
  position: absolute;
  left: -9999px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
  z-index: 100;
}
.skip-link:focus {
  left: 0.75rem;
  top: 0.75rem;
  width: auto;
  height: auto;
  padding: 0.75rem 1.25rem;
  background: var(--color-brand-primary);
  color: var(--color-text-inverse);
  border-radius: var(--radius-sm);
  font-weight: 600;
}
.page-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--color-surface);
  color: var(--color-text-primary);
}
.site-main {
  flex: 1;
}
</style>
