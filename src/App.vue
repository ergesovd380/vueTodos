<template>
  <form @submit.prevent class="todos mb-5">

    <div class="text-center">
      <div class="d-inline-block">
        <input
        class="form-control"
        type="text"
        placeholder="Add a cards"
        v-model="newCard"
        >
      </div>
      <button class="btn btn-primary ms-2" @click="createCard" :disabled="!newCard">
        Add
      </button>
    </div>

    <div
    class="card my-3 "
    :class="{ 'bg-primary text-light text-decoration-line-through' : todo.done }"
    v-for="todo in todos"
    :key="todo.id"
    >
      <div class="card-content p-3">
        <div class="columns is-vcentered">
          <div class="column">
            <div
            class="content text-break"
            >{{ todo.title }}</div>
          </div>
          <div class="column text-end">
            <button class="btn me-2" :class="todo.done ? 'btn-success' : 'btn-light' " @click="doneCard(todo.id)"> <i class="bi bi-check2"></i> </button>
            <button class="btn btn-danger" @click="deleted(todo.id)"> <i class="bi bi-x"></i> </button>
          </div>
        </div>
      </div>
    </div>

  </form>
</template>

<script setup>
/* Imports */
  import { ref, onMounted } from 'vue'
  import { collection, onSnapshot, setDoc, doc, deleteDoc, updateDoc, query, orderBy } from 'firebase/firestore'
  import { db } from './firbase/firebase'

/* Firebase Collection */
  const todoCollectionRef = collection(db, "todos")
  const todoQueryRef = query(todoCollectionRef, orderBy("date", "desc"))

/* todos data */
  const todos = ref([
  ])

/* onMount data*/
  onMounted(() => {
    onSnapshot(todoQueryRef, (querySnapshot) => {
      const fbTodos = [];
      querySnapshot.forEach((doc) => {
        const todo = {
          id: doc.id,
          title: doc.data().title,
          done: doc.data().done
        }
        fbTodos.push(todo)
      })
      todos.value = fbTodos
    })
  })

/* Create Card */
  const newCard = ref('')
  const createCard = () => {
    setDoc(doc(todoCollectionRef), {
      title: newCard.value,
      done: false,
      date: Date.now()
    })
    newCard.value = ''
  }

/* Delete cards */
  const deleted = id => {
    deleteDoc(doc(todoCollectionRef, id))
  }

/* Done cards */
  const doneCard = id => {
    const index = todos.value.findIndex(todo => todo.id === id)
    updateDoc(doc(todoCollectionRef, id), {
      done: todos.value[index].done = !todos.value[index].done
    })
  }
</script>

<style>
@import 'bulma/css/bulma.min.css';

.todos {
  max-width: 400px;
  padding: 40px;
  margin: 0 auto;
}
.linethrough {
  text-decoration: line-through;
}

</style>
