import { apiQueryParams } from '../types/http'

const buildQueryParams = (start_date: string, end_date: string|undefined = undefined): apiQueryParams => {
  const VITE_NASA_API_KEY: any = import.meta.env.VITE_NASA_API_KEY

  const params = {
    start_date,
    api_key: VITE_NASA_API_KEY
  }

  if (end_date) {
    return Object.assign(params, {end_date})
  }

  return params
}

const get = async (url: string, params: apiQueryParams) => {
  const resource = constructResource(url, params)

  return await fetch(resource)
}

const constructResource = (url: string, params: apiQueryParams) => {
  const resource = new URL (url)
  const keys = Object.keys(params)

  keys.forEach(key => {
    const item = params[key as keyof apiQueryParams]

    if (!item) {
      return
    }

    resource.searchParams.append(key, item)
  })

  return resource.toString()
}

export {
  get,
  buildQueryParams
}