<template>
    <div class="bg-blue-600 flex justify-between px-5 h-14 items-center">
        <a class=" text-white text-xl" href="#">Firebase Auth</a>
        <ul class="flex">
            <li class="mx-2">
                <router-link class=" text-white" to="/dashboard"
                    >Dashboard</router-link
                >
            </li>
            <li class="mx-2 text-white cursor-pointer" @click="logOut">
                <span>Logout</span>
            </li>
        </ul>
    </div>
    <div class="w-full py-4">
        <div>
            <div class="text-center text-2xl mb-4">
                <h1>To-Do List</h1>
            </div>
            <div class="w-full md:w-1/3 m-auto px-3">
                <div
                    v-if="errorMessage !== ''"
                    class="bg-red-200 text-red-600 px-4 py-2 rounded-md mb-3"
                    role="alert"
                >
                    {{ errorMessage }}
                </div>
                <div
                    v-if="successMessage !== ''"
                    class="bg-green-200 text-green-600 px-4 py-2 rounded-md mb-3"
                    role="alert"
                >
                    {{ successMessage }}
                </div>
                <form @submit.prevent="addTodo">
                    <div class="flex justify-between">
                        <input
                            type="text"
                            v-model="todoTitle"
                            class="flex-1 mr-4 focus:outline-none h-12 border-b px-3 py-1"
                        />
                        <button
                            v-bind:disabled="isLoading"
                            v-bind:class="{ disabled: isLoading }"
                            class="bg-blue-600 px-4 py-2 rounded-md text-white"
                        >
                            <span v-if="!isLoading">Add To-Do</span>
                            <span v-if="isLoading">Wait</span>
                        </button>
                    </div>
                </form>
                <ol class="mt-5" :key="forceRerender">
                    <li
                        v-for="(todo, index) in todoList"
                        :key="todo.id"
                        class="rounded-md px-3  py-3 text-left flex justify-between items-center my-3"
                        :class="[
                            todo.isCompleted ? 'bg-blue-200' : 'bg-gray-50'
                        ]"
                    >
                        <span>
                            <span class="mr-3">{{ index + 1 }}</span>
                            <span>
                                {{ todo.title }}
                            </span>
                        </span>
                        <span>
                            <label>
                                <input
                                    type="checkbox"
                                    :checked="todo.isCompleted"
                                    @change="updateTodoItem(todo.id, $event)"
                                />
                                <span></span>
                            </label>
                            <span
                                class="ml-3 text-red-600 cursor-pointer"
                                @click="deleteToDo(todo.id)"
                                ><i class="fas fa-trash-alt"></i
                            ></span>
                        </span>
                    </li>
                </ol>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from "firebase";

export default {
    data() {
        return {
            errorMessage: "",
            successMessage: "",
            isLoading: false,
            todoTitle: "",
            todoList: [],
            forceRerender: 0
        };
    },
    created() {
        this.getTodos();
    },
    methods: {
        addTodo() {
            firebase
                .firestore()
                .collection("users")
                .doc(firebase.auth().currentUser.uid)
                .collection("todos")
                .add({
                    title: this.todoTitle,
                    createdAt: new Date(),
                    isCompleted: false
                })
                .then(res => {
                    console.log(res);
                });
        },
        async getTodos() {
            this.forceRerender++;
            var todosRef = await firebase
                .firestore()
                .collection("users")
                .doc(firebase.auth().currentUser.uid)
                .collection("todos");

            todosRef.onSnapshot(snap => {
                this.todoList = [];

                snap.forEach(doc => {
                    var todo = doc.data();
                    todo.id = doc.id;
                    this.todoList.push(todo);
                });
            });
        },
        updateTodoItem(Id, e) {
            var isChecked = e.target.checked;
            firebase
                .firestore()
                .collection("users")
                .doc(firebase.auth().currentUser.uid)
                .collection("todos")
                .doc(Id)
                .update({
                    isCompleted: isChecked
                });
        },
        logOut() {
            firebase
                .auth()
                .signOut()
                .then(() => {
                    this.$router.push({ path: "/login" });
                });
        },
        deleteToDo(id) {
            firebase
                .firestore()
                .collection("users")
                .doc(firebase.auth().currentUser.uid)
                .collection("todos")
                .doc(id)
                .delete();
        }
    }
};
</script>

<style></style>
