import zod from 'zod';

export const AddBookDTO = zod.object({
    titulo: zod.string().min(1, "O campo 'Título' deve ser preenchido."),
    idUsuario: zod.string().min(1, "Deve ser informando o id do usuario"),
    autor: zod.string().min(1, "O campo 'Autor' deve ser preenchido."),
    genero: zod.string().min(1, "O campo 'Gênero' deve ser preenchido."),
    nota: zod.number()
        .min(0, "A nota deve ser um número entre 0 e 5.")
        .max(5, "A nota deve ser um número entre 0 e 5.")
        .refine((val) => !isNaN(val), "A nota deve ser um número."),
    avaliacao: zod.string().min(1, "O campo 'Avaliação' deve ser preenchido."),
});

export type AddBookModel = zod.infer<typeof AddBookDTO>;