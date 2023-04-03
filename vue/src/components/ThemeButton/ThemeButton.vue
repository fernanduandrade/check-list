<script lang="ts" setup>
import { ref, onMounted } from 'vue'
onMounted(() => {
    const initUserTheme = getTheme() || getMediaPreference()
    setTheme(initUserTheme)
})

const getTheme = (): Theme => localStorage.getItem('user-theme') as Theme
const getMediaPreference = (): Theme => {
    const hasDarkPreference = window.matchMedia('(prefers-color-scheme: dark)').matches

    if(hasDarkPreference) return 'dark-theme'
    return 'light-theme'
}
type Theme = 'dark-theme' | 'light-theme'
const userTheme = ref()
const setTheme = (theme: Theme): void => {
    localStorage.setItem('user-theme', theme)
    userTheme.value = theme
    document.documentElement.className = theme
}
const toggleTheme = () => {
    const activeTheme = localStorage.getItem('user-theme');
    if (activeTheme === 'dark-theme') {
        setTheme('light-theme')
    } else {
        setTheme('dark-theme')
    }
}
</script>

<template>
    <div>
      <input
        @change="toggleTheme"
        id="checkbox"
        type="checkbox"
        class="switch-checkbox"
      />
      <label for="checkbox" class="switch-label">
        <span>🌙</span>
        <span>☀️</span>
        <div
          class="switch-toggle"
          :class="{ 'switch-toggle-checked': userTheme === 'dark-theme' }"
        ></div>
      </label>
    </div>
  </template>

<style scoped lang="scss">
.switch-checkbox {
  display: none;
}

.switch-label {
  align-items: center;
  background: var(--text-primary-color);
  border: calc(var(--element-size) * 0.025) solid var(--accent-color);
  border-radius: var(--element-size);
  cursor: pointer;
  display: flex;
  font-size: calc(var(--element-size) * 0.2);
  height: calc(var(--element-size) * 0.5);
  position: relative;
  padding: calc(var(--element-size) * 0.25);
  transition: background 0.5s ease;
  justify-content: space-between;
  width: 7.5rem;
}

.switch-toggle {
  position: absolute;
  background-color: var(--background-color-primary);
  border-radius: 50%;
  top: calc(var(--element-size) * 0.07);
  left: calc(var(--element-size) * 0.09);
  height: calc(var(--element-size) * 0.4);
  width: calc(var(--element-size) * 0.4);
  transform: translateX(0);
  transition: transform 0.3s ease, background-color 0.5s ease;
}

.switch-toggle-checked {
  transform: translateX(calc(var(--element-size) * 0.6)) !important;
}
</style>