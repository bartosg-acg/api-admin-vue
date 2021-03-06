<template>
  <div id="login">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card">
            <div class="card-header">Login</div>
            <div class="card-body">
              <validation-observer v-slot="{ handleSubmit }" tag="div" ref="loginForm">
                <form @submit.prevent="handleSubmit(login)" class="newsletter-form">
                  <ValidationProvider name="email" rules="required|email" v-slot="{ errors }">
                    <div class="form-group row">
                      <label
                        for="email_address"
                        class="col-md-4 col-form-label text-md-right"
                        v-bind:class="{ 'text-danger': errors.length }"
                      >E-Mail Address</label>
                      <div class="col-md-6">
                        <input
                          v-model="loginForm.email"
                          type="text"
                          id="email_address"
                          class="form-control"
                          v-bind:class="{ 'is-invalid': errors.length }"
                          name="email-address"
                          required
                          autofocus
                        />
                        <span class="text-danger">{{ errors[0] }}</span>
                      </div>
                    </div>
                  </ValidationProvider>

                  <ValidationProvider name="password" rules="required" v-slot="{ errors }">
                    <div class="form-group row">
                      <label
                        for="password"
                        class="col-md-4 col-form-label text-md-right"
                        v-bind:class="{ 'text-danger': errors.length }"
                      >Password</label>
                      <div class="col-md-6">
                        <input
                          v-model="loginForm.password"
                          type="password"
                          id="password"
                          class="form-control"
                          v-bind:class="{ 'is-invalid': errors.length }"
                          name="password"
                          required
                        />
                        <span class="text-danger">{{ errors[0] }}</span>
                      </div>
                    </div>
                  </ValidationProvider>

                  <div v-show="noUser" class="row">
                    <div
                      class="col-md-6 offset-md-4 text-warning"
                    >There is no user with this access.</div>
                  </div>

                  <div class="form-group row">
                    <div class="col-md-6 offset-md-4">
                      <div class="checkbox">
                        <label>
                          <input type="checkbox" name="remember" /> Remember Me
                        </label>
                      </div>
                    </div>
                  </div>

                  <div class="col-md-6 offset-md-4">
                    <button type="submit" class="btn btn-primary">Login</button>
                    <a href="#" class="btn btn-link">Forgot Your Password?</a>
                  </div>
                </form>
              </validation-observer>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import axios from "axios";
import apiHandlerMI from '@/mixins/apiHandlerMI.js';

import {
  ValidationProvider,
  extend,
  setInteractionMode,
  localize,
  ValidationObserver
} from "vee-validate";
import { required, email } from "vee-validate/dist/rules";

/*
localize({
  en: {
    names: {
      email: 'E-mail',
      password: 'Password'
    },
    messages: {
      required: "{_field_} required",
      email: "Not valid e-mail address",
      acceptConditions: "Privacy Policy required"
    }
  },
  hu: {
    names: {
      email: 'E-mail',
      password: 'Jelszó'
    },
    messages: {
      required: "{_field_} megadása kötelező",
      email: "Az e-mail mező csak érvényes e-mail címet tartalmazhat.",
      acceptConditions: "Általános Adatvédelmi Rendelet elfogadása kötelező"
    }
  }
});
*/

//Jobb ha teljesen custom hibaüziket adunk
localize({
  en: {
    messages: {
      // generic rule messages...
    },
    fields: {
      email: {
        required: 'E-mail is rerquired!',
        email: 'It is not a valid email!'
      },
      password: {
        required: 'Password is requied!'
      }
    }
  },
  hu: {
    messages: {
      // generic rule messages...
    },
    fields: {
      email: {
        required: 'Add meg az e-mail címet!',
        email: 'Nem tűnik valós email címnek!'
      },
      password: {
        required: 'Add meg a jelszót!'
      }
    }
  }
});

setInteractionMode("eager");

extend("email", {
  ...email
});

extend("required", {
  ...required
});

export default {
  data() {
    return {
      loginForm: {
        email: null,
        password: null
      },
      noUser: false
    };
  },
  mixins: [apiHandlerMI],
  components: {
    ValidationProvider,
    ValidationObserver
  },
  methods: {
    login: function() {
      this.$axios
        .post(this.$apiLink + "login", {
          email: this.loginForm.email,
          password: this.loginForm.password,
          params: {
            language_id: 1
          }
        })
        .then(response => {
          if (response.data.token) {
            //this.$store.state.userToken = response.data.token;
            this.noUser = false;
            this.$store.dispatch("setUserToken", response.data.token);
            this.$store.dispatch("setLoggedIn", true);
            this.$router.push("/");
          } else {
            this.noUser = true;
            this.$store.dispatch("setUserToken", '');
            this.$store.dispatch("setLoggedIn", false);
          }
        })
        .catch(error => {
          console.log(error.response);
          this.$store.dispatch("setUserToken", '');
          this.$store.dispatch("setLoggedIn", false);
        })
        .finally(function() {
          // always executed
        });
    }
  },
  created() {
    localize(this.$store.state.language.code);
  }
};
</script>
