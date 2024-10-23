const tasksDOM = document.querySelector(".tasks");
const formDOM = document.querySelector(".task-form");
const taskInputDOM = document.querySelector(".task-input");
const formAlertDOM = document.querySelector(".form-alert");

// すべてのタスクを読み込む
const showTask = async () => {
  try {
    const { data: tasks } = await axios.get("/api/v1/tasks");

    if (tasks.length === 0) {
      tasksDOM.innerHTML = `<h5 class="empty-list">タスクがありません</h5>`;
      return;
    }

    const allTasks = tasks
      .map((task) => {
        const { title, completed, _id } = task;
        return `<div class="single-task ${completed && "task-completed"}">
          <h5>
            <spa><i class="far fa-check-circle"></i></spa>${title}
          </h5>
          <div class="task-links">
            <a href="edit.html?id=${_id}" class="edit-task">
              <i class="fas fa-edit"></i>
            </a>
            <button type="button" class="delete-btn" data-id="${_id}">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>`;
      })
      .join("");
    tasksDOM.innerHTML = allTasks;
  } catch (err) {
    console.log(err);
  }
};
showTask();

// タスクを新規作成する
formDOM.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = taskInputDOM.value;

  try {
    await axios.post("/api/v1/tasks", { title: title });
    showTask();
    taskInputDOM.value = "";
    formAlertDOM.style.display = "block";
    formAlertDOM.classList.add("text-success");
    formAlertDOM.textContent = "タスクを追加しました";
  } catch (err) {
    console.log(err);
    formAlertDOM.style.display = "block";
    formAlertDOM.innerHTML = "タスク名は20文字以内で入力してください";
  }
  setTimeout(() => {
    formAlertDOM.style.display = "none";
    formAlertDOM.classList.remove("text-success");
  }, 3000);
});

// タスクを削除する
tasksDOM.addEventListener("click", async (e) => {
  const element = e.target;
  if (element.parentElement.classList.contains("delete-btn")) {
    const id = element.parentElement.dataset.id;
    try {
      await axios.delete(`/api/v1/tasks/${id}`);
      showTask();
    } catch (err) {
      console.log(err);
    }
  }
});
