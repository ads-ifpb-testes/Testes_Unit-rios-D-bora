import zod from 'zod';


export const listBookDTO = zod.object({
    idUsuario: zod.string().min(1, "Deve ser informado o id do usuario"),
});

export type listBookModel = zod.infer<typeof listBookDTO>;

export const EditBookDTO = zod.object({
    id: zod.string().min(1, "Deve ser informado o id do livro"),
    title: zod.string().min(1, "O título deve ser informado"),
    author: zod.string().min(1, "O autor deve ser informado"),
    genre: zod.string().min(1, "O gênero deve ser informado"),
    rating: zod.number().min(0, "A nota deve ser um número entre 0 e 5").max(5, "A nota deve ser um número entre 0 e 5"),
    review: zod.string().optional(), // Campo opcional
});

export type EditBookModel = zod.infer<typeof EditBookDTO>;