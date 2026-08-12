<script setup>
defineProps({
  variant: { type: String, default: 'primary', validator: (v) => ['primary', 'secondary', 'ghost'].includes(v) },
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
      'btn-primary': variant === 'primary',
      'btn-secondary': variant === 'secondary',
      'btn-ghost': variant === 'ghost',
    }"
  >
    <slot />
  </component>
</template>
