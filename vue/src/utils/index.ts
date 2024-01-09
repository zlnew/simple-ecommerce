import type { Product } from "@/stores/product"

function Rp (number?: number | null) {
  const formattedNumber = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(number || 0)

  return formattedNumber
}

function getProductCategories (products: Product[]) {
  const categories = products.map(product => product.category)
  
  return [...new Set(categories)]
}

export {
  Rp,
  getProductCategories
}
