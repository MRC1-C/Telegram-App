import axios from "axios";


export async function postRequest(url, body) {
  try {
    let resposne = await axios.post(process.env.REACT_APP_API_AUTH_URL + url, body, generateRequestHeader());
    return resposne.data;
  } catch (error) {
    throw error;
  }
}
export async function getRequest(url) {
  try {
    let resposne = await axios.get(
      process.env.REACT_APP_API_AUTH_URL + url,
      generateRequestHeader()
    );
    return resposne.data;
  } catch (error) {
    // handleErrorCode(error)
    throw error;
  }
}

export async function deleteRequest(url) {
  try {
    let resposne = await axios.delete(process.env.REACT_APP_API_AUTH_URL + url,generateRequestHeader());
    return resposne.data;
  } catch (error) {
    throw error;
  }
}

export async function patchRequest(url, body) {
  try {
    let resposne = await axios.patch(process.env.REACT_APP_API_AUTH_URL + url, body, generateRequestHeader());
    return resposne.data;
  } catch (error) {
    throw error;
  }
}

export function generateRequestHeader() {
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("accessToken"),
    },
  };
}
