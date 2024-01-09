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
  category?: string
}

export type ProductStoreForm = {
  name: string
  description: string
  price: number
  category: string
  image: File
}

export type ProductUpdateForm = {
  name: string
  description: string
  price: number
  category: string
  image: File | null
}

export const useProductStore = defineStore('product', () => {
  async function get (params?: ProductParams) {
    const { data: res } = await api.get<{ data: Product[] }>('/api/products', {
      params
    })

    return res.data
  }

  async function show (id: number) {
    const { data: res } = await api.get<{ data: Product }>(`/api/products/${id}`)

    return res.data
  }

  async function store (data: ProductStoreForm) {
    const { data: res } = await api.post<{ data: Product }>('/api/products', data, {
      headers: {
        "content-type": "multipart/form-data"
      }
    })

    return res.data
  }

  async function update (id: number, data: ProductUpdateForm) {
    const { data: res } = await api.post<{ data: Product }>(`/api/products/${id}`, data, {
      headers: {
        "content-type": "multipart/form-data"
      }
    })

    return res.data
  }

  async function destroy (id: number) {
    return await api.delete(`/api/products/${id}`)
  }

  return {
    get,
    show,
    store,
    update,
    destroy
  }
})
