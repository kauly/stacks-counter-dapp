import useSmartContract from '../hooks/useSmartContract'

export default function Home() {
  useSmartContract()
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-800 py-2 text-center text-2xl text-white">
      <div className="flex">
        <button className="w-32 flex-initial cursor-pointer bg-sky-800 shadow active:translate-y-0.5">
          -
        </button>
        <div className="mx-2 w-64 flex-initial cursor-pointer bg-sky-800 shadow">
          0
        </div>
        <button className="w-32 flex-initial cursor-pointer bg-sky-800 shadow active:translate-y-0.5">
          +
        </button>
      </div>
    </div>
  )
}
