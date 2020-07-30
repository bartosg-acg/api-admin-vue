<template>
  <div id="login">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">Register</div>
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
import axios from "axios";

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
        required: "E-mail is rerquired!",
        email: "It is not a valid email!"
      },
      password: {
        required: "Password is requied!"
      }
    }
  },
  hu: {
    messages: {
      // generic rule messages...
    },
    fields: {
      email: {
        required: "Add meg az e-mail címet!",
        email: "Nem tűnik valós email címnek!"
      },
      password: {
        required: "Add meg a jelszót!"
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
  components: {
    ValidationProvider,
    ValidationObserver
  },
  methods: {
    login: function() {
      let axiosParams = {
        language_id: this.$store.state.language.id
      };

      if (this.$store.state.userToken) {
        axiosParams.token = this.$store.state.userToken;
      }

      console.log(axiosParams);

      axios
        .post(
          this.$apiLink + "register",
          {
            email: this.loginForm.email,
            password: this.loginForm.password
          },
          {
            params: axiosParams
          }
        )
        .then(response => {
          console.log("siker", response);
        })
        .catch(error => {
          console.log("hiba", error.response.data.error);
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
