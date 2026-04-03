import React, { useState, useMemo } from 'react'
import { AnimatePresence } from 'framer-motion'

import Header       from './components/Header.jsx'
import ServiceGrid  from './components/ServiceGrid.jsx'
import PriceSummary from './components/PriceSummary.jsx'
import CustomerForm from './components/CustomerForm.jsx'
import MobileBar    from './components/MobileBar.jsx'
import { calculatePricing } from './utils/pricing.js'

export default function App() {
  const [selectedServices, setSelectedServices] = useState(new Set())
  const [showForm, setShowForm] = useState(false)

  const pricing = useMemo(
    () => calculatePricing(selectedServices),
    [selectedServices]
  )

  const toggleService = id => {
    setSelectedServices(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const removeService = id => {
    setSelectedServices(prev => {
      const next = new Set(prev)
      next.delete(id)
      return next
    })
  }

  return (
    <div className="min-h-screen bg-night-950 font-inter antialiased">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-10 pb-32 lg:pb-10">
        <div className="lg:grid lg:grid-cols-[1fr_340px] lg:gap-8 xl:gap-12">

          
          <ServiceGrid
            selectedServices={selectedServices}
            onToggle={toggleService}
            pricing={pricing}
          />

       
          <aside className="hidden lg:block">
            <PriceSummary
              pricing={pricing}
              selectedServices={selectedServices}
              onGetQuote={() => setShowForm(true)}
              onRemove={removeService}
            />
          </aside>
        </div>
      </main>

   
      <MobileBar pricing={pricing} onGetQuote={() => setShowForm(true)} />

 
      <AnimatePresence>
        {showForm && (
          <CustomerForm
            key="form"
            pricing={pricing}
            onClose={() => setShowForm(false)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
