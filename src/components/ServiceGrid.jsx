import React from 'react'
import { motion } from 'framer-motion'
import ServiceCard from './ServiceCard.jsx'
import { SERVICES_DATA } from '../data/services.js'

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
}

const catVariants = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
}

export default function ServiceGrid({ selectedServices, onToggle, pricing }) {
  // Highlight near-bundle services (1 hizmet eksik)
  const nearBundleServiceIds = new Set(
    (pricing.nearBundles || []).flatMap(b =>
      b.requiredServices.filter(id => !selectedServices.has(id))
    )
  )

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-10"
    >
      {SERVICES_DATA.map(category => (
        <motion.section key={category.id} variants={catVariants}>
          {/* Category header */}
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center text-base shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${category.gradientFrom}, ${category.gradientTo})`,
                boxShadow: `0 4px 12px ${category.gradientFrom}33`,
              }}
            >
              {category.emoji}
            </div>
            <h2 className="text-sm font-semibold text-white/75 tracking-wide">
              {category.label}
            </h2>
            <div className="flex-1 h-px bg-white/[0.06]" />
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {category.services.map(service => (
              <div key={service.id} className="relative">
                {/* Near-bundle hint */}
                {nearBundleServiceIds.has(service.id) && !selectedServices.has(service.id) && (
                  <div className="absolute -top-2 left-3 z-10 flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/90 text-[9px] font-bold text-black shadow">
                    ✨ Ekleyin — indirim açılır!
                  </div>
                )}
                <ServiceCard
                  service={service}
                  selected={selectedServices.has(service.id)}
                  onToggle={onToggle}
                />
              </div>
            ))}
          </div>
        </motion.section>
      ))}

      {/* Bottom spacer for mobile sticky bar */}
      <div className="h-24 md:h-0" />
    </motion.div>
  )
}
