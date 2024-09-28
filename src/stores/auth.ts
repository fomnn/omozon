import { Store } from '@tanstack/react-store'

interface AuthStore {
  admin_id: number | null
}

export const authStore = new Store<AuthStore>({
  admin_id: null,
}, {
  onUpdate: () => {
    // eslint-disable-next-line no-console
    console.log('authStore updated')
  }
})
