import {Elysia, t} from 'elysia'
import prisma from '@/lib/prisma'
import cors from '@elysiajs/cors'

const app = new Elysia({prefix: '/api/posts'}).use(cors({origin: '*', methods: ['PUT', 'POST']}))

app.put('/:id', async ({body, params})=>{
  const {title, description } = body
  if(!params.id){
    return Response.json({message: 'Post não encontrado!'}, {status: 404})
  }
  if(!title || !description){
    return Response.json({message: 'Preencha todos os campos!'}, {status: 400})
  }
  const post = await prisma.postagem.update({
    where:{
      id: params.id,
    },
    data:{
      title,
      description,
      created: new Date()
    }
  })

  if(post){
    return Response.json({message: 'Post atualizado com sucesso!', post}, {status: 200})
  }
}, {
  body: t.Object({
    title: t.String(),
    description: t.String(),
  }),
  error: ()=>{
    return Response.json({message: 'Erro ao atualizar post!'}, {status: 500})
  },
  params: t.Object({
    id: t.String(),
  })
})

app.post('/:id', async ({body, params})=>{
  const{title, description} = body
  if(!params.id){
    return Response.json({message: 'Usuário não encontrado!'}, {status: 404})
  }
  if(!title || !description){
    return Response.json({message: 'Preencha todos os campos!'}, {status: 400})
  }
  const post = await prisma.postagem.create({
    data: {
      title,
      description,
      created: new Date(),
      authorId: params.id
    }
  })
  if(post){
    return Response.json({message: 'Post criado com sucesso!', post}, {status: 201})
  }
},{
  body: t.Object({
    title: t.String(),
    description: t.String(),
  }),
  params: t.Object({
    id: t.String(),
  })
})

export const PUT = app.handle
export const POST = app.handle
