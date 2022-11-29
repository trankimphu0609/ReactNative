import axios from 'axios';

const baseURL = 'https://uat.xboss.com';
export default async function callApi(subURL, method, params, token = '') {
  console.log(token);
  try {
    return await axios({
      method,
      url: `${baseURL}/${subURL}`,
      data: params,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  } catch (err) {
    console.log(err);
  }
}
