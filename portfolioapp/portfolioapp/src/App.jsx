import { useMemo, useState } from 'react'

const starterProjects = [
  {
    id: 1,
    title: 'Budget Buddy',
    description: 'A simple expense tracker with category charts and monthly summaries.'
  },
  {
    id: 2,
    title: 'Study Sprint',
    description: 'A focused timer app with tasks and streak tracking for study sessions.'
  },
  {
    id: 3,
    title: 'Recipe Radar',
    description: 'Search and save favorite recipes with tags and difficulty filters.'
  },
]

function App() {
  const [projects, setProjects] = useState(starterProjects)
  const [query, setQuery] = useState('')
  const [form, setForm] = useState({
    title: '',
    description: '',
  })

  const filteredProjects = useMemo(() => {
    const searchText = query.trim().toLowerCase()
    if (!searchText) return projects

    return projects.filter((project) => {
      const haystack = [
        project.title,
        project.description,
      ]
        .join(' ')
        .toLowerCase()

      return haystack.includes(searchText)
    })
  }, [projects, query])

  function handleInputChange(event) {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()

    const title = form.title.trim()
    const description = form.description.trim()
    if (!title || !description) return

    const newProject = {
      id: Date.now(),
      title,
      description,
    }

    setProjects((prev) => [newProject, ...prev])
    setForm({ title: '', description: '' })
  }

  return (
    <div className="min-h-screen bg-blue-100 text-slate-800">
      <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="mb-8 grid gap-6 lg:grid-cols-5">
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-2 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
          >
            <h2 className="text-xl font-semibold">Add New Project</h2>

            <div className="mt-4 space-y-3">
              <input
                name="title"
                value={form.title}
                onChange={handleInputChange}
                placeholder="Project title"
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-emerald-500"
                required
              />
              <textarea
                name="description"
                value={form.description}
                onChange={handleInputChange}
                placeholder="description"
                className="h-24 w-full resize-none rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-emerald-500"
                required
              />
            </div>

            <button
              type="submit"
              className="mt-4 w-full rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              Add Project
            </button>
          </form>

          <div className="lg:col-span-3 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-xl font-semibold">Project Gallery</h2>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by title or description"
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-emerald-500 sm:max-w-xs"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {filteredProjects.map((project) => (
                <article
                  key={project.id}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4 "
                >
                  <h3 className="text-lg font-semibold text-slate-900">{project.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{project.description}</p>
                </article>
              ))}
            </div>

            {filteredProjects.length === 0 ? (
              <p className="mt-6 rounded-xl border border-dashed border-slate-300 p-4 text-sm text-slate-500">
                No projects found for this search.
              </p>
            ) : null}
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
