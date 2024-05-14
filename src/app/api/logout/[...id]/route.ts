import { Elysia,t } from 'elysia'
import prisma from '@/lib/prisma'
import cors from '@elysiajs/cors'

const app = new Elysia({prefix: '/api/logout'}).compile().use(cors({origin: '*', methods: ['DELETE']}))

app.delete('/:id', async ({params})=>{
  if(!params.id){
    return Response.json({message: 'Usuário não encontrado!'}, {status: 404})
  }
  const user = await prisma.token.deleteMany({
    where:{
      userId: params.id,
    }
  })

  if(user){
    return Response.json({message: 'Usuário deslogado com sucesso!'}, {status: 200})
  }
},{
  params: t.Object({
    id: t.String(),
  })
})

export const DELETE = app.handle