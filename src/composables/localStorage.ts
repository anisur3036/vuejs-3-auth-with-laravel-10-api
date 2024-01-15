import { onScopeDispose, ref, watch } from 'vue'

export function useLocalStorage<T>(key: string, defaultValue?: T) {
  const val = ref(defaultValue)

  const storageVal = window.localStorage.getItem(key)
  if (storageVal) {
    val.value = JSON.parse(storageVal)
  }

  function handleStorageEvent(event: StorageEvent) {
    if (event.key === key) {
      val.value = JSON.parse(event.newValue || 'null')
    }
  }

  window.addEventListener('storage', handleStorageEvent)

  onScopeDispose(() => window.removeEventListener('storage', handleStorageEvent))

  watch(val, (newValue) => window.localStorage.setItem(key, JSON.stringify(newValue)), {
    deep: true
  })

  return val
}
