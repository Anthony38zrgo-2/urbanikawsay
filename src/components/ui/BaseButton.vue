<script setup>
defineProps({
  variant: { type: String, default: 'primary', validator: (v) => ['primary', 'secondary', 'quiet', 'icon'].includes(v) },
  size: { type: String, default: 'md', validator: (v) => ['sm', 'md', 'lg', 'wide'].includes(v) },
  tag: { type: String, default: 'button' },
  type: { type: String, default: 'button' },
  href: { type: String, default: '' },
  target: { type: String, default: '' },
})
</script>

<template>
  <component
    :is="tag"
    :type="tag === 'button' ? type : undefined"
    :href="tag === 'a' ? href : undefined"
    :target="tag === 'a' && target ? target : undefined"
    :rel="tag === 'a' && target ? 'noopener noreferrer' : undefined"
    :class="{
      'btn-aero btn-aero-primary': variant === 'primary',
      'btn-aero btn-aero-secondary': variant === 'secondary',
      'btn-aero btn-aero-quiet': variant === 'quiet',
      'btn-aero btn-aero-icon': variant === 'icon',
      'btn-sm': size === 'sm',
      'btn-lg': size === 'lg',
      'btn-wide': size === 'wide',
    }"
  >
    <slot />
  </component>
</template>
