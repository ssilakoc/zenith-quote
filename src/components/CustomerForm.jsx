import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, User, Building2, Mail, Phone, MessageSquare, Download, CheckCircle, Loader2 } from 'lucide-react'
import { generateQuotePDF } from '../utils/generatePDF.js'

const FIELDS = [
  { id: 'name',    label: 'Ad Soyad',            Icon: User,          type: 'text',     placeholder: 'Ahmet Yılmaz',         required: true  },
  { id: 'company', label: 'Şirket Adı',          Icon: Building2,     type: 'text',     placeholder: 'Şirket A.Ş.',          required: false },
  { id: 'email',   label: 'E-posta',              Icon: Mail,          type: 'email',    placeholder: 'ahmet@sirket.com.tr',  required: true  },
  { id: 'phone',   label: 'Telefon',              Icon: Phone,         type: 'tel',      placeholder: '+90 555 000 00 00',    required: false },
  { id: 'note',    label: 'Not (isteğe bağlı)',   Icon: MessageSquare, type: 'textarea', placeholder: 'Eklemek istediğiniz detaylar...', required: false },
]

function validate(form) {
  const errors = {}
  if (!form.name.trim())  errors.name  = 'Ad soyad zorunludur'
  if (!form.email.trim()) errors.email = 'E-posta zorunludur'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    errors.email = 'Geçerli bir e-posta adresi girin'
  return errors
}

const fmt = n =>
  n.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 })

export default function CustomerForm({ pricing, onClose }) {
  const [form, setForm]       = useState({ name: '', company: '', email: '', phone: '', note: '' })
  const [errors, setErrors]   = useState({})
  const [loading, setLoading] = useState(false)
  const [done, setDone]       = useState(false)
  const [pdfError, setPdfError] = useState(null)

  const change = (id, val) => {
    setForm(p => ({ ...p, [id]: val }))
    if (errors[id]) setErrors(p => ({ ...p, [id]: undefined }))
    if (pdfError)   setPdfError(null)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const errs = validate(form)
    if (Object.keys(errs).length) { setErrors(errs); return }

    setLoading(true)
    setPdfError(null)
    try {
      await generateQuotePDF(form, pricing)
      setDone(true)
    } catch (err) {
      console.error('PDF oluşturma hatası:', err)
      setPdfError('PDF oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Dim backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        onClick={!loading ? onClose : undefined}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Modal panel */}
      <motion.div
        className="relative z-10 w-full sm:max-w-lg bg-[#0d1635] border border-white/[0.09] rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden"
        initial={{ y: 60, opacity: 0, scale: 0.97 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 60, opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Rainbow accent bar */}
        <div className="h-[3px] bg-gradient-to-r from-epurple via-epurple-light to-blue-500" />

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-3">
          <div>
            <h2 className="text-base font-bold text-white">Teklifinizi Alın</h2>
            <p className="text-[11px] text-white/35 mt-0.5">
              Bilgilerinizi girin, PDF saniyeler içinde hazırlansın
            </p>
          </div>
          <button
            onClick={!loading ? onClose : undefined}
            disabled={loading}
            className="w-8 h-8 rounded-full flex items-center justify-center text-white/30 hover:text-white hover:bg-white/[0.08] transition-colors disabled:opacity-50"
          >
            <X size={16} />
          </button>
        </div>

        {/* Pricing pill */}
        <div className="mx-6 mb-5 flex items-center justify-between px-4 py-3 rounded-xl bg-epurple/10 border border-epurple/20">
          <div>
            <p className="text-[10px] text-white/35 mb-0.5">Seçilen Toplam</p>
            <p className="text-xl font-black text-white">{fmt(pricing.total)}</p>
          </div>
          {pricing.savings > 0 && (
            <div className="text-right">
              <p className="text-[10px] text-white/35 mb-0.5">Tasarruf</p>
              <p className="text-sm font-bold text-green-400">−{fmt(pricing.savings)}</p>
            </div>
          )}
          <div className="text-right">
            <p className="text-[10px] text-white/35 mb-0.5">Hizmet</p>
            <p className="text-sm font-bold text-white/70">{pricing.selectedServices.length} adet</p>
          </div>
        </div>

        {/* ── Başarı ekranı ─────────────────────────── */}
        <AnimatePresence mode="wait">
          {done ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="px-6 pb-8 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: 'spring', stiffness: 180 }}
                className="w-16 h-16 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center mx-auto mb-4"
              >
                <CheckCircle size={28} className="text-green-400" />
              </motion.div>
              <h3 className="text-base font-bold text-white mb-2">Teklif PDF'i indirildi!</h3>
              <p className="text-sm text-white/45 leading-relaxed mb-6">
                Profesyonel teklif belgeniz hazır.
                <br />
                İncelemenizi bekliyor, sorularınız için ulaşabilirsiniz.
              </p>
              <button onClick={onClose} className="btn-primary w-full py-3 rounded-xl text-sm">
                Kapat
              </button>
            </motion.div>
          ) : (
            /* ── Form ──────────────────────────────── */
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              noValidate
              className="px-6 pb-6 space-y-3"
              initial={{ opacity: 1 }}
            >
              {FIELDS.map(({ id, label, Icon, type, placeholder, required }) =>
                type === 'textarea' ? (
                  <div key={id}>
                    <label className="flex items-center gap-1.5 text-[11px] font-medium text-white/40 mb-1.5">
                      <Icon size={11} />{label}
                    </label>
                    <textarea
                      className="input-field resize-none h-[72px] leading-relaxed"
                      placeholder={placeholder}
                      value={form[id]}
                      onChange={e => change(id, e.target.value)}
                      disabled={loading}
                    />
                  </div>
                ) : (
                  <div key={id}>
                    <label className="flex items-center gap-1.5 text-[11px] font-medium text-white/40 mb-1.5">
                      <Icon size={11} />{label}
                      {required && <span className="text-epurple-lighter">*</span>}
                    </label>
                    <input
                      type={type}
                      className={`input-field ${errors[id] ? 'border-red-500/60' : ''}`}
                      placeholder={placeholder}
                      value={form[id]}
                      onChange={e => change(id, e.target.value)}
                      autoComplete={id === 'email' ? 'email' : id === 'phone' ? 'tel' : 'off'}
                      disabled={loading}
                    />
                    {errors[id] && (
                      <p className="text-[10px] text-red-400 mt-1">{errors[id]}</p>
                    )}
                  </div>
                )
              )}

              {pdfError && (
                <p className="text-[11px] text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                  {pdfError}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-3.5 rounded-xl flex items-center justify-center gap-2 text-sm mt-1 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <>
                    <Loader2 size={15} className="animate-spin" />
                    PDF hazırlanıyor...
                  </>
                ) : (
                  <>
                    <Download size={15} />
                    PDF Teklif İndir
                  </>
                )}
              </button>

              <p className="text-center text-[10px] text-white/20">
                🔒 Bilgileriniz yalnızca teklif belgesi için kullanılır
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}
