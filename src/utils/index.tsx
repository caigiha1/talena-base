import {format} from 'date-fns'
import {each, isUndefined, omitBy} from 'lodash'
import {AppConfig} from '../constants/index'
import { PublicClientApplication } from '@azure/msal-browser'
import { msalConfig } from '@/authConfig'
import { LocalStorageKey } from '@/type'

declare var com: any

export const getActToken = async (): Promise<string> => {
  const authType = localStorage.getItem(LocalStorageKey.loginType)
  if (authType === 'azure') {
    const msalInstance = new PublicClientApplication(msalConfig);
    await msalInstance.initialize()
    const account = msalInstance.getActiveAccount()
    if (account) {
      const request = {
          scopes: ['openid', 'profile', 'User.Read'], // Scopes cần để lấy access token
          account
      };
      try {
        const response = await msalInstance.acquireTokenSilent(request)
        return response.accessToken || ''
      } catch (error) {
        console.error('Error:', error)
        return ''
      }
    }
  }
  return localStorage.getItem('accessToken') || ''
}

export const getRefreshToken = (): string => {
  return localStorage.getItem('refreshToken') || ''
}

export const setActToken = (accToken: string) => {
  localStorage.setItem('accessToken', accToken)
}

export const setRefreshToken = (refreshToken: string) => {
  localStorage.setItem('refreshToken', refreshToken)
}

export const removeJwtToken = async () => {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
}

export function getFileSizeMB(size: number, fractionDigits?: number | undefined): number {
  if (size <= 0) return 0
  if (fractionDigits === undefined || fractionDigits < 0) fractionDigits = 0
  return Number(parseFloat(`${size / (1024 * 1024)}`).toFixed(fractionDigits))
}
/**
 * @description Hiện thị bytes sang dạng khác gọn hơn
 *
 * @param {number} bytes
 * @return {*}
 */
export const displayBytes = (bytes?: number | null) => {
  if (!bytes) {
    return '-'
  }
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  if (bytes === 0) {
    return '0 KB'
  }
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  const result = (bytes / Math.pow(1024, i)).toFixed(2)
  return result + ' ' + sizes[i]
}

export function checkTypeFile(type: string) {
  return AppConfig.imageFileTypeWhiteList.includes(type)
}

export const isJsonString = (str: string) => {
  try {
    JSON.parse(str)
  } catch (e) {
    return false
  }
  return true
}

export const isValidHttpUrl = (string: string | URL) => {
  let url: URL
  try {
    url = new URL(string)
  } catch (_) {
    return false
  }
  return url.protocol === 'http:' || url.protocol === 'https:'
}

export function transformFormDataRequestBody(input: any): FormData {
  input = omitBy(input, isUndefined)

  const form = new FormData()

  each(input, (value, key) => {
    if (value instanceof File) {
      form.append(key, value)
      return
    }

    if (value instanceof Date) {
      form.append(key, value.toISOString())
      return
    }

    if (value instanceof Array || value instanceof Object) {
      form.append(key, JSON.stringify(value))
      return
    }

    form.append(key, value as string)
  })

  return form
}

export const validationUrlPDF =
  "http(s?)://[0-9a-zA-Z]([-.w]*[0-9a-zA-Z])*(:(0-9)*)*(/?)([a-zA-Z0-9-.?,'/\\+&amp;%$#_]*)?(.pdf)$"

export const linkPage = (url: string) => {
  window.location.href = url
}

export const renderResourseBank = (arr: Array<any>) => {
  if (arr && arr.length > 0) {
    return arr.map((o) => o.name).join(', ')
  }
  return '--'
}

export const convertHTMLToString = (htmlString: string) => {
  const parser = new DOMParser()
  const htmlDoc = parser.parseFromString(htmlString, 'text/html')

  const elements = htmlDoc.querySelectorAll('[class]')
  elements.forEach((element) => {
    const styleString = element.getAttribute('class') as any
    const updatedStyleString = styleString.replace(/;/g, ';\n')
    element.setAttribute('class', updatedStyleString)
  })

  return htmlDoc.documentElement.outerHTML
}


export const renderModeDark =
  localStorage.getItem('kt_theme_mode_menu') === 'dark' &&
  localStorage.getItem('kt_theme_mode_value') === 'dark'

export const validatePassword = /^(?=.*[A-Z])(?=.*\d).{8,}$/

export const phoneRegExp = /^(0\d{9}|0\d{10})$/

export const getUppercaseByNumber = (num: number): string => {
  let result = ''
  while (num > 0) {
    let remainder = num % 26
    if (remainder === 0) {
      remainder = 26
      num--
    }
    let char = String.fromCharCode(remainder + 64)
    result = char + result
    num = Math.floor(num / 26)
  }
  return result
}

export const fileType =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
export const fileExtension = '.xlsx'

