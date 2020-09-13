<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>LOGIN PAGE</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-item>
        <ion-label>username</ion-label>
        <ion-input @ionChange="($event) => credentials.username = $event.detail.value"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label>password</ion-label>
        <ion-input
          type="password"
          @ionChange="($event) => credentials.password = $event.detail.value"
        ></ion-input>
      </ion-item>
      <ion-button @click="doLogin">LOGIN</ion-button>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonItem,
  IonLabel,
} from "@ionic/vue";
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import useFirebaseAuth from "../hooks/firebase-auth";

export default defineComponent({
  name: "Home",
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonInput,
    IonItem,
    IonLabel,
  },
  setup() {
    const credentials = ref<{ username: string; password: string }>({
      username: "",
      password: "",
    });
    const { login } = useFirebaseAuth();
    const router = useRouter();

    const doLogin = async () => {
      await login(credentials.value.username, credentials.value.password)
      router.replace({ path: "/home" });
    };

    return {
      credentials,
      doLogin,
    };
  },
});
</script>

<style scoped>
#container {
  text-align: center;

  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;

  color: #8c8c8c;

  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>