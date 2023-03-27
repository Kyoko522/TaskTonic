//local storage start
const itemArray = localStorage.getItem("new-task-input") ? JSON.parse(localStorage.getItem("new-task-input")) :
	[]

const workingon = localStorage.getItem("works") ? JSON.parse(localStorage.getItem("works")) :
	[]

const completed = localStorage.getItem("complete") ? JSON.parse(localStorage.getItem("complete")) :
	[]
//chnage
checkArray();
function checkArray() {
	// console.log('----------------------------')
	// console.log('To Do')
	// console.log(itemArray)
	// console.log('Working On')
	// console.log(workingon)
	// console.log('Completed Task')
	// console.log(completed)
	//localStorage.clear();
}

//drag feature START----------------------------------------------------------------
function drag() {
	const draggables = document.querySelectorAll('.task') //all the items on the screen that you can drag
	const containers = document.querySelectorAll('.tasks_todo')//where are we able to drop are items
	const containers_work = document.querySelectorAll('.tasks_work')
	const containers_done = document.querySelectorAll('.tasks_done')

	draggables.forEach(task => {                            //go through all the items on the screen that can be dragged
		task.addEventListener('dragstart', e => {            //what happens when we start dragging
			task.classList.add('dragging')                      //set a class when trying to drag a task
		})

		task.addEventListener('dragend', () => {              //see when the user stops dragging the task
			task.classList.remove('dragging')                   //remove what was done to the style when dragging
		})
	})

	containers.forEach(tasks_todo => {
		// loop through all the tasks or containers where the task are being stored (to do, working on, and complete)
		tasks_todo.addEventListener('dragover', e => {
			e.preventDefault()                                  //change the cursor so that it say that we are allowed to drop somthing there
			const afterElement = getDragAfterElement(tasks_todo, e.clientY) //call the function to get the where in the container the task should be located and save it in the afterElement
			const task = document.querySelector('.dragging') //find the element that is currently dragging see what elemetn has the class dragging
			if (afterElement == null) {
				const div = document.querySelector('div ');
				tasks_todo.appendChild(task)
			} else {
				tasks_todo.insertBefore(task, afterElement)
			}

		})

	})

	containers_work.forEach(tasks_work => {
		// loop through all the tasks or containers where the task are being stored (to do, working on, and complete)
		tasks_work.addEventListener('dragover', e => {
			e.preventDefault()                                  //change the cursor so that it say that we are allowed to drop somthing there
			const afterElement = getDragAfterElement(tasks_work, e.clientY) //call the function to get the where in the container the task should be located and save it in the afterElement
			const task = document.querySelector('.dragging') //find the element that is currently dragging see what elemetn has the class dragging
			if (afterElement == null) {
				const div = document.querySelector('div ');
				tasks_work.appendChild(task)
			} else {
				tasks_work.insertBefore(task, afterElement)
			}
		})

	})
	checkArray();

	containers_done.forEach(tasks_done => {
		// loop through all the tasks or containers where the task are being stored (to do, working on, and complete)
		tasks_done.addEventListener('dragover', e => {
			e.preventDefault()                                  //change the cursor so that it say that we are allowed to drop somthing there
			const afterElement = getDragAfterElement(tasks_done, e.clientY) //call the function to get the where in the container the task should be located and save it in the afterElement
			const task = document.querySelector('.dragging') //find the element that is currently dragging see what elemetn has the class dragging
			if (afterElement == null) {
				const div = document.querySelector('div ');
				tasks_done.appendChild(task)
			} else {
				tasks_done.insertBefore(task, afterElement)
			}

		})

	})

	//this will sort where the task should be between what 2 task do u want it
	function getDragAfterElement(tasks_todo, y) {//get the mouse postion
		const taskElements = [...tasks_todo.querySelectorAll('.task:not(.dragging)')]//get all the elements inside of the container and put it inside of a array

		return taskElements.reduce((closest, child) => {//call a function on the array that we made and loop through it and which element is right after the y postion
			const box = child.getBoundingClientRect()//give us a rectangle for the children
			const offset = y - box.top - box.height / 2//find the center of are boxes
			if (offset < 0 && offset > closest.offset) {//we only care about the offset that below 0 and also which one is the closest to zeor
				return { offset: offset, element: child }//return the offset and which element is the closest
			} else {
				return closest
			}
		}, { offset: Number.NEGATIVE_INFINITY }).element//set the offset to that all the other elements will be closer to y and is the smallest
	}
}

//drag feature END----------------------------------------------------------------


