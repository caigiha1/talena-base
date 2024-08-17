import axios, {AxiosRequestConfig, CancelTokenSource} from 'axios'
import { PageLink } from '@/constants'

import {getActToken, getRefreshToken, removeJwtToken, setActToken, setRefreshToken} from '../utils'


// Variable to track whether the refresh token API has been called
let isRefreshing = false
let refreshSubscribers: ((token: string) => void)[] = []

export const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    return import.meta.env.VITE_BACKEND_URL_DEV;
  }
  return import.meta.env.VITE_BACKEND_URL_DEV;
};

export const request = axios.create({
  baseURL: getBaseUrl(),
})

export const fetcher = (url: string, config: AxiosRequestConfig = {}) => 
  request(url, config)
    .then((res) => res?.data)
    .catch((err) => {
      if (err?.response?.data?.error?.code === '401|000000') {
        removeJwtToken()
        if (window.location.pathname !== PageLink.AUTH_LOGIN) {
          window.location.href = PageLink.AUTH_LOGIN
        }
      }
      throw err
    })

request.interceptors.request.use(
  (config: any) => {
    config.headers['Content-Type'] = 'application/json' // Change to your preferred content type
    config.headers["ngrok-skip-browser-warning"]= "69420"
    return config
  },
  (error) => {
    // Handle request error
    return Promise.reject(error)
  }
)

request.interceptors.request.use(async (config) => {
    if (config.headers) {
      const token = await getActToken();
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  });

request.interceptors.response.use(
  function (response) {
    return response
  },
  async (error: any) => {
    const originalRequest = error.config

    if (error.response && error.response.status !== 401) {
      return Promise.reject(error)
    }

    if (
      error.response &&
      error.response.status === 401 &&
      error.config.url !== PageLink.AUTH_LOGIN &&
      error.config.url !== PageLink.FORGOT_PASSWORD
    ) {
      if (!isRefreshing) {
        isRefreshing = true

        axios(`${process.env.REACT_APP_API_PUBLIC}/auth/rotate`, {
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + getRefreshToken(),
          },
        })
          .then(async (res: any) => {
            const userInfo = res?.data?.data?.tokens
            setActToken(userInfo?.act)
            setRefreshToken(userInfo?.rft)
            const token = await getActToken()

            // update new token to axios
            request.defaults.headers.common['Authorization'] = `Bearer ${token}`

            // Callback to unauth API calls
            refreshSubscribers.forEach((callback) => callback(token))
            refreshSubscribers = []
            isRefreshing = false
          })
          .catch(() => {
            removeJwtToken()
            window.location.href = PageLink.AUTH_LOGIN
          })
      }

      // Return a Promise to wait for the initial API callback
      const retryOriginalRequest = new Promise((resolve) => {
        const subscribeTokenRefresh = (token: string) => {
          originalRequest.headers['Authorization'] = `Bearer ${token}`
          resolve(axios(originalRequest))
        }
        refreshSubscribers.push(subscribeTokenRefresh)
      })

      return retryOriginalRequest
    }
    return Promise.reject(error)
  }
)

request.interceptors.response.use(
  function (response: any): any {
    return response
  },
  function (error: any) {
    const errorCode: string = error?.response?.data?.error?.code
    if (
      error?.response?.status !== 422 &&
      errorCode !== '400|5020' &&
      errorCode !== '400|5040' &&
      errorCode !== '400|5030' &&
      errorCode !== '400|4204' &&
      errorCode !== '400|5203' &&
      errorCode !== '400|4201' &&
      errorCode !== '403|110014' &&
      errorCode !== '403|110114' &&
      errorCode !== '400|150001' &&
      error?.response?.status !== 403 &&
      error?.response?.status !== 413
    ) {
    //   toast.error(errorMessage || error?.response?.statusText || error?.message || 'Unknown error!')
    console.log(error)
    }
    return Promise.reject(error)
  }
)

export const fetchFormData = ({
  url,
  formData,
  onUploadProgress,
  source,
}: {
  url: string
  formData: FormData
  onUploadProgress?: (progressEvent: any) => void
  source?: CancelTokenSource
}) => {
  return request(url, {
    method: 'POST',
    data: formData,
    headers: {'Content-Type': 'multipart/form-data'},
    cancelToken: source?.token,
    onUploadProgress,
  })
}

export const fetchFormJob = ({url, jobId}: {jobId: string; url: string}) => {
  return fetcher(`${url}/${jobId}`)
}

export const getJsonData = ({url}: {url: string}) => {
  return axios.get(url)
}

export const fetchFormPutData = ({
  url,
  formData,
  onUploadProgress,
  source,
}: {
  url: string
  formData: FormData
  onUploadProgress?: (progressEvent: any) => void
  source?: CancelTokenSource
}) => {
  return request(url, {
    method: 'PUT',
    data: formData,
    headers: {'Content-Type': 'multipart/form-data'},
    cancelToken: source?.token,
    onUploadProgress,
  })
}
