import ProjectCard from './ProjectCard'
import SearchBar from './SearchBar'

export default function ProjectGallery({ projects, query, onQueryChange }) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-semibold text-slate-900">
          Project Gallery
          <span className="ml-2 text-sm font-normal text-slate-400">
            ({projects.length} shown)
          </span>
        </h2>
        <SearchBar query={query} onChange={onQueryChange} />
      </div>

      {projects.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <p className="mt-4 rounded-xl border border-dashed border-slate-300 p-4 text-center text-sm text-slate-500">
          No projects found for &ldquo;{query}&rdquo;.
        </p>
      )}
    </section>
  )
}
