import { useState } from 'react'
import axios from 'axios'

export default function QuoteForm(){
  const [form, setForm] = useState({name:'', company:'', email:'', phone:'', address:'', service:'', message:''})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(null)

  const onChange = (e) => setForm({...form, [e.target.name]: e.target.value})

  async function submit(e){ 
    e.preventDefault(); setLoading(true)
    try{
      let token = null
      if (typeof window !== 'undefined' && window.grecaptcha && process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) {
        token = await window.grecaptcha.execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY, {action: 'quote'})
      }
      const payload = {...form, recaptchaToken: token}
      await axios.post('/api/quote', payload)
      setSuccess(true)
      setForm({name:'', company:'', email:'', phone:'', address:'', service:'', message:''})
    }catch(err){
      console.error(err)
      setSuccess(false)
    }finally{ setLoading(false) }
  }

  return (
    <form onSubmit={submit} className="grid gap-3">
      <input name="name" onChange={onChange} value={form.name} placeholder="Full name" required className="input" />
      <input name="company" onChange={onChange} value={form.company} placeholder="Company" className="input" />
      <input name="email" onChange={onChange} value={form.email} placeholder="Email" required className="input" />
      <input name="phone" onChange={onChange} value={form.phone} placeholder="Phone" required className="input" />
      <input name="address" onChange={onChange} value={form.address} placeholder="Site address" className="input" />
      <select name="service" onChange={onChange} value={form.service} required className="input">
        <option value="">Select service</option>
        <option>Grounds Maintenance</option>
        <option>Landscaping & Softworks</option>
        <option>Reactive Property Maintenance</option>
        <option>Tree Work</option>
      </select>
      <textarea name="message" onChange={onChange} value={form.message} placeholder="Brief description" className="input"></textarea>

      <button type="submit" className="px-4 py-2 bg-primary text-white rounded" disabled={loading}>{loading? 'Sending...' : 'Send request'}</button>

      {success === true && <div className="text-green-600">Thanks — we will contact you shortly.</div>}
      {success === false && <div className="text-red-600">There was a problem. Try again.</div>}
    </form>
  )
}
