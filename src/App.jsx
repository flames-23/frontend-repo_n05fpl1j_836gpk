import React, { useMemo, useRef, useState } from 'react'
import Spline from '@splinetool/react-spline'
import { motion } from 'framer-motion'
import { Palette, Upload, Users, Wand2, ShoppingCart, ShieldCheck, ChevronRight } from 'lucide-react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || ''

function Hero() {
  return (
    <section className="relative h-[70vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/4Tf9WOIaWs6LOezG/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/60 to-transparent pointer-events-none" />
      <div className="relative z-10 h-full container mx-auto px-6 flex flex-col justify-end pb-12">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight text-[#0A66C2]"
        >
          JerseyKraft by Vyāna Sports
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="mt-4 text-lg md:text-2xl text-gray-700 max-w-2xl"
        >
          India-first platform to design and order custom sports jerseys — fast, sleek, and built for teams.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mt-8 flex flex-wrap gap-3"
        >
          <a href="#editor" className="inline-flex items-center gap-2 bg-[#0A66C2] text-white px-5 py-3 rounded-lg shadow hover:bg-[#094ea1] transition">
            Start Designing <ChevronRight size={18} />
          </a>
          <a href="#pricing" className="inline-flex items-center gap-2 bg-[#FF6F00] text-white px-5 py-3 rounded-lg shadow hover:bg-[#d85f00] transition">
            View Pricing <ChevronRight size={18} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

function Feature({ icon: Icon, title, desc }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}
      className="p-5 rounded-xl border bg-white/80 backdrop-blur-sm hover:shadow-md transition">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-blue-50 text-[#0A66C2]"><Icon size={22} /></div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <p className="mt-2 text-gray-600 text-sm">{desc}</p>
    </motion.div>
  )
}

function RosterImport() {
  const [fileName, setFileName] = useState('')
  const [result, setResult] = useState(null)
  const inputRef = useRef(null)

  const handleUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setFileName(file.name)

    const form = new FormData()
    form.append('team_name', 'My Team')
    form.append('sport', 'cricket')
    form.append('csv', file)

    const res = await fetch(`${API_BASE}/api/team/import`, { method: 'POST', body: form })
    const data = await res.json()
    setResult(data)
  }

  return (
    <div className="rounded-xl border p-5 bg-white/80">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-orange-50 text-[#FF6F00]"><Users size={20} /></div>
        <div>
          <h4 className="font-semibold">Bulk Team Roster Import</h4>
          <p className="text-sm text-gray-600">Upload CSV with name, number, size</p>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-3">
        <button onClick={() => inputRef.current?.click()} className="inline-flex items-center gap-2 px-4 py-2 bg-[#0A66C2] text-white rounded-lg">
          <Upload size={18} /> Upload CSV
        </button>
        <input ref={inputRef} type="file" accept=".csv" className="hidden" onChange={handleUpload} />
        {fileName && <span className="text-sm text-gray-700">{fileName}</span>}
      </div>
      {result && (
        <p className="mt-3 text-sm text-gray-700">Imported {result.count} players</p>
      )}
    </div>
  )
}

function AILogo() {
  const [prompt, setPrompt] = useState('')
  const [resp, setResp] = useState(null)

  const generate = async () => {
    const res = await fetch(`${API_BASE}/api/ai/logo`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ prompt }) })
    setResp(await res.json())
  }

  return (
    <div className="rounded-xl border p-5 bg-white/80">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-blue-50 text-[#0A66C2]"><Wand2 size={20} /></div>
        <div>
          <h4 className="font-semibold">AI Logo Creator</h4>
          <p className="text-sm text-gray-600">Type a concept to generate a logo and placement guides</p>
        </div>
      </div>
      <div className="mt-3 flex gap-2">
        <input value={prompt} onChange={(e)=>setPrompt(e.target.value)} placeholder="e.g., Kerala Falcons minimal mark" className="flex-1 px-3 py-2 border rounded-lg" />
        <button onClick={generate} className="px-4 py-2 bg-[#FF6F00] text-white rounded-lg">Generate</button>
      </div>
      {resp && (
        <div className="mt-4 flex items-center gap-4">
          <img src={resp.logo_url} alt="AI logo" className="w-16 h-16 rounded" />
          <pre className="text-xs text-gray-600">{JSON.stringify(resp.suggested_positions, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}

function MiniEditor() {
  const [front, setFront] = useState('#0A66C2')
  const [back, setBack] = useState('#0A66C2')
  const [accent, setAccent] = useState('#FF6F00')

  return (
    <div id="editor" className="rounded-xl border p-5 bg-white/80">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-blue-50 text-[#0A66C2]"><Palette size={20} /></div>
        <div>
          <h4 className="font-semibold">Jersey Editor</h4>
          <p className="text-sm text-gray-600">Front/Back colors with saffron accents</p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="text-sm text-gray-700">Front</label>
          <input type="color" value={front} onChange={(e)=>setFront(e.target.value)} className="w-full h-10" />
        </div>
        <div>
          <label className="text-sm text-gray-700">Back</label>
          <input type="color" value={back} onChange={(e)=>setBack(e.target.value)} className="w-full h-10" />
        </div>
        <div>
          <label className="text-sm text-gray-700">Accent</label>
          <input type="color" value={accent} onChange={(e)=>setAccent(e.target.value)} className="w-full h-10" />
        </div>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="aspect-square rounded-xl border bg-gradient-to-br from-white to-gray-50 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0" style={{background: `radial-gradient(circle at 50% 30%, ${accent}22 0%, transparent 60%)`}} />
          <div className="w-32 h-40 rounded-t-2xl" style={{ background: front }} />
          <span className="absolute bottom-2 left-2 text-xs text-gray-500">Front</span>
        </div>
        <div className="aspect-square rounded-xl border bg-gradient-to-br from-white to-gray-50 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0" style={{background: `radial-gradient(circle at 50% 30%, ${accent}22 0%, transparent 60%)`}} />
          <div className="w-32 h-40 rounded-b-2xl" style={{ background: back }} />
          <span className="absolute bottom-2 left-2 text-xs text-gray-500">Back</span>
        </div>
      </div>
    </div>
  )
}

function Checkout() {
  const [qty, setQty] = useState(12)
  const [result, setResult] = useState(null)

  const placeOrder = async () => {
    const payload = {
      customer_name: 'Demo Captain',
      customer_email: 'captain@example.com',
      customer_phone: '+91-9999999999',
      shipping_address: 'Bengaluru, Karnataka',
      team_id: null,
      template_id: null,
      design: { front_color: '#0A66C2', back_color: '#0A66C2', accents: ['#FF6F00'], text_elements: [], logo_elements: [] },
      quantity: qty,
      method: 'upi'
    }
    const res = await fetch(`${API_BASE}/api/checkout`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    const data = await res.json()
    setResult(data)
  }

  return (
    <div className="rounded-xl border p-5 bg-white/80">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-blue-50 text-[#0A66C2]"><ShoppingCart size={20} /></div>
        <div>
          <h4 className="font-semibold">Checkout</h4>
          <p className="text-sm text-gray-600">UPI, cards, and netbanking supported</p>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-3">
        <input type="number" value={qty} onChange={(e)=>setQty(parseInt(e.target.value||'0'))} className="w-24 px-3 py-2 border rounded-lg" />
        <button onClick={placeOrder} className="px-4 py-2 bg-[#0A66C2] text-white rounded-lg">Place Order</button>
      </div>
      {result && (
        <div className="mt-4 text-sm text-gray-700">
          <p>Order created for ₹{result.amount}</p>
          <p className="text-xs">Order ID: {result.order_id}</p>
        </div>
      )}
    </div>
  )
}

function Trust() {
  return (
    <div className="rounded-xl border p-5 bg-white/80">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-blue-50 text-[#0A66C2]"><ShieldCheck size={20} /></div>
        <div>
          <h4 className="font-semibold">Reliable Production</h4>
          <p className="text-sm text-gray-600">Tracked stages: Confirmed → In Production → QC → Shipped</p>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50/40">
      <Hero />

      <section className="container mx-auto px-6 py-14">
        <div className="grid md:grid-cols-3 gap-4">
          <Feature icon={Palette} title="Interactive Editor" desc="Front/back views, color selection, drag-and-drop layers" />
          <Feature icon={Users} title="Team Management" desc="Bulk roster import for names, numbers, sizes" />
          <Feature icon={Wand2} title="AI-Led Design" desc="Generate logos and sponsor placement outlines" />
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <MiniEditor />
          <div className="space-y-6">
            <RosterImport />
            <AILogo />
            <Checkout />
            <Trust />
          </div>
        </div>
      </section>

      <footer className="border-t py-10">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-sm text-gray-600">© {new Date().getFullYear()} Vyāna Sports — JerseyKraft</p>
          <a href="https://www.vyanasports.com/jerseykraft" className="text-sm text-[#0A66C2] hover:underline">Deployment mirror</a>
        </div>
      </footer>
    </div>
  )
}
