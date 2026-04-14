export default function ListaMembros({
    membros,
    removerMembro,
    promoverMembro
}) {

    return (
        <div className="mx-auto mt-8 flex flex-col gap-4">
            <h1 className="text-lg text-white text-center border-b w-1/2 m-auto border-gray-100">
                Lista de Membros da Guilda
            </h1>
            {membros.map((membro) => (
                <div
                    key={membro.id}
                    className="bg-gray-600 rounded-lg text-white shadow-md p-4 flex flex-col gap-2 w-200 m-auto "
                >
                    <p><span className="font-semibold">Nome: {membro.nome}</span></p>
                    <p><span className="font-semibold">Rank: {membro.rank}</span></p>
                    <p><span className="font-semibold">Poder: {membro.poder}</span></p>

                    <div className="flex gap-2 mt-3">
                        <button
                            onClick={() => promoverMembro(membro.id)}
                            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                        >
                            Promover
                        </button>

                        <button
                            onClick={() => removerMembro(membro.id)}
                            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                        >
                            Remover
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}