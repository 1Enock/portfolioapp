import { useState } from 'react'

export default function ProjectForm({ onAdd }) {
  const [form, setForm] = useState({ title: '', description: '' })

  function handleChange(event) {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    const title = form.title.trim()
    const description = form.description.trim()
    if (!title || !description) return

    onAdd({ title, description })
    setForm({ title: '', description: '' })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
    >
      <h2 className="text-lg font-semibold text-slate-900">Add New Project</h2>
      <p className="mt-1 text-sm text-slate-500">Fill in the fields below and click Add Project.</p>

      <div className="mt-4 space-y-3">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Project title"
          required
          className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-blue-400"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Short description"
          required
          rows={4}
          className="w-full resize-none rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-blue-400"
        />
      </div>

      <button
        type="submit"
        className="mt-4 w-full rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-95"
      >
        Add Project
      </button>
    </form>
  )
}
