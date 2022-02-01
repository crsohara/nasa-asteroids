import { NearEarthObject } from "../types/nearEarthObjects"

const Asteroid = ({asteroid}: {asteroid: NearEarthObject}) => {

  return (
    <div>
      <div>ID: {asteroid.id}</div>
      <div>Name: {asteroid.name}</div>
      <div>Distance: {asteroid.close_approach_data[0].miss_distance.kilometers} km</div>
    </div>
  )
}

export default Asteroid