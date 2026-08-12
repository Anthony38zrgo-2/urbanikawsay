<script setup>
import { siteData } from '@/constants/site'
import BaseIcon from '@/components/ui/BaseIcon.vue'
</script>

<template>
  <section class="section-pad team-section" aria-labelledby="team-title">
    <div class="container-page">
      <div class="section-header section-header--center">
        <p class="section-eyebrow">El equipo</p>
        <h2 id="team-title" class="section-title">Nuestro equipo</h2>
      </div>
      <div class="team-grid">
        <article
          v-for="member in siteData.team"
          :key="member.name"
          class="card card-team"
        >
          <div class="team-avatar" aria-hidden="true">
            <BaseIcon name="person" :size="32" decorative />
          </div>
          <h3 class="team-name">{{ member.name }}</h3>
          <p class="team-role">{{ member.role }}</p>
          <p class="team-greeting">{{ member.greeting }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.team-section {
  background: var(--color-surface-soft);
}
.team-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}
@media (min-width: 640px) {
  .team-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 1024px) {
  .team-grid { grid-template-columns: repeat(3, 1fr); }
}
.team-avatar {
  width: 3.5rem;
  height: 3.5rem;
  display: grid;
  place-items: center;
  border-radius: 9999px;
  background: var(--color-brand-secondary-pale);
  color: var(--color-brand-primary);
  margin: 0 auto 1rem;
}
.team-name {
  font-family: var(--font-display);
  color: var(--color-brand-primary);
  font-size: 1.15rem;
}
.team-role {
  color: var(--color-brand-secondary);
  font-weight: 600;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin: 0.25rem 0 0.75rem;
}
.team-greeting {
  color: var(--color-text-secondary);
  font-size: 0.95rem;
  line-height: 1.6;
}
</style>
