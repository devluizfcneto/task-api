import vine from "@vinejs/vine";
import { TaskStatus } from "../enums/TaskStatus.js";
import { FieldContext } from "@vinejs/vine/types";

const isValidTaskStatus = vine.createRule((value: unknown, _, field: FieldContext) => {
    if(!value)  return

    const status = String(value).toUpperCase();

    if(status !== TaskStatus.PENDING.toUpperCase() && status !== TaskStatus.COMPLETED.toUpperCase()){
        field.report(
            `The ${field.name} field must be either 'pending' or 'completed'.`,
            'status',
            field
        );
    }
}); 

export const createTaskValidator = vine.compile(
    vine.object({
        title: vine.string().trim().minLength(1).maxLength(255),
        description: vine.string().trim().maxLength(10000).optional(),
        status: vine.string().trim().optional().use(isValidTaskStatus()),
    })
);


export const updateTaskValidator = vine.compile(
    vine.object({
        title: vine.string().trim().minLength(1).maxLength(255).optional(),
        description: vine.string().trim().maxLength(10000).optional(),
        status: vine.string().trim().optional().use(isValidTaskStatus()),
    })
)
