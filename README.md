Read Me

The prgram is written in JavaScript, CSS, HDML and is responsible for creating a to-do list application that allows users to add tasks, edit tasks, delete tasks, and move tasks between different stages of completion.

At the top of the code, the local storage functionality is defined. The itemArray is a variable that stores the tasks added by the user. If the user has previously added tasks, the existing tasks are retrieved from local storage using getItem(), and if not, an empty array is created. The tasks are stored in local storage using setItem(), and the JSON.stringify() method is used to convert the itemArray into a string before storing it.

Next, the code defines a function that changes the title of the webpage when the user switches to a different tab. The original title of the webpage is stored in the originalTitle variable, and an event listener is added to the document to listen for changes in the visibility state of the page. If the page is hidden, the title of the webpage is changed to 'You Have Work To Do !!', and if it becomes visible again, the title is changed back to the original title.

After that, the code defines a function to display the current date on the webpage. However, this function is currently commented out, so it will not be executed. If you want to display the date on the webpage, you can uncomment the code by removing the // at the beginning of each line.

The next section of the code defines the functionality for adding tasks to the to-do list. When the window is loaded, the code adds an event listener to the submit button of the form. When the button is clicked, the code prevents the default behavior of the form (which is to refresh the page), adds the value of the input field to the itemArray, stores the updated itemArray in local storage, and creates a new task element on the webpage.

The task element is created using the createElement() method, and the task content and actions are added to the element using the appendChild() method. The task element is then added to the list element using appendChild().

The code also includes functionality for editing and deleting tasks. When the edit button is clicked, the text of the button changes to 'Save', and the input field is made editable. When the save button is clicked, the text of the button changes back to 'Edit', and the input field is made read-only again. When the delete button is clicked, the task is removed from the list element and the itemArray, and the updated itemArray is stored in local storage.

Finally, the code includes functionality for dragging and dropping tasks between different stages of completion. The draggables and containers variables are defined using the querySelectorAll() method, and event listeners are added to the task elements to handle the drag and drop events.
