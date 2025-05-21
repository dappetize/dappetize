

import { useMainStore } from "~/store";
import axios from 'axios';
export default defineNuxtRouteMiddleware(async (to, from) => {
    const {
        baseURL,
        setUser,
        getUser,
    } = useMainStore();

    let userToken = null
    if (import.meta.client) {
        userToken =  window.localStorage.getItem('auth.nuxt3.dappetize');
        if (!userToken) {
            // return abortNavigation()
            setUser({})
            return navigateTo('/')
        }
        if (userToken)
        {
            try {
                const res = await axios.get(baseURL + '/api/v1/getUser', {
                    headers: {
                        "Authorization": "Bearer " + userToken, // Add the token to the "Authorization" header
                        "Content-Type": "application/json", // Set the content type if needed
                    },
                }
                );
                setUser(res.data)
            } catch (error) {
                console.log("Error fetching user data:", error);
                return navigateTo('/');
                
            }
        }
    }

   

    


});
