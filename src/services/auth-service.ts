import apiFetch from '@/lib/ofetch'
import { authStore } from '@/stores/auth'
import { useMutation } from '@tanstack/react-query'
import { redirect } from '@tanstack/react-router'

export function useLogin() {
  return useMutation({
    mutationFn: async (data: { username: string, password: string }) => {
      const { token, id } = await apiFetch<{ token: string, id: number }>('/auth-admin/login', {
        method: 'POST',
        body: data,
      })

      return { token, id }
    },
  })
}

export function useVerifyToken() {
  return useMutation({
    mutationFn: async (token: string) => {
      const { id } = await apiFetch<{ id: number }>('/auth-admin/verify', {
        method: 'POST',
        headers: {
          authorization: `Bearer ${token}`,
        },
      })

      authStore.setState(() => ({
        admin_id: id,
      }))

      return id
    },
  })
}

export async function useVerifyToken2(token: string) {
  try {
    const { id } = await apiFetch<{ id: number }>('/auth-admin/verify', {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
      },
      onResponseError: (e) => {
        // eslint-disable-next-line no-console
        console.log(e)
      },
    })

    if (!id) {
      return false
    }

    authStore.setState(() => ({
      admin_id: id,
    }))
  }
  catch (e) {
    // eslint-disable-next-line no-console
    console.log(e)

    return false
  }

  return true
}
