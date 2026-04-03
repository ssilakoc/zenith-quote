import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Info, Clock, Sparkles } from 'lucide-react'

export default function ServiceCard({ service, selected, onToggle }) {
  const [tipVisible, setTipVisible] = useState(false)

  const fmt = n =>
    n.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 })

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`
        relative rounded-2xl p-4 cursor-pointer select-none
        transition-all duration-200
        ${selected ? 'glass-selected' : 'glass hover:border-white/15 hover:bg-white/[0.06]'}
      `}
      onClick={() => onToggle(service.id)}
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.985 }}
    >
      {service.popular && (
        <div className="absolute -top-2.5 left-4 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-epurple to-epurple-light text-white text-[10px] font-semibold shadow-lg shadow-purple-900/50">
          <Sparkles size={9} />
          Popüler
        </div>
      )}

      <div className="flex items-start gap-3">
        <div className="mt-0.5 shrink-0">
          <motion.div
            animate={selected
              ? { scale: 1, backgroundColor: 'rgba(124,58,237,1)', borderColor: 'rgba(124,58,237,1)' }
              : { scale: 1, backgroundColor: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.15)' }
            }
            transition={{ duration: 0.2 }}
            className="w-5 h-5 rounded-md border flex items-center justify-center"
          >
            <AnimatePresence>
              {selected && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <Check size={11} className="text-white stroke-[2.5]" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-semibold leading-tight truncate ${selected ? 'text-white' : 'text-white/85'}`}>
                {service.name}
              </p>
              <p className="text-[11px] text-white/35 mt-0.5 truncate">
                {service.subtitle}
              </p>
            </div>

            <div className="text-right shrink-0">
              <p className={`text-sm font-bold ${selected ? 'text-epurple-lighter' : 'text-white/70'}`}>
                {fmt(service.price)}
              </p>
              {service.unit === 'ay' && (
                <p className="text-[10px] text-white/30">/ay</p>
              )}
            </div>
          </div>

          {service.deliveryDays > 0 && (
            <div className="flex items-center gap-1 mt-1.5 text-[10px] text-white/28">
              <Clock size={9} />
              {service.deliveryDays} iş günü teslimat
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-3 pt-3 border-t border-white/[0.08] grid grid-cols-2 gap-x-3 gap-y-1">
              {service.includes.map(item => (
                <div key={item} className="flex items-start gap-1.5">
                  <Check size={9} className="text-epurple-lighter mt-0.5 shrink-0 stroke-[2.5]" />
                  <span className="text-[10.5px] text-white/50 leading-tight">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        className="absolute bottom-3 right-3 text-white/25 hover:text-epurple-lighter transition-colors"
        onClick={e => { e.stopPropagation(); setTipVisible(v => !v) }}
        aria-label="İpucu göster"
      >
        <Info size={13} />
      </button>

      <AnimatePresence>
        {tipVisible && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-9 right-3 z-20 w-64 p-3 rounded-xl bg-[#1a1040] border border-epurple/30 shadow-xl shadow-black/40 text-left"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-start gap-2">
              <span className="text-base shrink-0">💡</span>
              <p className="text-[11px] text-white/70 leading-relaxed">
                {service.conversionTip}
              </p>
            </div>
            <div className="absolute -bottom-1.5 right-5 w-3 h-3 bg-[#1a1040] border-r border-b border-epurple/30 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
