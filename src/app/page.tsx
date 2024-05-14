interface UserProps{
  id: string
  email: string
  username: string
  password: string
  token: [{id: string, userId: string}]
}
export default async function Home() {
  const response = await fetch(`app-three-ashen.vercel.app/api/user`)
  const data = await response.json()

  return (
    <div>
      {
        data.user.map((user: UserProps, index:number) => (
          <div key={index}>
            <h1>{user.username}</h1>
            <p>{user.email}</p>
          </div>
        ))
      }
      <h1>Home Page</h1>
    </div>
  );
}
