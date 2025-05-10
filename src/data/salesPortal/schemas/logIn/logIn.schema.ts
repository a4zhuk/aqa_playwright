export const logInSchema = {
  type: "object",
  properties: {
    IsSuccess: { type: "boolean" },
    ErrorMessage: { type: ["string", "null"] },
    User: {
      type: "object",
      properties: {
        _id: { type: "string" },
        firstName: { type: "string" },
        lastName: { type: "string" },
        username: { type: "string" },
        roles: { type: "array" },
        createdOn: { type: "string" },
      },
      required: [
        "_id",
        "firstName",
        "lastName",
        "username",
        "roles",
        "createdOn"
      ],
    },
  },
  required: ["IsSuccess", "ErrorMessage", "User"],
};
