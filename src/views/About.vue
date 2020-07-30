<template>
  <div class="about">
    <div class="container-fluid">
      <h1>About</h1>
      <div class="row">
        <div class="col-xs-12">
          <a :href="item.url" v-text="item.label" @click.prevent="downloadItem()" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      item: {
        url:
          "http://fb.dmacg.hu/bifrost/uploads/univer/downloads/Alfold-Zrt-Adatkezelesi-es-adatvedelmi-tajekoztatoja.pdf",
        label: "Letöltés"
      }
    };
  },
  methods: {
    downloadItem: function() {
      //axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
      /*
      axios
        .get(url, { responseType: "blob" })
        .then(response => {
          const blob = new Blob([response.data], { type: "application/pdf" });
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = label;
          link.click();
          URL.revokeObjectURL(link.href);
        })
        .catch(console.error);
      */

     

      let config = {
        method: "get",
        url:
          "http://localhost:8080/response.pdf"
      };

      axios(config)
        .then(function(response) {
          console.log(response.data);
        });
    }
  }
};
</script>
