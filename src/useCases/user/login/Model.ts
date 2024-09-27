import zod from 'zod';

export const LoginUserDTO = zod.object({
    email: zod.string().min(1, "Você precisa informar um E-mail.")
    .email("E-mail inválido"),
    password:zod.string().min(8, "A senha deve ter ao menos 8 caracteres.")
})

export type LoginUserModel = zod.infer<typeof LoginUserDTO>