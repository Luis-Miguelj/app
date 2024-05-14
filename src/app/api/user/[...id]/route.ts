import { Elysia, t } from 'elysia'
import prisma from '@/lib/prisma'
import cors from '@elysiajs/cors'

const app = new Elysia({ prefix: '/api/user' }).compile().use(cors({origin: '*', methods: ['GET']}))


app.get('/:id', async ({ params }) => {
  const searchUser = await prisma.user.findUnique({
    where:{
      id: params.id
    }
  })
  if (!searchUser) {
    return Response.json({ message: 'Usuario não encontrado!' })
  }
  return Response.json({ message: 'Usuário encontrado!', searchUser }, { status: 200 })
}, {
  params: t.Object({
    id: t.String()
  })
})

export const GET = app.handle
