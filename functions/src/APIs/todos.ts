import {db} from "../util/admin";

/* Type casting request and response to any for convenience */
export const getAllTodos = async (request: any, response: any) => {
  const data = await db.collection("todos")
      .orderBy("createdAt", "desc")
      .get();

  const todos: Array<Record<string, unknown>> = [];
  data.forEach((doc: any) => {
    todos.push({
      todoId: doc.id,
      title: doc.data().title,
      body: doc.data().body,
      createdAt: doc.data().createdAt,
    });
  });
  return response.json(todos);
};


/* This is conducting a POST request. We have data! */
export const postOneTodo = function (request: any, response: any) {
	/* Error checking */
	console.log(request.body);
	if (request.body.body.trim() === '') {
		return response.status(400).json({ body: 'Must not be empty' });
	}

	if(request.body.title.trim() === '') {
		return response.status(400).json({ title: 'Must not be empty' });
	}

	/* Create JSON object of new item */
	const newItem: Record<string, unknown> = {
		title: request.body.title, 
		body: request.body.body,
		createdAt: new Date().toISOString()
	};

	/* Add new item to db under collection */
	db.collection("todos")
	.add(newItem)
	.then((doc) => {
		let responseItem = newItem;
		responseItem.id = doc.id;
		return response.json(responseItem);
	})
};

export const deleteTodo = async(request: any, response: any) => {
	console.log(request.params);
	const givenId: number = request.params.id;
	console.log(givenId);

	/* This is a ref to the document obj */
	const toDeleteDoc = db.doc(`/todos/${givenId}`);

	/* this actually gets the value of the doc (async) */
	const toDeleteValue = await toDeleteDoc.get();

	if (!toDeleteValue.exists) {
		return response.status(404).json({error: `${givenId} not found!`})
	}
	toDeleteDoc.delete();

	return response.status(200).json({Success: `${givenId} was deleted!`});
};