//Show the task from the previous chapter START ------------------------------------------------
for (let i = 0; i < itemArray.length; i++) {
	//const task_input_el = document.createElement('input');
	const list_todo = document.querySelector("#status_todo")
	const list_work = document.querySelector("#status_work")														//this doesn't need to be here as this is only looping through the todo list section  we still need to add 2 more loops to check the other 2 sections
	const list_complete = document.querySelector("status_complete")
	const task_el = document.createElement('div');
	task_el.setAttribute('draggable', 'true');//this is equal to having draggable = 'true'
	task_el.className = 'task';
	task_el.classList.add('task');

	const task_content_el = document.createElement('div');
	task_content_el.classList.add('content');

	task_el.appendChild(task_content_el);

	const task_input_el = document.createElement('input');
	task_input_el.classList.add('text');
	task_input_el.type = 'text';
	task_input_el.value = itemArray[i];
	task_input_el.setAttribute('readonly', 'readonly');

	task_content_el.appendChild(task_input_el);

	const task_actions_el = document.createElement('div');
	task_actions_el.classList.add('actions');

	const task_edit_el = document.createElement('button');
	task_edit_el.classList.add('edit');
	task_edit_el.innerText = 'Edit';

	const task_delete_el = document.createElement('button');
	task_delete_el.classList.add('delete');
	task_delete_el.innerText = 'Delete';

	task_actions_el.appendChild(task_edit_el);
	task_actions_el.appendChild(task_delete_el);

	task_el.appendChild(task_actions_el);

	list_todo.appendChild(task_el);//add the task to the screen

	task_edit_el.addEventListener('click', (e) => {
		if (task_edit_el.innerText.toLowerCase() == "edit") {
			task_edit_el.innerText = "Save";
			task_input_el.removeAttribute("readonly");
			task_input_el.focus();
		} else {
			task_edit_el.innerText = "Edit";
			task_input_el.setAttribute("readonly", "readonly");
		}
	});
	//show the task from the previous session END----------------------------------------------------------------
	drag();



	//to remove the task and also to remove it from local storage START----------------------------------------------------------------
	const taskEl = document.querySelector('.task');
	const taskTask = task_input_el.value;
	task_delete_el.addEventListener('click', (e) => {

		for (let i = 0; i < itemArray.length; i++) {
			if (taskTask.toString() === itemArray[i].toString()) {
				itemArray.splice(i, 1);
				localStorage.setItem("new-task-input", JSON.stringify(itemArray));
				i--;
			}
		}
		console.log(itemArray);
		localStorage.setItem("new-task-input", JSON.stringify(itemArray));
		list_todo.removeChild(task_el);
	});
}

//local storage end

//change the title of the website START----------------------------------------------------------------
// Get the current tab title
const originalTitle = document.title;

// Listen for visibility change events
document.addEventListener('visibilitychange', () => {
	// Check if the page is hidden
	if (document.visibilityState === 'hidden') {
		// Change the tab title to indicate the page is hidden
		document.title = 'You Have Work To Do !!';
	} else {
		// Change the tab title back to the original title when the page is visible
		document.title = originalTitle;
	}
});
// change the title of the website END----------------------------------------------------------------




//date start----------------------------------------------------------------

// function displayDate(){
// 	let date = new Date()
// 	date = date.toString().split(" ")
// 	date = date[1] + " " + date[2] + " " + date[3]
// 	document.querySelector("#date").innerHTML = date
//   }
//
//   window.onload = function() {
// 	displayDate()
// };
//date end----------------------------------------------------------------

//making a new task and adding it to the screen START----------------------------------------------------------------
window.addEventListener('load', () => { //does all the html and css file stuff firtst then come here
	const form = document.querySelector("#new-task-form");
	const input = document.querySelector("#new-task-input");
	const list_todo = document.querySelector("#status_todo");

	form.addEventListener('submit', (e) => {//run this every time the submit button is clicked
		e.preventDefault();//prevent the web page from refreshing
		if (input.value != '') {
			itemArray.push(input.value)
			localStorage.setItem("new-task-input", JSON.stringify(itemArray));
		}
		console.log(itemArray)


		const task = input.value;

		if (!task) {
			alert("Please fill out the task")
			return false;
		}

		const task_el = document.createElement('div');
		task_el.setAttribute('draggable', 'true');//this is equal to having draggable = 'true'
		task_el.className = 'task';
		task_el.classList.add('task');


		const task_content_el = document.createElement('div');
		task_content_el.classList.add('content');

		task_el.appendChild(task_content_el);

		const task_input_el = document.createElement('input');
		task_input_el.classList.add('text');
		task_input_el.type = 'text';
		task_input_el.value = task;
		task_input_el.setAttribute('readonly', 'readonly');

		task_content_el.appendChild(task_input_el);

		const task_actions_el = document.createElement('div');
		task_actions_el.classList.add('actions');

		const task_edit_el = document.createElement('button');
		task_edit_el.classList.add('edit');
		task_edit_el.innerText = 'Edit';

		const task_delete_el = document.createElement('button');
		task_delete_el.classList.add('delete');
		task_delete_el.innerText = 'Delete';

		task_actions_el.appendChild(task_edit_el);
		task_actions_el.appendChild(task_delete_el);

		task_el.appendChild(task_actions_el);

		list_todo.appendChild(task_el);//add the task to the screen

		//draggables.push(task_el);
		input.value = '';

		task_edit_el.addEventListener('click', (e) => {
			if (task_edit_el.innerText.toLowerCase() == "edit") {
				task_edit_el.innerText = "Save";
				task_input_el.removeAttribute("readonly");
				task_input_el.focus();
			} else {
				task_edit_el.innerText = "Edit";
				task_input_el.setAttribute("readonly", "readonly");
			}
		});



		//to remove the task and also to remove it from local storage START----------------------------------------------------------------
		const taskEl = document.querySelector('.task');
		const taskTask = task_input_el.value;

		task_delete_el.addEventListener('click', (e) => {//when the delete button is clicked
			console.log(taskTask);
			for (let i = 0; i < itemArray.length; i++) {
				if (taskTask.toString() === itemArray[i].toString()) {
					itemArray.splice(i, 1);
					localStorage.setItem("new-task-input", JSON.stringify(itemArray));
					i--;
					break;

				}
			}
			localStorage.setItem("new-task-input", JSON.stringify(itemArray));
			list_todo.removeChild(task_el);
		});

		task_el.addEventListener('drag', (e) => {
			console.log(`Dragging task: ${task}`);
		});

		drag();
	});
});

//making a new task and adding it ot the screen END----------------------------------------------------------------