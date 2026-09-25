import axios from "axios";

const API_URL =
  "https://6aa26491ccb3db9689a66ef8.mockapi.io/api/response/bot/users";

export const loginApi = async (email: string, password: string) => {
  const response = await axios.get(API_URL);
  console.log("All Users:", response.data);
  const user = response.data.find(
    (u: any) => u.email === email && u.password === password,
  );
  console.log(user, "from auth api");
  if (!user) {
    throw new Error("Invalid email address or password");
  }

  return {
    user,
    token: "mock-jwt-token",
  };
};
