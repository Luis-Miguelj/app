import { Elysia, t } from 'elysia'

const app = new Elysia({ prefix: '/api/user' })

app.get('/:id', async ({ params }) => {
  return Response.json({ id: params.id })
})

export const GET = app.handle
