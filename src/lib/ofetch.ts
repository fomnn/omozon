import { ofetch } from 'ofetch'

export const baseURL = 'https://server-omozon.vercel.app/'
export const baseImagesURL = 'https://omozon-images-server.fathurrahmannotoy.workers.dev'

const apiFetch = ofetch.create({ baseURL })

export default apiFetch
