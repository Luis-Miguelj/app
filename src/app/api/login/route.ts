import {Elysia, t} from 'elysia'
import prisma from '@/lib/prisma'
import cors from '@elysiajs/cors'

const app = new Elysia({ prefix: '/api/user' }).use(cors({origin: '*', methods: ['POST']}))

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

export const POST = app.handle
