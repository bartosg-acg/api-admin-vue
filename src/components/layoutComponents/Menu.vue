<template>
  <sidebar-menu @toggle-collapse="onToggleCollapse" :menu="menu" :collapsed="collapsed" />
</template>

<script>
//https://yaminncco.github.io/vue-sidebar-menu/

import { SidebarMenu } from "vue-sidebar-menu";
import "vue-sidebar-menu/dist/vue-sidebar-menu.css";
//import $ from "jquery";

export default {
  data() {
    return {
      menu: [
        {
          header: true,
          title: "Menu",
          hiddenOnCollapse: true
        },
        {
          href: "/",
          title: "Dashboard",
          icon: "fa fa-user"
        },
        {
          href: "/about",
          title: "About",
          icon: "fa fa-chart-area",
          child: [
            {
              href: "/about/sublink",
              title: "Sub Link",
              icon: "fa fa-user"
            }
          ]
        },
        {
          href: "/register",
          title: "Register",
          icon: "fa fa-user"
        }
      ],
      collapsed: false
    };
  },
  components: {
    SidebarMenu
  },
  methods: {
    onToggleCollapse(collapsed) {
      //Vue style
      //this.$emit('menuCollapse', collapsed);
      //But it is simpler handle it here maybe

      localStorage.menuCollapsed = collapsed;

      if (!collapsed && window.innerWidth > 960) {
        document.getElementById("main-area").style.marginLeft = "350px";
      } else {
        document.getElementById("main-area").style.marginLeft = "50px";
      }
    }
  },
  created() {
    if (localStorage.menuCollapsed == 'true') {
      this.collapsed = true;
    }
  }
};
</script>

<style>
.v-sidebar-menu .vsm--link_level-1 .vsm--icon {
  height: 20px;
  line-height: 20px;
  width: 20px;
}
</style>