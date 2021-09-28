import axios from "axios";

export function generateRequestHeader() {
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
  };
}
export async function postRequest(url, body, generateRequestHeader) {
  try {
    let resposne = await axios.post(url, body);
    return resposne.data;
  } catch (error) {
    throw error;
  }
}
