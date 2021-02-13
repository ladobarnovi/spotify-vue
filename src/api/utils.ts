import axios, { Method } from "axios";

export const apiCall = async <T>(requestData: {
  url: string,
  method: Method,
  data?: any,
  params?: any
}): Promise<T> => {
  try {
    const { data } = await axios({
      url: requestData.url,
      method: requestData.method,
      data: requestData.data,
      params: requestData.params
    })

    return Promise.resolve(data)
  } catch (e) {
    return Promise.reject(e)
  }
}
