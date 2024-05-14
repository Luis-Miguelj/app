import { PORT } from './layout'
export default async function Home() {
  const response = await fetch(`http://localhost:${PORT}/api/user`)
  const data = await response.json()

  return (
    <div>
      <h1>Olá mundo</h1>
    </div>
  );
}
