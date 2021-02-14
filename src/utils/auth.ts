import axios from "axios";
import { token, fetchProfile } from "@/hooks/auth";
import {API} from "@/api";

function setToken(t: string) {
  axios.defaults.headers['Authorization'] = 'Bearer ' + t;
  token.value = t;
}

function getTokenFromUrl() {
  const hash = window.location.hash;
  let token;
  if (hash.includes('access_token')) {
    const start = window.location.hash.indexOf('=') + 1;
    const end = window.location.hash.indexOf('&');
    token = hash.substring(start, end);

    localStorage.token = token;
  } else {
    token = localStorage.token;
  }

  if (token) {
    setToken(token);
    fetchProfile();
  }
}

export function checkAuth () {
  getTokenFromUrl();
}
