<template>
  <div id="userForm" class="form-container">
     
      <br/>
    <div class="form-control">
    <h1>User Registration</h1>
      <form class="form" v-on:submit.prevent="submitForm" >
        <label for="name">Name: </label>
        <input id="name" name="name" type="text" v-model="user.name" required/>
            <br/>
        <label for="email">Email Address: </label>
        <input id="email" name="email" type="email" v-model="user.email" required />
            <br/>
        <label for="password">Password: </label>
        <input id="password" name="password" type="password" v-model="user.password" required />
            <br/>
        <label for="occupation">Occupation: </label>
        <select id="occupation" name="occupation" type="text" multpile ="false" v-model="user.occupation" required > 
            <option value="placeholder" disabled selected>Please select an occupation</option>
            <option v-for="occupation in this.occupations" v-bind:key="occupation" :value="occupation" >{{occupation}}</option>

        </select>
            <br/>
        <label for="state">State: </label>
        <select id="state" name="state" type="text" multiple="false" v-model="user.state" required >
            <option v-for="state in this.states" v-bind:key="state.name" :value="state" >{{state.name}}, {{state.abbreviation}}</option>
        </select>
        <br/>
        <button class="button" @click="submitForm">Submit Form</button>
        <br/>
        <div class="status-message" v-show="successMessage">Registration Successful!</div>
      </form>
    </div>
  </div>
</template>

<script>
import formService from "@/services/FormService.js";
export default {
    name: "register-form",
    data() {
        return {
            occupations: "",
            states: "",
            user: {
                name: "",
                email: "",
                password: "",
                occupation: "",
                state: "",
            },
            successMessage: false,
        }
    },

    methods: {
        submitForm() {
            formService.create(this.user).then(response => {
                if (response.status === 201) {
                    this.user = {
                        name: "",
                        email: "",
                        password: "",
                        occupation: "",
                        state: "",                        }
                    }
                    this.successMessage = true;
            })
        },

        // retrieves states and occupations from form api
        getStatesAndOccupations() {
            formService.list().then( (response) => {
                this.info = response.data;
                this.occupations = this.info.occupations;
                this.states = this.info.states;
            })
        },

    }, 

    created: function() {
        this.getStatesAndOccupations();
    }

}
</script>

<style scoped>

div.form-control {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.form-container {
    display: flex;
    justify-content: center;
    position: relative;
 
}

.form-control {
    border: solid  rgb(132, 78, 218) 2px;
    border-radius: 10px;
    width: 80vh;
    background-color: rgb(142, 204, 183);
    padding-bottom: 50px;
}

form {
    display: flex;
    flex-direction: column;
}
button {
    margin: 0 auto;
    height: 40px;
    width: 100px;
    color: thistle;
    background-color: rgb(170, 60, 165);
    border-color: thistle;
    border-radius: 0.25rem;

}



</style>