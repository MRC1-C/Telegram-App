import axios from "axios";

export async function postRequest(url, body) {
  try {
    let resposne = await axios.post(url, body);
    return resposne.data;
  } catch (error) {
    throw error;
  }
}
