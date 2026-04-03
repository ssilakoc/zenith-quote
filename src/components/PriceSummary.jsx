import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Tag, TrendingDown, Award, ArrowRight, Trash2 } from 'lucide-react'

const fmt = n =>
  n.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 })

function AnimatedPrice({ value }) {
  return (
    <motion.span
      key={value}
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
    >
      {fmt(value)}
    </motion.span>
  )
}

export default function PriceSummary({ pricing, selectedServices, onGetQuote, onRemove }) {
  const isEmpty = pricing.selectedServices.length === 0
  const hasDiscount = pricing.bundleDiscount || pricing.corporateDiscount

  return (
    <div className="lg:sticky lg:top-6 space-y-3">
      
      <div className="glass rounded-2xl p-5 border border-white/[0.08]">
        <p className="section-label">Anlık Teklif Özeti</p>

      
        <AnimatePresence mode="wait">
          {isEmpty ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-8 text-center"
            >
              <div className="text-3xl mb-3">🛒</div>
              <p className="text-sm text-white/35">
                Hizmet seçmeye başlayın,
                <br />
                fiyat burada görünecek.
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="filled"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-3"
            >
     
              <div className="space-y-2">
                {pricing.selectedServices.map(s => (
                  <motion.div
                    key={s.id}
                    layout
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="flex items-center justify-between gap-2"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-white/80 truncate">{s.name}</p>
                      {s.unit === 'ay' && (
                        <p className="text-[10px] text-white/30">aylık</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs font-semibold text-white/65">{fmt(s.price)}</span>
                      {onRemove && (
                        <button
                          onClick={() => onRemove(s.id)}
                          className="text-white/20 hover:text-red-400 transition-colors"
                          aria-label="Kaldır"
                        >
                          <Trash2 size={11} />
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="h-px bg-white/[0.07]" />

              
              <div className="flex justify-between text-xs text-white/45">
                <span>Ara Toplam</span>
                <AnimatedPrice value={pricing.subtotal} />
              </div>

              <AnimatePresence>
                {pricing.bundleDiscount && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="flex items-start justify-between gap-2 py-2 px-3 rounded-xl bg-epurple/10 border border-epurple/20">
                      <div className="flex items-start gap-2">
                        <Tag size={12} className="text-epurple-lighter mt-0.5 shrink-0" />
                        <div>
                          <p className="text-[11px] font-semibold text-epurple-lighter leading-tight">
                            {pricing.bundleDiscount.bundle.name}
                          </p>
                          <p className="text-[10px] text-white/35 mt-0.5">
                            {pricing.bundleDiscount.bundle.description}
                          </p>
                        </div>
                      </div>
                      <span className="text-[11px] font-bold text-green-400 shrink-0">
                        −{fmt(pricing.bundleDiscount.amount)}
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {pricing.corporateDiscount && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="flex items-start justify-between gap-2 py-2 px-3 rounded-xl bg-green-500/10 border border-green-500/20">
                      <div className="flex items-start gap-2">
                        <Award size={12} className="text-green-400 mt-0.5 shrink-0" />
                        <div>
                          <p className="text-[11px] font-semibold text-green-400 leading-tight">
                            Kurumsal Paket İndirimi
                          </p>
                          <p className="text-[10px] text-white/35 mt-0.5">
                            %{Math.round(pricing.corporateDiscount.rate * 100)} · Yüksek hacim ödülü
                          </p>
                        </div>
                      </div>
                      <span className="text-[11px] font-bold text-green-400 shrink-0">
                        −{fmt(pricing.corporateDiscount.amount)}
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

         
              <AnimatePresence>
                {pricing.remainingToThreshold > 0 && pricing.subtotal > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-1 pb-2">
                      <div className="flex justify-between text-[10px] text-white/35 mb-1.5">
                        <span className="flex items-center gap-1">
                          <TrendingDown size={9} />
                          Kurumsal indirim için
                        </span>
                        <span>{fmt(pricing.remainingToThreshold)} daha</span>
                      </div>
                      <div className="h-1 rounded-full bg-white/[0.07] overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-epurple to-epurple-light"
                          initial={{ width: 0 }}
                          animate={{
                            width: `${Math.min(100, (pricing.afterBundle / pricing.corporateThreshold) * 100)}%`,
                          }}
                          transition={{ duration: 0.5, ease: 'easeOut' }}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            
              <div className="h-px bg-white/[0.07]" />
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-[10px] text-white/35 mb-0.5">TOPLAM</p>
                  <div className="text-2xl font-black text-white">
                    <AnimatedPrice value={pricing.total} />
                  </div>
                  {pricing.savings > 0 && (
                    <motion.p
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-[11px] text-green-400 font-medium mt-0.5"
                    >
                      🎉 {fmt(pricing.savings)} tasarruf ettiniz!
                    </motion.p>
                  )}
                </div>

                {hasDiscount && (
                  <div className="text-right">
                    <p className="text-[10px] text-white/25 line-through">
                      {fmt(pricing.subtotal)}
                    </p>
                    <p className="text-[10px] text-green-400 font-semibold">
                      %{Math.round((pricing.savings / pricing.subtotal) * 100)} indirim
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    
      <AnimatePresence>
        {!isEmpty && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            onClick={onGetQuote}
            className="btn-primary w-full py-4 rounded-2xl flex items-center justify-center gap-2 text-sm"
          >
            PDF Teklif Oluştur
            <ArrowRight size={15} />
          </motion.button>
        )}
      </AnimatePresence>

      {pricing.nearBundles && pricing.nearBundles.length > 0 && (
        <div className="glass rounded-xl p-4 border border-amber-500/15">
          <p className="text-[10px] font-semibold text-amber-400 mb-2 flex items-center gap-1.5">
            ✨ İndirim fırsatı yakın!
          </p>
          {pricing.nearBundles.slice(0, 2).map(b => {
            const missing = b.requiredServices.filter(
              id => !selectedServices.has(id)
            )
            return (
              <p key={b.id} className="text-[11px] text-white/40 leading-relaxed mb-1">
                <span className="text-amber-400 font-medium">{b.badge}</span>
                {' '}için{' '}
                <span className="text-white/65">
                  {missing.map(id => {
                    const s = pricing.selectedServices.find(sv => sv.id === id)
                    return s?.name ?? id
                  }).join(', ')}{' '}
                </span>
                ekleyin ({b.name}).
              </p>
            )
          })}
        </div>
      )}

      <p className="text-center text-[10px] text-white/20 leading-relaxed px-2">
        🔒 Bilgileriniz güvende · Teklif 15 gün geçerli · Ücretsiz danışma hakkı
      </p>
    </div>
  )
}
