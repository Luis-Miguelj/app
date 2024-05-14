import prisma from '@/lib/prisma'
import cors from '@elysiajs/cors'
import { Elysia, t } from 'elysia'

const app = new Elysia({ prefix: '/api/user' }).compile().use(cors({origin: '*', methods: ['GET', 'POST']}))

app.get('/', async () => {
  const user = await prisma.user.findMany()
  if (!user) {
    return Response.json({ message: 'No user found' })
  }
  return Response.json({ message: 'Hello, World!', user }, { status: 200 })
})

app.post('/', async (req)=>{
  const { email, password } = req.body
  // console.log(email, password)
  if(!email || !password){
    return Response.json({message: 'Preencha todos os campos!'}, {status: 400})
  }
  const login = await prisma.user.findUnique({
    where:{
      email,
      password
    }
  })
  if(!login){
    return Response.json({message: 'Usuário não encontrado!'}, {status: 404})
  }
  
  const token = await prisma.token.create({
    data:{
      userId: login.id
    }
  })
  if(token){
    return Response.json({message: 'Usuário logado com sucesso!', token}, {status: 200})
  }
}, {
  body: t.Object({
    email: t.String(),
    password: t.String()
  }),
  error: ()=>{
    return Response.json({message: 'Erro ao logar usuário!'}, {status: 500})
  }
},
)

export const GET = app.handle
export const POST = app.handle
