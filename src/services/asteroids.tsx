import { buildQueryParams, get } from '../api/http'

import { dateFormat } from '../utils/api'
import { apiQueryParams } from '../types/http'
import { NearEarthObjects } from '../types/nearEarthObjects'

import moment from 'moment'

const getClosestObjectForDay = (closest: any, current: any) => {

  if (parseFloat(current.close_approach_data[0].miss_distance.kilometers) <
    parseFloat(closest.close_approach_data[0].miss_distance.kilometers)) {
    return current
  }

  return closest
}

export const getClosestObjectInGroup = (near_earth_objects: NearEarthObjects) => {
  const keys = Object.keys(near_earth_objects)

  const nearestByDay = keys.map((day: string) =>
    near_earth_objects[day].reduce(getClosestObjectForDay)
  )

  return nearestByDay.reduce(getClosestObjectForDay)
}

const fetchAsteroids = (params: apiQueryParams) => {
  return get('https://api.nasa.gov/neo/rest/v1/feed', params)
    .then(response => response.json())
    .then(({ near_earth_objects }) => near_earth_objects)
}

const getWeeksAsteroids = (startDate: string, weeks: number) => {
  const promises: Array<any> = []

  let start = startDate

  for (let index = 0; index < weeks; index++) {

    const end = moment(start).add(index + 1, 'weeks').format(dateFormat)
    const params = buildQueryParams(start, end)
    promises.push(fetchAsteroids(params))

    start = moment(end).add(1, 'days').format(dateFormat)
  }

  return promises
}

const getDaysAsteroids = (startDate: string, days: number) => {
  const end = moment(startDate).add(days - 1, 'days').format(dateFormat)

  const params = buildQueryParams(startDate, end)

  return fetchAsteroids(params)
}

export const getAsteroidsInDateRange = (startDate: string, difference: any) => {
  const promises: Array<any> = []
  const weeks = Math.floor(difference / 7)
  const days = difference % 7

  let start = moment(startDate).format(dateFormat)

  if (weeks) {
    promises.push(...getWeeksAsteroids(start, weeks))
  }

  if (days) {
    start = moment(start).add((weeks * 7) + 1, 'days').format(dateFormat)
    promises.push(getDaysAsteroids(start, days))
  }

  return Promise.all(promises)
    .then(responses => responses.reduce((accumulator, current) => {
        return Object.assign({}, accumulator, current)
      }, {})
    )
}



export const getAsteroids = (startDate: string, endDate: string|undefined = undefined) => {
  const difference = moment(endDate).diff(moment(startDate), 'days')

  if (endDate && difference > 7) {
    return getAsteroidsInDateRange(startDate, difference)
  }

  const params = buildQueryParams(startDate)

  return fetchAsteroids(params)
}