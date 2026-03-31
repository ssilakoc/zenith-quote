import React, { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, Star, Clock, Users, TrendingUp, Shield } from 'lucide-react'

const PROOF_MESSAGES = [
  { icon: '🏢', text: 'Bu ay 47 şirket anlık teklif aldı' },
  { icon: '⭐', text: '4.9/5 ortalama · 127 memnun müşteri' },
  { icon: '🚀', text: 'Son 48 saatte 5 yeni proje başladı' },
  { icon: '🇹🇷', text: "Türkiye'nin lider markalarından bazıları bizi tercih ediyor" },
]

function useCountdown() {
  const [timeLeft, setTimeLeft] = useState({ h: '00', m: '00', s: '00' })

  useEffect(() => {
    // Bu haftanın Cuma 18:00'ine kalan süre
    const getTarget = () => {
      const now = new Date()
      const d   = new Date(now)
      const day = now.getDay()           // 0=Paz … 6=Cmt
      const daysToFri = (5 - day + 7) % 7 || 7
      d.setDate(now.getDate() + daysToFri)
      d.setHours(18, 0, 0, 0)
      return d
    }

    const tick = () => {
      const diff = getTarget() - Date.now()
      if (diff <= 0) { setTimeLeft({ h: '00', m: '00', s: '00' }); return }
      const h = Math.floor(diff / 3_600_000)
      const m = Math.floor((diff % 3_600_000) / 60_000)
      const s = Math.floor((diff % 60_000) / 1_000)
      setTimeLeft({
        h: String(h).padStart(2, '0'),
        m: String(m).padStart(2, '0'),
        s: String(s).padStart(2, '0'),
      })
    }

    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return timeLeft
}

export default function Header() {
  const [proofIdx, setProofIdx] = useState(0)
  const time = useCountdown()

  useEffect(() => {
    const id = setInterval(() => setProofIdx(i => (i + 1) % PROOF_MESSAGES.length), 3500)
    return () => clearInterval(id)
  }, [])

  return (
    <header className="relative overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d1635] via-[#0d1635] to-[#0a0f1e]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(124,58,237,0.18),transparent)]" />
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* ── Scarcity / Social proof ticker ─────── */}
      <div className="relative z-10 border-b border-white/[0.06] bg-black/20">
        <div className="mx-auto max-w-7xl px-4 py-2 flex items-center justify-between flex-wrap gap-2 text-[11px]">
          {/* Left: rotating message */}
          <div className="flex items-center gap-2 text-white/55">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
            </span>
            <AnimatePresence mode="wait">
              <motion.span
                key={proofIdx}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.35 }}
                className="font-medium"
              >
                {PROOF_MESSAGES[proofIdx].icon}{' '}
                {PROOF_MESSAGES[proofIdx].text}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Right: countdown */}
          <div className="flex items-center gap-1.5 text-amber-300 font-semibold">
            <Clock size={11} />
            <span className="text-white/40">Bu hafta fiyatı için:</span>
            <span className="font-mono tracking-wider">
              {time.h}:{time.m}:{time.s}
            </span>
          </div>
        </div>
      </div>

      {/* ── Main hero ───────────────────────────── */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 md:py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Logo mark */}
          <div className="inline-flex items-center gap-2.5 mb-7 px-4 py-2 rounded-full glass border border-white/10">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-epurple to-purple-800 flex items-center justify-center shadow-lg shadow-purple-900/50">
              <Zap size={14} className="text-white" />
            </div>
            <span className="font-black text-lg tracking-tighter text-white">
              {import.meta.env.VITE_COMPANY_NAME || 'ZENITH'}
            </span>
            <span className="text-white/30 text-xs">Studio</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-[3.75rem] font-black leading-[1.08] tracking-tight mb-5">
            Projeniz İçin{' '}
            <span className="gradient-text">Anlık Fiyat</span>
            <br />
            Teklifi Alın
          </h1>

          <p className="text-white/45 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            İhtiyacınız olan dijital hizmetleri seçin, fiyat anında hesaplansın.
            <br />
            Kurumsal kalitede — şeffaf fiyatlandırma.
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {[
              { Icon: Star,       label: '4.9 / 5 Puan' },
              { Icon: Users,      label: '127+ Memnun Müşteri' },
              { Icon: TrendingUp, label: '10+ Yıl Deneyim' },
              { Icon: Shield,     label: 'NDA İmzalanabilir' },
            ].map(({ Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass text-[11px] text-white/55 border border-white/[0.07]"
              >
                <Icon size={11} className="text-epurple-lighter" />
                {label}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </header>
  )
}
