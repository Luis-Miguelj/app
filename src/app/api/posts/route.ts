import {Elysia, t} from 'elysia'
import prisma from '@/lib/prisma'

const app = new Elysia({prefix: '/api/posts'}).compile()

app.get('/', async () => {
  const posts = await prisma.postagem.findMany({
    orderBy: {
      created: 'desc'
    }
  })
  if (!posts) {
    return Response.json({message: 'Posts não encontrados!'}, {status: 404})
  }
  return Response.json({ postagens: posts }, {status: 200})
})



export const GET = app.handle