import Link from "next/link";

export default async function Login(){
  async function login(data){
    'use server'
    console.log('ok')
  }
  return(
    <div className="w-full mx-auto h-screen flex justify-between items-center">
      <div className="w-2/3 h-full " id="login-page"></div>
      <div className="w-1/3 bg-zinc-900 h-full px-5 rounded-md flex flex-col space-y-10 py-28 items-center p-5 border-l border-zinc-800">
        <div className="container">
          <h1 className="text-5xl text-gray-300 font-medium font-serif">
            TechPrism
          </h1>
        </div>
        <form action={login} className="flex flex-col container h-96 gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-slate-300 font-medium">E-mail:</label>
            <input
              type="email"
              name="email"
              placeholder="Digite seu email"
              className="p-2 rounded bg-zinc-900 placeholder:text-gray-400 border-b border-gray-500 border-opacity-55 text-slate-400 outline-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-slate-300 font-medium">Senha:</label>
            <input
              type="text"
              name="password"
              placeholder="Digite sua senha"
              className="p-2 rounded bg-zinc-900 placeholder:text-gray-400 border-b border-gray-500 border-opacity-55 text-slate-400 outline-none"
            />
          </div>
          <button className="container p-3 bg-zinc-950 text-slate-300 text-lg font-medium rounded-md hover:bg-zinc-800 duration-300 border border-zinc-800">
            Entrar
          </button>
          <div className="container flex justify-between items-center">
            <div className="container w-1/2 flex justify-center">
              <h1 className="text-slate-300">Ou se preferir</h1>
            </div>
            <Link
              href={'/cadastro'}
              className="text-slate-300 text-sm w-1/2 p-3 flex items-center justify-center bg-gray-950 border border-zinc-800 hover:bg-gray-900 rounded font-medium duration-150"
            >
              Crie uma conta
            </Link>
          </div>
        </form>
      </div>
    </div>

  )
}