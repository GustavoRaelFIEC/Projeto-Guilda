import { useEffect, useState } from "react";
import Formulario from "./components/Formulario";
import ListaMembros from "./components/ListaMembros";

export default function App() {
  const [membros, setMembros] = useState([]);
  const [id, setId] = useState(1);

//UseEffect -> o que vai acontecer quando a página carregar?
  // Pega membro salvo no storage do navegador
  useEffect(() => {
    const data = localStorage.getItem("guilda");
    const idSalvo = localStorage.getItem("proximoId");

    // Transforma texto em um array novamente
    if (data) setMembros(JSON.parse(data));

    // Transforma o texto em numero
    if (idSalvo) setId(Number(idSalvo));

  }, []);


  // Salva membros no storage do navegador
  useEffect(() => {
    // Salva json em texto (localstorage só aceita texto)
    localStorage.setItem("guilda", JSON.stringify(membros));
    localStorage.setItem("proximoId", id);

    document.title = `Membros: ${membros.length}`;

    // Decide quando será executado (quando algum desses dois mudar)
  }, [membros, id]);


  function adicionarMembro(membro) {
    const novoMembro = { ...membro, id }

    setMembros([...membros, novoMembro]);
    setId(id + 1);
  }

  function removerMembro(id) {
    setMembros(membros.filter((m) => m.id !== id));
  }

  function promoverMembro(id) {
    setMembros(
      membros.map((m) =>
        m.id === id ? { ...m, poder: m.poder + 1 } : m
      )
    );
  }

  return (
    <div className="min-h-screen bg-green-900 ">
      <h1 className="text-center font-bold text-white">Guilda dos Caçadores</h1>
      <Formulario adicionarMembro={adicionarMembro} />

      <ListaMembros
        membros={membros}
        removerMembro={removerMembro}
        promoverMembro={promoverMembro}
      />
    </div>
  );
}
