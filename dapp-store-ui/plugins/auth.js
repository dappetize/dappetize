import { ref } from "vue";
import { useMainStore } from "~/store";
import axios from "axios"; // Ensure axios is imported

export default defineNuxtPlugin((nuxtApp) => {
  const { baseURL } = useMainStore();

  // const isLoggedIn = ref(false); // Reactive property for login status
  const user = ref({}); // Reactive property for login status

  const loginWithLocal = async (data, endpoint) => {
    try {
      const res = await axios.post(baseURL + endpoint, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.data.token) setToken(res.data.token);

      isLoggedIn.value = !!res.data;
    } catch (error) {
      console.error("Error checking login status:", error);
      isLoggedIn.value = false;
    }
  };
  const logInSuperUser = async (data, endPoint) => {
    try {
      const res = await axios.post(baseURL + endPoint, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      await setSuperUserToken(res.data.token);
      return res.data;
    } catch (error) {}
  };
  const isSuperUserLoggedIn = async () => {
    let superUserToken = null;
    if (import.meta.client) {
      superUserToken =   window.localStorage.getItem("superUserToken");
      if (superUserToken == null) {
        return false;
      } else {
        try {
          const res = await axios.get(baseURL + "/api/v1/isSuperUser", {
            headers: {
              Authorization: "Bearer " + superUserToken,
              "Content-Type": "application/json",
            },
          });
          await setSuperUserToken(res.data.token);
          return res.data.isSuperUser;
        } catch (error) {}
      }
    }
  };
  const isLoggedIn = async () => {
    let userToken = null;
    if (import.meta.client) {
      userToken =   window.localStorage.getItem("auth.nuxt3.dappetize");
    }
    if (userToken == null) {
      return false;
    } else {
      try {
        const res = await axios.get(baseURL + "/api/v1/getUser", {
          headers: {
            Authorization: "Bearer " + userToken,
            "Content-Type": "application/json",
          },
        });
        await setUser(res.data.user);
        getUser();
        return !!res.data;
      } catch (error) {
        console.error("Error checking login status:", error);
        // isLoggedIn.value = false;
        return false;
      }
    }

    // }
  };
  const token = async () => {
    if (import.meta.client) {
      return   window.localStorage.getItem("auth.nuxt3.dappetize");
    }
  };
  const setToken = async (token) => {
    if (import.meta.client) {
      window. localStorage.setItem("auth.nuxt3.dappetize", token);
    }
  };
  const setSuperUserToken = async (token) => {
    if (import.meta.client) {
      window.localStorage.setItem("superUserToken", token);
    }
  };
  const setUser = async (newUser) => {
    user.value = newUser;
  };
  const getUser = async () => {
    return user.value;
  };

  // Provide isLoggedIn as a reactive property
  nuxtApp.provide("auth", {
    loginWithLocal,
    isLoggedIn,
    token,
    setToken,
    setUser,
    getUser,
    logInSuperUser,
    isSuperUserLoggedIn,
  });
});
