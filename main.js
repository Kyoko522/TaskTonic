//local storage start
const itemArray = localStorage.getItem("new-task-input") ? JSON.parse(localStorage.getItem("new-task-input")):
[]

//local storage end

//change the title of the website START
// Get the current tab title
const originalTitle = document.title;

// Listen for visibility change events
document.addEventListener('visibilitychange', () => {
  // Check if the page is hidden
  if (document.visibilityState === 'hidden') {
    // Change the tab title to indicate the page is hidden
    document.title = 'You Have Work!!';
  } else {
    // Change the tab title back to the original title when the page is visible
    document.title = originalTitle;
  }
});

  // change the title of the website END

//date start 
console.log(itemArray)

function displayDate(){
	let date = new Date()
	date = date.toString().split(" ")
	date = date[1] + " " + date[2] + " " + date[3] 
	document.querySelector("#date").innerHTML = date 
  }

  window.onload = function() {
	displayDate()
};
//date end

//making a new task and adding it to the screen START
window.addEventListener('load', () => { //does all the html and css file stuff firtst then come here 
	const form = document.querySelector("#new-task-form");
	const input = document.querySelector("#new-task-input");
	const list_el = document.querySelector("#status");

	form.addEventListener('submit', (e) => {//run this every time the submit button is clicked
		e.preventDefault();//show that button can be clicked again

		
		const task = input.value;
		
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

		list_el.appendChild(task_el);
		createItem(input)

		function createItem(input) {
			itemArray.push(input.value)
			localStorage.setItem("new-task-input", JSON.stringify(itemArray))
			// location.reload()
		}

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

		task_delete_el.addEventListener('click', (e) => {
			list_el.removeChild(task_el);
		});


		//drag feature START
		const draggables = document.querySelectorAll('.task') //all the items on the screen that you can drag
		const containers = document.querySelectorAll('.tasks')//where are we able to drop are items 

		draggables.forEach(task => {                            //go through all the items on the screen that can be dragged
			task.addEventListener('dragstart', () => {            //what happens when we start dragging
				task.classList.add('dragging')                      //set a class when trying to drag a task
			})

			task.addEventListener('dragend', () => {              //see when the user stops dragging the task
				task.classList.remove('dragging')                   //remove what was done to the style when dragging
			})
		})

		containers.forEach(tasks => {                           // loop through all the tasks or containers where the task are being stored (to do, working on, and complete)           
			tasks.addEventListener('dragover', e => {
				e.preventDefault()                                  //change the cursor so that it say that we are allowed to drop somthing there
				const afterElement = getDragAfterElement(tasks, e.clientY) //call the function to get the where in the container the task should be located and save it in the afterElement
				const task = document.querySelector('.dragging') //find the element that is currently dragging see what elemetn has the class dragging
				if (afterElement == null) {
					tasks.appendChild(task)
				} else {
					tasks.insertBefore(task, afterElement)//this one causes a error to occur
				}
			})
		})

		//this will sort where the task should be between what 2 task do u want it 
		function getDragAfterElement(tasks, y) {//get the mouse postion
			const taskElements = [...tasks.querySelectorAll('.task:not(.dragging)')]//get all the elements inside of the container and put it inside of a array

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
		//drag feature END




	});
});
//making a new task and adding it ot the screen END
