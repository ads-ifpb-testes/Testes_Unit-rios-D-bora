import zod from 'zod';

export const FetchBookDTO = zod.object({
    idUsuario: zod.string().min(1, "Deve ser informando o id do usuario"),
});

export type FetchBookModel = zod.infer<typeof FetchBookDTO>;
