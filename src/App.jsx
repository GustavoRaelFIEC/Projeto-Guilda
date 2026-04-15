import { useEffect, useState } from "react";
import Formulario from "./components/Formulario";
import ListaMembros from "./components/ListaMembros";

function carregarMembros() {
  const data = localStorage.getItem("guilda");

  if (!data) return [];

  try {
    const membrosSalvos = JSON.parse(data);
    return Array.isArray(membrosSalvos) ? membrosSalvos : [];
  } catch (error) {
    console.error("Erro ao ler membros salvos:", error);
    return [];
  }
}

function carregarProximoId() {
  const idSalvo = localStorage.getItem("proximoId");
  const idConvertido = Number(idSalvo);

  return Number.isFinite(idConvertido) && idConvertido > 0 ? idConvertido : 1;
}

export default function App() {
  const [membros, setMembros] = useState(() => carregarMembros());
  const [id, setId] = useState(() => carregarProximoId());

  useEffect(() => {
    localStorage.setItem("guilda", JSON.stringify(membros));
    localStorage.setItem("proximoId", String(id));
    document.title = `Membros: ${membros.length}`;
  }, [membros, id]);

  function adicionarMembro(membro) {
    const novoMembro = { ...membro, id };

    setMembros((membrosAtuais) => [...membrosAtuais, novoMembro]);
    setId((idAtual) => idAtual + 1);
  }

  function removerMembro(idMembro) {
    setMembros((membrosAtuais) =>
      membrosAtuais.filter((m) => m.id !== idMembro)
    );
  }

  function promoverMembro(idMembro) {
    setMembros((membrosAtuais) =>
      membrosAtuais.map((m) =>
        m.id === idMembro && m.poder < 100 ? { ...m, poder: m.poder + 1 } : m
      )
    );
  }

  return (
    <div className="min-h-screen bg-stone-800 px-3 py-5 font-mono text-amber-50 sm:px-5 sm:py-8 lg:px-8 lg:py-10 2xl:px-12 2xl:py-14">
      <div className="mx-auto w-full max-w-7xl 2xl:max-w-[1600px]">
        <h1 className="mb-6 text-center text-2xl font-bold uppercase text-amber-100 sm:mb-8 sm:text-3xl lg:text-4xl 2xl:text-5xl">
          Guilda dos Cacadores
        </h1>

        <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8 2xl:gap-10">
          <Formulario adicionarMembro={adicionarMembro} />
          <ListaMembros
            membros={membros}
            removerMembro={removerMembro}
            promoverMembro={promoverMembro}
          />
        </div>
      </div>
    </div>
  );
}
