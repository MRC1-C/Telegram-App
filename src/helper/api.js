import { message } from "antd";
import axios from "axios";



export async function postRequest(url, body) {
  try {
    let response = await axios.post(process.env.REACT_APP_API_AUTH_URL + url, body, generateRequestHeader());
    return response.data;
  } catch (error) {
    handleErrorCode(error)
    throw error;
  }
}
export async function getRequest(url) {
  try {
    let response = await axios.get(
      process.env.REACT_APP_API_AUTH_URL + url,
      generateRequestHeader()
    );
    return response.data;
  } catch (error) {
    handleErrorCode(error);
    throw error;
  }
}

export async function deleteRequest(url) {
  try {
    let response = await axios.delete(process.env.REACT_APP_API_AUTH_URL + url,generateRequestHeader());
    return response.data;
  } catch (error) {
    handleErrorCode(error)
    throw error;
  }
}

export async function patchRequest(url, body) {
  try {
    let response = await axios.patch(process.env.REACT_APP_API_AUTH_URL + url, body, generateRequestHeader());
    return response.data;
  } catch (error) {
    handleErrorCode(error)
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

export const handleErrorCode = (err) => {
  console.log(err.response.status)
  switch(err.response.status) {
    case 401: 
          message.error(err.message)
          setTimeout(() => {
            window.location.href = "/login";
          }, 1000);
          
        break;
    default:
        message.error(err.message)
      break;
  }
}