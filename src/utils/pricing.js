/**
 * pricing.js — Tüm fiyat hesaplama mantığı buradadır.
 * UI'dan tamamen ayrılmış; izole test edilebilir.
 */

import {
  SERVICES_DATA,
  BUNDLE_DISCOUNTS,
  CORPORATE_THRESHOLD,
  CORPORATE_DISCOUNT_RATE,
  CORPORATE_DISCOUNT_NAME,
} from '../data/services.js'

// ── Yardımcı: ID ile hizmet nesnesini bul ────────────────────
export function getServiceById(id) {
  for (const cat of SERVICES_DATA) {
    const found = cat.services.find(s => s.id === id)
    if (found) return found
  }
  return null
}

// ── Ana hesaplama fonksiyonu ─────────────────────────────────
/**
 * @param {Set<string>} selectedServiceIds
 * @returns {PricingResult}
 */
export function calculatePricing(selectedServiceIds) {
  const ids = Array.from(selectedServiceIds)

  // 1. Seçilen hizmet nesnelerini topla
  const selectedServices = ids.map(getServiceById).filter(Boolean)

  // 2. Ara toplam
  const subtotal = selectedServices.reduce((acc, s) => acc + s.price, 0)

  // 3. En iyi bundle indirimini bul
  let bestBundle = null
  for (const bundle of BUNDLE_DISCOUNTS) {
    const allPresent = bundle.requiredServices.every(rid =>
      selectedServiceIds.has(rid)
    )
    if (allPresent) {
      if (!bestBundle || bundle.discountRate > bestBundle.discountRate) {
        bestBundle = bundle
      }
    }
  }

  // Hangi bundle'ların geçerli olduğunu hepsi listele (bilgilendirme için)
  const applicableBundles = BUNDLE_DISCOUNTS.filter(b =>
    b.requiredServices.every(rid => selectedServiceIds.has(rid))
  )

  // Hangi bundle'lara 1 hizmet ekleyince ulaşılacak (ipucu için)
  const nearBundles = BUNDLE_DISCOUNTS.filter(b => {
    const missing = b.requiredServices.filter(rid => !selectedServiceIds.has(rid))
    return missing.length === 1
  })

  const bundleDiscountAmount = bestBundle
    ? subtotal * bestBundle.discountRate
    : 0
  const afterBundle = subtotal - bundleDiscountAmount

  // 4. Kurumsal eşik kontrolü
  const corporateEligible = afterBundle >= CORPORATE_THRESHOLD
  const corporateDiscountAmount = corporateEligible
    ? afterBundle * CORPORATE_DISCOUNT_RATE
    : 0

  const total   = afterBundle - corporateDiscountAmount
  const savings = bundleDiscountAmount + corporateDiscountAmount

  return {
    selectedServices,
    subtotal,
    bundleDiscount: bestBundle
      ? {
          bundle:  bestBundle,
          rate:    bestBundle.discountRate,
          amount:  bundleDiscountAmount,
        }
      : null,
    corporateDiscount: corporateEligible
      ? {
          name:   CORPORATE_DISCOUNT_NAME,
          rate:   CORPORATE_DISCOUNT_RATE,
          amount: corporateDiscountAmount,
        }
      : null,
    afterBundle,
    total,
    savings,
    applicableBundles,
    nearBundles,
    corporateThreshold:   CORPORATE_THRESHOLD,
    remainingToThreshold: Math.max(0, CORPORATE_THRESHOLD - afterBundle),
  }
}
