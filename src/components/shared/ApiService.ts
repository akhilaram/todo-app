import axios from 'axios';
const headerTypes: any = { "json": "application/json", "form-data": "multipart/form-data" }

export const getRequest = (url: string, header: any = "json") => {
  return axios({
    method: 'get',
    url: url,
    headers: { 'Content-Type': headerTypes[header] }
  })
}

export const postRequest = (url: string, data: any, header: any = "json") => {
  return axios({
    method: 'post',
    url: url,
    data: data,
    headers: { 'Content-Type': headerTypes[header] }
  })
}

export const deleteRequest = (url: string, header: any = "json") => {
  return axios({
    method: 'delete',
    url: url,
    headers: { 'Content-Type': headerTypes[header] }
  })
}

