function corRank(rank) {
  if (rank === "Diamante") return "bg-sky-200 text-sky-900";
  if (rank === "Ouro") return "bg-yellow-200 text-yellow-900";
  if (rank === "Prata") return "bg-gray-200 text-gray-800";
  return "bg-orange-200 text-orange-900";
}

export default function ListaMembros({
  membros,
  removerMembro,
  promoverMembro,
}) {
  return (
    <section className="mx-auto w-full max-w-5xl rounded-lg bg-stone-900 p-4 sm:max-w-4xl sm:p-5 lg:max-w-[900px] lg:p-6 2xl:max-w-6xl 2xl:p-7">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-amber-100 sm:text-3xl lg:text-3xl 2xl:text-4xl">
          Lista da Guilda
        </h2>
        <span className="w-fit rounded bg-stone-700 px-3 py-1 text-sm text-amber-100 sm:text-sm 2xl:text-lg">
          Total: {membros.length}
        </span>
      </div>

        <div className="flex flex-col gap-3 sm:gap-4 lg:gap-4 2xl:gap-5">
        {membros.length === 0 && (
          <div className="rounded border border-stone-600 bg-stone-800 p-4 text-center text-sm text-stone-300 sm:text-base 2xl:p-6 2xl:text-lg">
            Nenhum membro cadastrado.
          </div>
        )}

        {membros.map((membro) => (
          <article
            key={membro.id}
            className="rounded border border-stone-600 bg-stone-800 p-4 sm:p-4 lg:p-5 2xl:p-6"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex-1">
                <h3 className="mb-3 break-words text-lg font-bold text-amber-50 sm:text-lg lg:text-xl 2xl:text-2xl">
                  {membro.nome}
                </h3>

                <p className="mb-4 text-sm text-stone-300 sm:text-sm lg:text-base 2xl:text-lg">
                  Poder: {membro.poder}
                </p>

                <div className="flex flex-col gap-2 sm:flex-row">
                  <button
                    onClick={() => promoverMembro(membro.id)}
                    className="cursor-pointer rounded bg-green-700 px-3 py-2 text-sm font-sans font-semibold text-white hover:bg-green-800 sm:text-sm lg:text-base 2xl:px-4 2xl:py-3 2xl:text-lg"
                  >
                    Promover
                  </button>

                  <button
                    onClick={() => removerMembro(membro.id)}
                    className="cursor-pointer rounded bg-red-700 px-3 py-2 text-sm font-sans font-semibold text-white hover:bg-red-800 sm:text-sm lg:text-base 2xl:px-4 2xl:py-3 2xl:text-lg"
                  >
                    Remover
                  </button>
                </div>
              </div>

              <div className="flex justify-center sm:items-center sm:self-stretch">
                <span
                  className={`inline-flex w-full min-w-24 justify-center rounded px-2 py-1 text-sm font-sans font-semibold uppercase sm:w-20 sm:self-center lg:w-24 2xl:w-28 2xl:px-3 2xl:py-2 2xl:text-base ${corRank(
                    membro.rank
                  )}`}
                >
                  {membro.rank}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
