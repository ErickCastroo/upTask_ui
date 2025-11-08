
import { z } from 'zod'


//auth
const AuthSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  confirmPassword: z.string(),
  token: z.string()
})

//users
export const UserSchema = AuthSchema.pick({
  name: true,
  email: true,
}).extend({
  _id: z.string(),
})
export type UserA = z.infer<typeof UserSchema>


//** Proyectos */
export const ProjectSchema = z.object({
  _id: z.string(),
  projectName: z.string(),
  clientName: z.string(),
  description: z.string(),
  manager: z.string(UserSchema.pick({ _id: true})),
})

export const homeProjectSchema = z.array(
  ProjectSchema.pick({
    _id: true,
    projectName: true,
    clientName: true,
    description: true,
    manager: true
  })
)

export type Project = z.infer<typeof ProjectSchema>
export type ProjectFormTypes = Pick<Project, 'projectName' | 'clientName' | 'description'>



type Auth = z.infer<typeof AuthSchema>
export type PuserLoginForm = Pick<Auth, 'email' | 'password'>
export type PuserRegistrationForm = Pick<Auth, 'name' | 'email' | 'password' | 'confirmPassword'>
export type ForgotPasswordForm = Pick<Auth, 'email'>
export type PchangePassword = Pick<Auth, 'password' | 'confirmPassword'>

//token
export type confirmToken = Pick<Auth, 'token'>


//Notes
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const noteSchema = z.object({
  _id: z.string(),
  content: z.string(),
  CreateBy: UserSchema,
  task: z.string(),
})

export type Note = z.infer<typeof noteSchema>
export type NoteFormData = Pick<Note, 'content' >

//Tasks
export const TaskStatusSchema = z.enum(['pending', 'onHold', 'inProgress', 'underReview', 'completed'])
export const TaskSchema = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  projectId: z.string(),
  status: TaskStatusSchema,
  completedBy: UserSchema.pick({ _id: true, name: true }).or(z.null()),
  createdAt: z.string(),
  updatedAt: z.string(),
})



export type Task = z.infer<typeof TaskSchema>
export type TaskFormTypes = Pick<Task, 'name' | 'description' | 'status'>
export type TaskStatus = z.infer<typeof TaskStatusSchema>

// Teams
export const TeamMemberSchema = UserSchema.pick({
  name: true,
  email: true,
  _id: true,
})

export const TeamMembersSchema = z.array(TeamMemberSchema) 

export type TeamMember = z.infer<typeof TeamMemberSchema>
export type TeamMemberForm = Pick<TeamMember, 'email'>