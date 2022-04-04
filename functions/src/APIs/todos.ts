/* Type casting request and response to any for convenience */
export const getAllTodos = function(request: any, response: any) {
  const todos: Array<Record<string, unknown>> = [
    {
      "id": "1",
      "title": "greeting",
      "body": "Hello world from Julio",
    },
    {
      "id": "2",
      "title": "greeting2",
      "body": "Hello2 world22 from Julio",
    },
  ];
  return response.json(todos);
};
