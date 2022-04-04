import * as functions from "firebase-functions";
import * as app from "express";

import {getAllTodos} from "./APIs/todos";


// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//

/* This runs the express application */
const webApp = app();

/* This will attach getAllTodos to the /todos endpoint */
webApp.get("/todos", getAllTodos);


/* This will make it so that firebase will serve the web application! */
export const api = functions.https.onRequest(webApp);


