interface UserProps{
  id: string
  email: string
  username: string
  password: string
  token: [{id: string, userId: string}]
}
export default async function Home() {
  const response = await fetch(`https://app-three-ashen.vercel.app/api/user/663c03a6ebd5fca6f44e6658`)
  const data = await response.json()

  console.log(data)
  return (
    <div>
      {/* {
        data.user.map((user: UserProps, index:number) => (
          <div key={index}>
            <h1>{user.username}</h1>
            <p>{user.email}</p>
          </div>
        ))
      } */}
      <h1>Home Page</h1>
    </div>
  );
}