export const usernamePattern = /^[A-Za-z0-9](?:[A-Za-z0-9_.-]*[A-Za-z0-9])?$/

export function secondsToMinutesAndSeconds(seconds: number) {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60

  // Format the result as "minutes:seconds"
  const formattedTime = `${minutes > 9 ? '' : '0'}${minutes}:${
    remainingSeconds < 10 ? '0' : ''
  }${remainingSeconds}`

  return formattedTime
}

export const formatDate = (date: Date | null) => {
  return date ? format(new Date(date), 'yyyy-MM-dd') : null
}
export const formatDateToISOString = (date: Date | null, type: 'fromDate' | 'toDate') => {
  if (!date) {
    return null
  }

  const dateSplitArr = format(new Date(date), 'yyyy-MM-dd')
    .split('-')
    .map((str) => Number(str))

  if (type === 'fromDate') {
    return new Date(dateSplitArr[0], dateSplitArr[1] - 1, dateSplitArr[2], 0, 0, 0, 0).toISOString()
  }
  return new Date(
    dateSplitArr[0],
    dateSplitArr[1] - 1,
    dateSplitArr[2],
    23,
    59,
    59,
    999
  ).toISOString()
}

export const htmlToRaw = (html: string): string => {
  if (!html) {
    return ''
  }
  let result = ''
  let inTag = false
  for (let i = 0; i < html.length; i++) {
    let char = html[i]
    if (char === '<') {
      inTag = true
    } else if (char === '>') {
      inTag = false
    } else if (!inTag) {
      result += char
    }
  }
  result = result.replace(/&/g, '&')
  result = result.replace(/</g, '<')
  result = result.replace(/>/g, '>')
  result = result.replace(/"/g, '"')
  result = result.replace(/'/g, "'")
  return decodeHtml(result)?.trim()
}

const decodeHtml = (html: string) => {
  const txt = document.createElement('textarea')
  txt.innerHTML = html
  return txt.value
}

export const cleanParamsAPI = (params: Object) => {
  return Object.fromEntries(
    Object.entries(params).filter(([_, value]) => value !== null && value !== '')
  )
}

export const removeDuplicateById = <T extends {dom_id: any}>(array: T[], id: keyof T): T[] => {
  const seen = new Set()
  return array.filter((item) => {
    if (seen.has(item[id])) {
      return false
    } else {
      seen.add(item[id])
      return true
    }
  })
}

export const sizeInBytes = (megabytes: number) => {
  return megabytes * 1024 * 1024
}

export const getCourseFullLevel = () => {
  return window.localStorage.getItem('fullLevel') === 'true' ? true : false
}

export const setCourseLevel = (level: string) => {
  localStorage.setItem('fullLevel', level)
}

export const removeOjectEqualNull = (courseInfo: any) => {
  return Object.keys(courseInfo).forEach((key) => {
    if (courseInfo[key] === null) {
      delete courseInfo[key]
    }
  })
}

export const formatISOFromDate = (year: number, month: number, day: number) => {
  return new Date(year, month, day, 0, 0, 0)
}

export const formatISOToDate = (year: number, month: number, day: number) => {
  return new Date(year, month, day, 23, 59, 59, 999)
}

export function getDateInfo(inputDate: Date) {
  const date = new Date(inputDate)

  const day = date.getDate()
  const month = date.getMonth()
  const year = date.getFullYear()

  return {
    day,
    month,
    year,
  }
}

export const bytesToGB = (bytes: number) => {
  const gigabytes = bytes / (1024 * 1024 * 1024)
  return gigabytes.toFixed(2) // Round to 2 decimal places
}

export const convertItemSelect = (items: Array<any> | undefined) => {
  return items && items?.map((item: any) => ({label: item?.name, value: item?.id}))
}

export const convertDateStringDayMonthYear = (dateString: string) => {
  // Tạo đối tượng Date từ chuỗi ngày tháng
  const dateObject = new Date(dateString)

  // Lấy ngày, tháng, năm từ đối tượng Date
  const year = dateObject.getFullYear()
  const month = `0${dateObject.getMonth() + 1}`.slice(-2) // Tháng bắt đầu từ 0
  const day = `0${dateObject.getDate()}`.slice(-2)

  // Tạo chuỗi định dạng mới
  const isoDateString = `${year}-${month}-${day}`
  return isoDateString
}

export const convertSnakeCaseToTitleCase = (snakeCaseString: string) => {
  return snakeCaseString
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

export const convertMathToImage = async (element: any) => {
  const viewer = com?.wiris?.js?.JsPluginViewer
  if (viewer && element) {
    try {
      await viewer.parseElement(element, true, function () {})
    } catch (error) {
      console.error('Error:', error)
    }
  }
}

export const getTreeChild = (session: string): string => {
  return sessionStorage.getItem(session) || ''
}

export const setTreeChild = (session: string, value: any) => {
  return sessionStorage.setItem(session, value)
}
