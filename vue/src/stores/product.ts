import api from "@/lib/api"
import { defineStore } from "pinia"

export type Product = {
  id: number
  name: string
  description: string
  price: number
  category: string
  image: string
  created_at: string
  updated_at: string
}

export type ProductParams = {
  search?: string
  filters?: {
    category?: string
    price_min?: number
    price_max?: number
  }
}

export type ProductStoreForm = {
  name: string
  description: string
  price: number
  category: string
  image: File | null
}

export type ProductUpdateForm = {
  name: string
  description: string
  price: number
  category: string
  image: File | null
}

export const useProductStore = defineStore('product', () => {
  async function get ({ search, filters }: ProductParams) {

    const { data: res } = await api.get<{ data: Product[] }>('/api/products', {
      params: { search, ...filters }
    })

    return res.data
  }

  async function show (id: number) {
    const { data: res } = await api.get<{ data: Product }>(`/api/products/${id}`)

    return res.data
  }

  async function store (data: ProductStoreForm) {
    const res = await api.post<{ status: string, data: Product }>('/api/products', data, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })

    return res.data
  }

  async function update (id: number, data: ProductUpdateForm) {
    const res = await api.post<{ status: string, data: Product }>(`/api/products/${id}`, data, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })

    return res.data
  }

  async function destroy (id: number) {
    const res = await api.delete<{ status: string }>(`/api/products/${id}`)

    return res.data.status
  }

  return {
    get,
    show,
    store,
    update,
    destroy
  }
})
