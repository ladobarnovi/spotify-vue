<template>
  <div class="header-auth-buttons">
    <a href="https://account.spotify.com" class="register">Sign Up</a>
    <a :href="url" class="login">Log In</a>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  setup() {
    const clientId = process.env.VUE_APP_CLIENT_ID;
    const redirect = "http://localhost:3000/";
    const scopes = 'streaming user-read-private user-read-email playlist-read-private user-library-read user-library-modify user-top-read playlist-read-collaborative playlist-modify-public playlist-modify-private user-follow-modify user-read-playback-state user-read-currently-playing user-modify-playback-state user-read-recently-played user-follow-read';
    const url = `https://accounts.spotify.com/authorize?client_id=${ clientId }&response_type=token&redirect_uri=${ encodeURI(redirect) }&scope=${ encodeURI(scopes) }`;

    return {
      url
    };
  }
})
</script>

<style scoped lang="scss">
.header-auth-buttons {
  display: flex;
  margin-left: auto;

  a {
    padding: 13px 36px;
    border-radius: 24px;
    letter-spacing: 1.7px;
    font-family: 'Bold';
    cursor: pointer;
    transition: transform 0.3s ease;
    text-transform: uppercase;
    font-size: 12px;
  }

  .register {
    color: var(--color-inverted);
  }

  .login {
    color: #181818;
    background-color: var(--color-inverted);
  }
}
</style>
