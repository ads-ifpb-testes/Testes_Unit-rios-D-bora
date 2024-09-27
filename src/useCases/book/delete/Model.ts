import zod from 'zod';

export const RemoveBookDTO = zod.object({
    bookId: zod.string().min(1, "Deve ser informado o ID do livro"),
});

export type RemoveBookModel = zod.infer<typeof RemoveBookDTO>;