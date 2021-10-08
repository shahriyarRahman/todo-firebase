<template>
    <div class="mt-10 md:mt-16 border rounded-lg w-full md:w-1/4 m-auto p-5">
        <div class="mb-4">
            <h1 class="text-center text-2xl">Log In</h1>
        </div>
        <div class="">
            <div
                v-if="errorMessage !== ''"
                class="bg-red-200 text-red-600 px-4 py-2 rounded-md mb-3"
                role="alert"
            >
                {{ errorMessage }}
            </div>
            <div
                v-if="successMessage !== ''"
                class="alert alert-success"
                role="alert"
            >
                {{ successMessage }}
            </div>
            <form @submit.prevent="loginRequest" id="login-form">
                <div class="text-left">
                    <div class="mb-3">
                        <label for="email">Email Address</label>
                        <input
                            type="email"
                            v-model="email"
                            id="email"
                            class="rounded-md w-full h-12 border px-3 py-1"
                        />
                    </div>
                    <div class="mb-3">
                        <label for="password">Password</label>
                        <input
                            type="password"
                            v-model="password"
                            id="password"
                            class="rounded-md w-full h-12 border px-3 py-1"
                        />
                    </div>
                    <div class=" text-center">
                        <button
                            :disabled="isLoading"
                            class="bg-blue-600 px-4 py-2 rounded-md text-white"
                        >
                            <span v-if="!isLoading">Login</span>
                            <span v-if="isLoading">
                                Wait
                            </span>
                        </button>
                    </div>
                    <div class="text-center mt-5">
                        <p>
                            Don't have an account?
                            <router-link class="text-blue-600" to="/signup"
                                >Sign Up</router-link
                            >
                        </p>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import firebase from "firebase";

export default {
    name: "Login",
    data() {
        return {
            email: "",
            password: "",
            isLoading: false,
            errorMessage: "",
            successMessage: ""
        };
    },
    methods: {
        loginRequest() {
            let v = this;

            v.isLoading = true;
            v.errorMessage = "";
            v.successMessage = "";

            firebase
                .auth()
                .signInWithEmailAndPassword(v.email, v.password)
                .then(
                    () => {
                        this.$isLoggedIn = true;
                        this.$router.replace("dashboard");
                        v.isLoading = false;
                    },
                    error => {
                        v.errorMessage = error.message;
                        v.isLoading = false;
                    }
                );
        }
    }
};
</script>
<style scoped>
.loader {
    position: relative;
    top: 6px;
    left: 10px;
}
</style>
