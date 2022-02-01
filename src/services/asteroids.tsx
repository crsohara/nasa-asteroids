import { NearEarthObjects } from '../types/nearEarthObjects'

const getClosestObjectForDay = (previous: any, current: any) => {

  if (parseFloat(current.close_approach_data[0].miss_distance.kilometers) <
    parseFloat(previous.close_approach_data[0].miss_distance.kilometers)) {
    return current
  }

  return previous
}

export const getClosestObjectInGroup = (near_earth_objects: NearEarthObjects) => {

  const keys = Object.keys(near_earth_objects)

  const nearestByDay = keys.map((day: string) =>
    near_earth_objects[day].reduce(getClosestObjectForDay)
  )

  return nearestByDay.reduce(getClosestObjectForDay)
}
