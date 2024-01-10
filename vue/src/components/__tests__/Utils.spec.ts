import type { Product } from "@/stores/product"
import { Rp, getImagePreview, getProductCategories } from "@/utils"
import { describe, expect, it, test } from "vitest"

test('Rp(number)', () => {
  expect(Rp(10000)).toMatch(/^Rp\s\d+(\.\d{3})*$/)
  expect(Rp(undefined)).toMatch(/^Rp\s0$/)
  expect(Rp(null)).toMatch(/^Rp\s0$/)
})

test('getProductCategories(Product[])', () => {
  const products: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      description: 'product description',
      price: 10000,
      category: 'Men',
      image: 'product_image1.jpg'
    },
    {
      id: 2,
      name: 'Product 2',
      description: 'product description',
      price: 12000,
      category: 'Women',
      image: 'product_image2.jpg'
    },
  ]

  expect(getProductCategories(products)).toStrictEqual(['Men', 'Women'])
})

describe('getImagePreview(file)', () => {
  it('should resolve with the correct data URL when a file is provided', async () => {
    const file = new File([''], 'test.jpg', { type: 'image/jpeg' })

    const result = await getImagePreview(file)

    expect(result).toMatch(/^data:image\/jpegbase64,/)
  })

  it('should reject with an error when no file is provided', async () => {
    await expect(getImagePreview()).rejects.toThrowError('No file selected')
  })
})
