import { useState, useEffect } from "react";
import { z } from "zod";

const MembroSchema = z.object({
    nome: z.string().min(3, "Mínimo nome com 3 caracteres"),
    rank: z.enum(["Bronze", "Prata", "Ouro", "Diamante"], "Selecione um Rank Válido!"),
    poder: z.number().positive("Poder tem que ser maior que 0").max(100, "Máximo de poder: 100")
});

export default function Formulario({ adicionarMembro }) {
    const [formData, setFormData] = useState({
        nome: "",
        rank: "",
        poder: ""
    });
    const [erros, setErros] = useState([]);

    // Tempo que o erro aparece
    useEffect(() => {
        if (erros.length > 0) {
            const timer = setTimeout(() => {
                setErros([]);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [erros]);

    // Pega mudanças que o usuário escreve e coloca como valor dentro do formData
    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }


    function handleSubmit(e) {
        e.preventDefault();

        // Converter string em numero
        const dados = {
            ...formData,
            poder: Number(formData.poder)
        };

        const result = MembroSchema.safeParse(dados);

        if (!result.success) {
            setErros(result.error.issues);
            return;
        }

        setErros([]);


        adicionarMembro(result.data,);

        // Limpar campos
        setFormData({
            nome: "",
            poder: ""
        });
    }



    return (
        <div>
            <div className="mt-20 m-auto bg-green-600 border w-120 h-120 rounded-lg p-6">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <h1 className=" font-bold text-center">Cadastro de Membros</h1>

                    <div className="flex flex-col">
                        <label className="font-semibold">Nome: </label>
                        <input
                            type="text"
                            name="nome"
                            placeholder="Nome"
                            value={formData.nome}
                            onChange={handleChange}
                            className="border rounded bg-gray-200 placeholder-gray-500 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="font-semibold">Rank: </label>
                        <select
                            name="rank"
                            value={formData.rank}
                            onChange={handleChange}
                            className="border bg-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-orange-400 p-2"
                        >
                            <option value={""}>Selecione um Rank</option>
                            <option value="Bronze">Bronze</option>
                            <option value="Prata">Prata</option>
                            <option value="Ouro">Ouro</option>
                            <option value="Diamante">Diamante</option>

                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label className="font-semibold">Poder: </label>
                        <input
                            type="number"
                            name="poder"
                            placeholder="Poder"
                            value={formData.poder}
                            onChange={handleChange}
                            className="border rounded px-3 placeholder-gray-500 bg-gray-200 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-500 text-white rounded-lg mt-10 border border-gray-700 px-4 py-2">
                        Adicionar
                    </button>

                    {erros.length > 0 && (
                        <div className="bg-red-100 border-red-400 text-red-700 p-2 rounded-lg">
                            {erros.map((erros, i) => (
                                <p key={i}>{erros.message}</p>
                            ))}
                        </div>
                    )}


                </form>
            </div>
        </div>
    );
}