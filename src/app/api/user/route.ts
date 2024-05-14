import prisma from '@/lib/prisma'
import cors from '@elysiajs/cors'
import { Elysia, t } from 'elysia'

const app = new Elysia({ prefix: '/api/user' }).use(cors({origin: '*', methods: ['GET']}))

app.get('/', async () => {
  const user = await prisma.user.findMany()
  if(!user){
    return Response.json({message: 'Usuário não encontrado!'}, {status: 404})
  }
  return Response.json({usuarios: user}, {status: 200})
})

export const GET = app.handle
