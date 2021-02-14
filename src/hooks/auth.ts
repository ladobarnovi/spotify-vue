import { ref } from "vue";
import {API} from "@/api";
import {UserProfile} from "@/api/me";

export const token = ref<string>();
export const isAuthorised = ref(false);
export const me = ref<UserProfile>();

export const fetchProfile = async () => {
  me.value = await API.me.get();
  isAuthorised.value = true
}
