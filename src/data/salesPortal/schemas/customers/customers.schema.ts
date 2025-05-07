export const customersSchema = {
    type: 'object',
    properties:{
        Customers: {type: 'array'},
        IsSuccess: { type: "boolean" },
        ErrorMessage: { type: ["string", "null"] },
        sotring: {
            type: "object",
            properties: {
              sortField: {type: "string"},
              sortOrder: {type: "string"},
            },
            required: ["sortField", "sortOrder"],
        },
    },
    required: ["IsSuccess", "ErrorMessage", "Customers", "sorting"]
}