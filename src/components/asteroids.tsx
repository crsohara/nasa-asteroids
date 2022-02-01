import Asteroid from './asteroid'

import { NearEarthObject } from '../types/nearEarthObjects'

const Asteroids = ({asteroids}: {asteroids: Array<NearEarthObject>}) => {

  if (!asteroids.length) {
    return <></>
  }

  return (
    <ul>
      {asteroids.map((item: NearEarthObject) => (
        <li key={item.id}>
          <Asteroid asteroid={item} />
        </li>
      ))
      }
    </ul>
  )
}

export default Asteroids