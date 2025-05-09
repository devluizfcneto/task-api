import vine from '@vinejs/vine';

export const authLoginValidator = vine.compile(
    vine.object({
        email: vine.string().trim().normalizeEmail(),
        password: vine.string().trim(),
    })
);