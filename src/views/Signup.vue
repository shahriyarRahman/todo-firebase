<template>
    <div class="mt-10 md:mt-16 border rounded-lg w-full md:w-1/4 m-auto p-5">
        <div class="text-center text-2xl mb-4">
            <h1>Sign Up</h1>
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
                class="bg-green-200 text-green-600 px-4 py-2 rounded-md mb-3"
                role="alert"
            >
                {{ successMessage }}
            </div>
            <form @submit.prevent="signupRequest" id="signup-form">
                <div class="text-left">
                    <div class="mb-3">
                        <label for="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            v-model="email"
                            class="rounded-md w-full h-12 border px-3 py-1"
                        />
                    </div>
                    <div class="mb-3">
                        <label for="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            v-model="password"
                            class="rounded-md w-full h-12 border px-3 py-1"
                        />
                    </div>
                    <div class="text-center mb-3">
                        <button
                            v-bind:disabled="isLoading"
                            v-bind:class="{ disabled: isLoading }"
                            class="bg-blue-600 px-4 py-2 rounded-md text-white"
                        >
                            <span v-if="!isLoading">Sign Up</span>
                            <span v-if="isLoading">Wait</span>
                        </button>
                    </div>
                    <div class="text-center mt-5">
                        <p>
                            Already have an account?
                            <router-link class="text-blue-600" to="/login"
                                >Login</router-link
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
    name: "Signup",
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
        signupRequest() {
            let v = this;
            v.isLoading = true;
            v.errorMessage = "";
            v.successMessage = "";

            firebase
                .auth()
                .createUserWithEmailAndPassword(v.email, v.password)
                .then(
                    () => {
                        v.successMessage = "Register Successfully.";
                        v.isLoading = false;
                    },
                    error => {
                        let errorResponse = JSON.parse(error.message);
                        v.errorMessage = errorResponse.error.message;
                        v.isLoading = false;
                    }
                );
        }
    }
};
</script>
<style scoped>
._loader {
    position: relative;
    top: 6px;
    left: 10px;
}
</style>
