"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Briefcase, X } from "lucide-react"
import { SEEDED_JOBS, type Job } from "@/lib/seed/jobs"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const JobSchema = z.object({
  title: z.string().min(2),
  company: z.string().min(2),
  description: z.string().min(10),
  requiredSkills: z.string().min(2),
  preferredSkills: z.string(),
  experienceLevel: z.enum(["Intern", "Junior", "Mid", "Senior"]),
})
type JobFormData = z.infer<typeof JobSchema>

export default function HRJobsPage() {
  const [jobs, setJobs] = useState<Job[]>(SEEDED_JOBS)
  const [showForm, setShowForm] = useState(false)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<JobFormData>({
    resolver: zodResolver(JobSchema),
    defaultValues: { experienceLevel: "Junior" },
  })

  const onSubmit = (data: JobFormData) => {
    const newJob: Job = {
      id: `${data.title.toLowerCase().replace(/\s+/g, "-")}-${data.company.toLowerCase()}`,
      title: data.title,
      company: data.company,
      location: "Remote",
      experienceLevel: data.experienceLevel,
      description: data.description,
      requiredSkills: data.requiredSkills.split(",").map((s) => s.trim()).filter(Boolean),
      preferredSkills: data.preferredSkills.split(",").map((s) => s.trim()).filter(Boolean),
      matchScore: 0,
      skillMatch: "0/10",
      referralAvailable: false,
    }
    setJobs((prev) => [newJob, ...prev])
    setShowForm(false)
    reset()
  }

  return (
    <div className="p-6 lg:p-8 min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Jobs</h1>
          <p className="text-muted-foreground mt-1">Manage open positions and run talent discovery.</p>
        </div>
        <motion.button
          onClick={() => setShowForm(true)}
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:opacity-90 transition-opacity"
        >
          <Plus className="w-4 h-4" /> Create Job
        </motion.button>
      </div>

      {/* Job list */}
      <div className="space-y-4 mb-8">
        {jobs.map((job, i) => (
          <motion.div key={job.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="flex flex-col sm:flex-row sm:items-center gap-4 p-5 rounded-2xl bg-white/5 border border-border hover:border-primary/30 transition-colors"
          >
            <div className="flex-1 min-w-0">
              <p className="font-bold text-white">{job.title}</p>
              <p className="text-sm text-muted-foreground">{job.company} · {job.location} · {job.experienceLevel}</p>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {job.requiredSkills.slice(0, 4).map((s) => (
                  <span key={s} className="text-[11px] px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary">{s}</span>
                ))}
                {job.requiredSkills.length > 4 && (
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/10 border border-border text-muted-foreground">+{job.requiredSkills.length - 4} more</span>
                )}
              </div>
            </div>
            <a href="/hr/talent" className="shrink-0 px-4 py-2 rounded-xl bg-primary/10 border border-primary/30 text-primary text-sm font-medium hover:bg-primary/20 transition-colors">
              Discover Talent →
            </a>
          </motion.div>
        ))}
      </div>

      {/* Create Job Drawer */}
      <AnimatePresence>
        {showForm && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 z-40" onClick={() => setShowForm(false)} />
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-background border-l border-border z-50 overflow-y-auto p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Create New Job</h2>
                <button onClick={() => setShowForm(false)} className="p-2 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {[
                  { name: "title" as const, label: "Job Title", placeholder: "e.g. AI Engineer Intern" },
                  { name: "company" as const, label: "Company", placeholder: "e.g. TechCorp" },
                  { name: "requiredSkills" as const, label: "Required Skills (comma-separated)", placeholder: "Python, Machine Learning, AWS" },
                  { name: "preferredSkills" as const, label: "Preferred Skills (comma-separated)", placeholder: "FastAPI, CI/CD Pipelines" },
                ].map(({ name, label, placeholder }) => (
                  <div key={name}>
                    <label className="block text-sm font-medium text-white mb-1">{label}</label>
                    <input {...register(name)} placeholder={placeholder}
                      className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-border text-white placeholder-muted-foreground text-sm focus:outline-none focus:border-primary transition-colors" />
                    {errors[name] && <p className="text-xs text-rose-400 mt-1">{errors[name]?.message}</p>}
                  </div>
                ))}
                <div>
                  <label className="block text-sm font-medium text-white mb-1">Description</label>
                  <textarea {...register("description")} rows={3} placeholder="Role description..."
                    className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-border text-white placeholder-muted-foreground text-sm focus:outline-none focus:border-primary transition-colors resize-none" />
                  {errors.description && <p className="text-xs text-rose-400 mt-1">{errors.description.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-1">Experience Level</label>
                  <select {...register("experienceLevel")}
                    className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-border text-white text-sm focus:outline-none focus:border-primary transition-colors">
                    {["Intern", "Junior", "Mid", "Senior"].map((l) => <option key={l} value={l} className="bg-background">{l}</option>)}
                  </select>
                </div>
                <button type="submit" className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:opacity-90 transition-opacity">
                  Create Job
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
