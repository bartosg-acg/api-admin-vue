<template>
  <div class="hello">
    <ValidationProvider name="email" rules="required|email">
      <div slot-scope="{ errors }">
        <input v-model="email" />
        <p>{{ errors[0] }}</p>
      </div>
    </ValidationProvider>
  </div>
</template>

<script>
import { extend } from "vee-validate";
import { required, email } from "vee-validate/dist/rules";
import { ValidationProvider } from "vee-validate";
import { localize } from "vee-validate";


// Add the required rule
extend("required", required);

// Add the email rule
extend("email", {
  ...email
});

localize({
  en: {
    messages: {
      // generic rule messages...
    },
    fields: {
      email: {
        required: 'Add meg az email-t',
        email: 'Ez nem email'
      }
    }
  }
});



export default {
  data() {
    return {
      email: null
    };
  },
  components: {
    ValidationProvider
  },
  created() {

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
