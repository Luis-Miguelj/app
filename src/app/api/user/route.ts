import prisma from '@/lib/prisma'
import { Elysia, t } from 'elysia'

const app = new Elysia({ prefix: '/api/user' })

app.get('/', async () => {
  const user = await prisma.user.findMany()
  if (!user) {
    return Response.json({ message: 'No user found' })
  }
  return Response.json({ message: 'Hello, World!', user }, { status: 200 })
})

export const GET = app.handle
