

export const initialStore = () => {
  return {
    token:null
  };
};

export default async function storeReducer(store, action = {}) {
  switch (action.type) {
    case "handleLogin":
      const { email, password } = action.payload;
      

      let response = await fetch(
        import.meta.env.VITE_BACKEND_URL + "/api/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email, password: password }),
        }
      );

      if (response.status != 200) {
        console.log(
          "there was an error while attempting to login:",
          response.status,
          response.statusText
        );
        return {
          ...store,
          token: false
        };
      }
      let data = await response.json();
      console.log(data);
      sessionStorage.setItem("token", data.token);
      
      return {
        ...store,
        token:data.token
      }

    default:
      throw Error("Unknown action.");
  }
}
