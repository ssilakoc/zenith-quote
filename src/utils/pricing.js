import {
  SERVICES_DATA,
  BUNDLE_DISCOUNTS,
  CORPORATE_THRESHOLD,
  CORPORATE_DISCOUNT_RATE,
  CORPORATE_DISCOUNT_NAME,
} from '../data/services.js'

export function getServiceById(id) {
  for (const cat of SERVICES_DATA) {
    const found = cat.services.find(s => s.id === id)
    if (found) return found
  }
  return null
}

export function calculatePricing(selectedServiceIds) {
  const ids = Array.from(selectedServiceIds)

  const selectedServices = ids.map(getServiceById).filter(Boolean)

  const subtotal = selectedServices.reduce((acc, s) => acc + s.price, 0)

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

  const applicableBundles = BUNDLE_DISCOUNTS.filter(b =>
    b.requiredServices.every(rid => selectedServiceIds.has(rid))
  )

  const nearBundles = BUNDLE_DISCOUNTS.filter(b => {
    const missing = b.requiredServices.filter(rid => !selectedServiceIds.has(rid))
    return missing.length === 1
  })

  const bundleDiscountAmount = bestBundle
    ? subtotal * bestBundle.discountRate
    : 0
  const afterBundle = subtotal - bundleDiscountAmount

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
