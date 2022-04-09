import * as functions from "firebase-functions";
import * as app from "express";

import {getAllTodos, postOneTodo, deleteTodo, editTodo} from "./APIs/todos";
import {loginUser, signUpUser} from "./APIs/users";


// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//

/* This runs the express application */
const webApp = app();

/* This will attach getAllTodos to the /todos endpoint */
webApp.get("/todos", getAllTodos);

webApp.post("/todo", postOneTodo);
webApp.post("/login", loginUser);
webApp.post("/signup", signUpUser);

webApp.delete("/delete/:id", deleteTodo);
webApp.put("/edit/:id", editTodo);


/* This will make it so that firebase will serve the web application! */
export const api = functions.https.onRequest(webApp);


