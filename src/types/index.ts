import { z } from 'zod'

//** Proyectos */
export const ProjectSchema = z.object({
  _id: z.string(),
  projectName: z.string(),
  clientName: z.string(),
  description: z.string(),
})

export const homeProjectSchema = z.array(
  ProjectSchema.pick({
    _id: true,
    projectName: true,
    clientName: true,
    description: true
  })
)

export type Project = z.infer<typeof ProjectSchema>
export type ProjectFormTypes = Pick<Project, 'projectName' | 'clientName' | 'description'>


//Tasks
export const TaskStatusSchema = z.enum(['pending', 'onHold', 'inProgress', 'underReview', 'completed'])
export const TaskSchema = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  projectId: z.string(),
  status: TaskStatusSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
})



export type Task = z.infer<typeof TaskSchema>
export type TaskFormTypes = Pick<Task, 'name' | 'description' | 'status'>
export type TaskStatus = z.infer<typeof TaskStatusSchema>