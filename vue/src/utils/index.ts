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

function getImagePreview (file?: File | null): Promise<string> {
  if (file) {
    const reader = new FileReader()

    return new Promise(function (resolve, reject) {
      reader.onload = function (e: ProgressEvent<FileReader>) {
        if (e.target && e.target.result) {
          resolve(e.target.result.toString())
        } else {
          reject(new Error("Failed to read the file"))
        }
      }

      reader.onerror = function (e) {
        reject(e)
      }

      reader.readAsDataURL(file)
    })
  } else {
    return Promise.reject(new Error("No file selected"))
  }
}

export {
  Rp,
  getProductCategories,
  getImagePreview
}
