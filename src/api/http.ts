type paramsType = {
  start_date: string
  api_key: string
}

const get = async (url: string, params: paramsType) => {
  const resource = constructResource(url, params)

  return await fetch(resource)
}

const constructResource = (url: string, params: paramsType) => {
  const resource = new URL (url)
  const keys = Object.keys(params)

  keys.forEach(key =>
    resource.searchParams.append(key, params[key as keyof paramsType])
  )

  return resource.toString()
}

export { get }