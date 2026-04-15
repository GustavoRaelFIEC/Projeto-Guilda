import { useEffect, useState } from "react";
import { z } from "zod";

const MembroSchema = z.object({
  nome: z.string().min(3, "Minimo de 3 caracteres no nome"),
  rank: z.enum(
    ["Bronze", "Prata", "Ouro", "Diamante"],
    "Selecione um rank valido"
  ),
  poder: z
    .number()
    .positive("Poder tem que ser maior que 0")
    .max(100, "Maximo de poder: 100"),
});

export default function Formulario({ adicionarMembro }) {
  const [formData, setFormData] = useState({
    nome: "",
    rank: "",
    poder: "",
  });
  const [erros, setErros] = useState([]);

  useEffect(() => {
    if (erros.length > 0) {
      const timer = setTimeout(() => {
        setErros([]);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [erros]);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const dados = {
      ...formData,
      poder: Number(formData.poder),
    };

    const result = MembroSchema.safeParse(dados);

    if (!result.success) {
      setErros(result.error.issues);
      return;
    }

    setErros([]);
    adicionarMembro(result.data);

    setFormData({
      nome: "",
      rank: "",
      poder: "",
    });
  }

  return (
    <section className="mx-auto w-full max-w-md rounded-lg bg-amber-50 p-4 text-center text-stone-900 sm:max-w-lg sm:p-6 lg:max-w-xl 2xl:max-w-2xl 2xl:p-8">
      <h2 className="mb-4 text-2xl font-bold text-stone-900 sm:text-3xl 2xl:text-4xl">
        Cadastro de Membros
      </h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-3 sm:gap-4 2xl:gap-5"
      >
        <div className="flex w-full flex-col">
          <label className="mb-1 text-center text-base font-bold sm:text-lg 2xl:text-xl">
            Nome:
          </label>
          <input
            type="text"
            name="nome"
            placeholder="Nome do membro"
            value={formData.nome}
            onChange={handleChange}
            className="w-full rounded border border-stone-400 bg-white px-3 py-2 text-sm sm:px-4 sm:py-3 sm:text-base 2xl:text-lg"
          />
        </div>

        <div className="flex w-full flex-col">
          <label className="mb-1 text-center text-base font-bold sm:text-lg 2xl:text-xl">
            Rank:
          </label>
          <select
            name="rank"
            value={formData.rank}
            onChange={handleChange}
            className="w-full rounded border border-stone-400 bg-white px-3 py-2 text-sm sm:px-4 sm:py-3 sm:text-base 2xl:text-lg"
          >
            <option value="">Selecione um rank</option>
            <option value="Bronze">Bronze</option>
            <option value="Prata">Prata</option>
            <option value="Ouro">Ouro</option>
            <option value="Diamante">Diamante</option>
          </select>
        </div>

        <div className="flex w-full flex-col">
          <label className="mb-1 text-center text-base font-bold sm:text-lg 2xl:text-xl">
            Poder:
          </label>
          <input
            type="number"
            min="1"
            max="100"
            name="poder"
            placeholder="Nivel de poder"
            value={formData.poder}
            onChange={handleChange}
            className="w-full rounded border border-stone-400 bg-white px-3 py-2 text-sm sm:px-4 sm:py-3 sm:text-base 2xl:text-lg"
          />
        </div>

        <button
          type="submit"
          className="w-full cursor-pointer rounded bg-amber-800 px-6 py-2 text-sm font-semibold text-amber-50 hover:bg-amber-900 sm:w-auto sm:text-base 2xl:px-8 2xl:py-3 2xl:text-lg"
        >
          Adicionar
        </button>

        {erros.length > 0 && (
          <div className="w-full rounded border border-red-300 bg-red-100 p-3 text-sm text-red-700 sm:text-base 2xl:text-lg">
            {erros.map((erro, i) => (
              <p key={i}>{erro.message}</p>
            ))}
          </div>
        )}
      </form>
    </section>
  );
}
