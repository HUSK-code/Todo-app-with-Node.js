const taskIDDOM = document.querySelector(".task-edit-id");
const taskTitleDOM = document.querySelector( ".task-edit-title" );
const editTaskDOM = document.querySelector( ".single-task-form" );
const formAlertDOM = document.querySelector( ".form-alert" );
const taskCompletedDOM = document.querySelector(".task-edit-completed");

const params = window.location.search;
const id = new URLSearchParams(params).get("id");

// 特定のタスク情報を取得する
const showTask = async () => {
  try {
    const { data: task } = await axios.get(`/api/v1/tasks/${id}`);
    const { _id, title, completed } = task;
    taskIDDOM.textContent = _id;
    taskTitleDOM.value = title;
    if ( completed ) {
      taskCompletedDOM.checked = true;
    }
  } catch (err) {
    console.log(err);
  }
};
showTask();

// 特定のタスクを編集する
editTaskDOM.addEventListener( 'submit', async ( e ) => {
  e.preventDefault();
  try {
    const taskTitle = taskTitleDOM.value;
    const taskCompleted = taskCompletedDOM.checked;
    const { data: task } = await axios.patch( `/api/v1/tasks/${ id }`, {
      title: taskTitle,
      completed: taskCompleted,
    } );
    formAlertDOM.style.display = "block";
    formAlertDOM.classList.add("text-success");
    formAlertDOM.textContent = "タスクの編集に成功しました";
  } catch ( err ) {
    console.log( err );
  }
  setTimeout( () => {
    formAlertDOM.style.display = "none";
    formAlertDOM.classList.remove =("text-success");
  }, 3000 );
});
