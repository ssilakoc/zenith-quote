
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const fmt = n =>
  n.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 })

export default function MobileBar({ pricing, onGetQuote }) {
  const isEmpty = pricing.selectedServices.length === 0

  return (
    <AnimatePresence>
      {!isEmpty && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-40 lg:hidden"
          initial={{ y: 80 }}
          animate={{ y: 0 }}
          exit={{ y: 80 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          
          <div className="absolute inset-0 bg-[#0a0f1e]/80 backdrop-blur-xl border-t border-white/[0.08]" />

          <div className="relative px-4 py-3 flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-[10px] text-white/35">
                {pricing.selectedServices.length} hizmet seçildi
              </p>
              <div className="flex items-baseline gap-2">
                <p className="text-lg font-black text-white">{fmt(pricing.total)}</p>
                {pricing.savings > 0 && (
                  <p className="text-[11px] text-green-400 font-medium">
                    −{fmt(pricing.savings)} indirim
                  </p>
                )}
              </div>
            </div>

            <button
              onClick={onGetQuote}
              className="btn-primary shrink-0 px-5 py-3 rounded-xl flex items-center gap-1.5 text-sm"
            >
              PDF Al
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="h-safe-bottom bg-transparent" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
