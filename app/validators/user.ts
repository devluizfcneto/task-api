import vine from '@vinejs/vine'

export const createUserValidator = vine.compile(
    vine.object({
        email: vine.string().trim().normalizeEmail().unique(async (db, value) => {
            const user = await db.from('users').where('email', value).first();
            return !user;
        }),
        password: vine.string().trim().minLength(6)
    })
);

export const updateUserValidator = vine.compile(
    vine.object({
        password: vine.string().trim().minLength(6)
    })
);