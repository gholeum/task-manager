<template>
    <div class="task-item" draggable="true">
      <div class="task-head">
            <h3 contenteditable="false" spellcheck="false"></h3>
            <div class="instruments">
                <div class="edit-task">
                    <i class="bi bi-pencil"></i>
                </div>
                <div class="delete-task">
                    <i class="bi bi-trash"></i>
                </div>
             </div>
        </div>
        <p class="task-item__description" contenteditable="false" spellcheck="false"></p>
        <div class="task-panel">
            <div class="effort"></div>
            <input type="date" class="hidden-date-input" value=""/>
            <p class="date"></p>
        </div>
    </div>
</template>

<script>
export default{
    name: theTask
}
</script>

<style>
.bi-pencil {
  font-size: 1em;
  color: rgb(77, 63, 63);
  opacity: 0.1;
  transition: opacity 0.3s;
}

.task:hover .bi-pencil {
  opacity: 0.7;
}

.edit-task:hover .bi-pencil{
  opacity: 1;
  color:black;
}

.bi-trash {
  font-size: 1em;
  color: rgb(77, 63, 63);
  opacity: 0.1;
  transition: opacity 0.3s;
}

.task:hover .bi-trash {
  opacity: 0.7;
}

.delete-task:hover .bi-trash{
  opacity: 1;
  color:black;
}

.task {
  background-color: #fdfdfd;
  border-radius: 12px;
  padding: 24px;
  gap: 16px;
  margin: 8px 0px 16px 0px;
}

.dragging {
  filter:opacity(0.9);
  box-shadow: 0px 0px 8px #888888;
}

.task-head {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}

.instruments {
  display: flex;
  gap: 10px;
}

h3 {
  font-size: 24px;
  text-align: left;
  color: black;
  margin-bottom: 8px;
}

.effort {
  display: flex;
  gap: 8px;
  align-items: center;
}

.date {
 display: block;
 color: #02315E;
 font-size: 18px;
}

.hidden-date-input {
  display: none;
  color: #02315E;
  font-size: 18px;
}
</style>