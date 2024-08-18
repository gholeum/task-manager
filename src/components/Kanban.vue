<template>
    <div class="kanban">
      <section
        v-for="column in columns"
        :key="column.id"
        :class="`kanban__column kanban__column--${column.id}`"
        :data-column-id="column.id"
      >
        <div class="kanban__header">
          <div class="kanban__header-content">
            <div class="title">
              <div class="kanban__icon kanban__icon--column">
                <i :class="column.icon"></i>
              </div>
              <h2 class="kanban__title">{{ column.title }}</h2>
            </div>
            <div
              title="Добавить задачу"
              class="kanban__icon kanban__icon--add"
              :data-column-id="column.id"
            >
              <i class="bi bi-plus"></i>
            </div>
          </div>
        </div>
        <div class="kanban__list">
        </div>
      </section>
    </div>
  </template>
  
  <script>

  export default {
    name: 'theKanban',
    data() {
      return {
        columns: [
          {
            id: "to-do",
            title: "Задачи",
            icon: "bi bi-hourglass-top",
            tasks: []
          },
          {
            id: "in-progress",
            title: "В процессе",
            icon: "bi bi-hourglass-split",
            tasks: []
          },
          {
            id: "done",
            title: "Выполнено",
            icon: "bi bi-hourglass-bottom",
            tasks: []
          }
        ]
      };
    }
  };
  </script>
  
  <style>
  .kanban {
    display: flex;
    flex-wrap: nowrap;
    padding: 40px;
    gap: 40px;
    justify-content: space-around;
    flex-grow: 1;
    background: linear-gradient(#b9848c, #806491);
    border-radius: 480px 0px;
  }
  
  .kanban__column {
    flex: 0 0 100%;
    background-color: #D5CCFF;
    border-radius: 16px;
    gap: 24px;
  }
  
  .kanban__title {
    font-family: 'PT Sans', sans-serif;
    font-size: 32px;
    font-weight: 700;
    color: #02315E;
    line-height: 41.66px;
    text-align: left;
    padding-bottom: 10px;
    margin-bottom: 10px;
  }
  
  .kanban__header-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding: 0px 20px;
  }
  
  .kanban__icon--add:hover {
    cursor: pointer;
    opacity: .5;
  }
  
  .kanban__list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    min-height: 331px;
  }

  .title {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.bi {
  font-size: 1.5em;
  color: white;
}

.bi-plus {
  font-size: 2em;
  color: rgb(77, 63, 63);
}
  
@media screen and (min-width: 640px) {
    .kanban__column {
        flex: 0 0 calc(33.333% - 20px);
    }
}
  </style>