import Asteroid from './asteroid'

import { NearEarthObject } from '../types/nearEarthObjects'

const Asteroids = ({asteroids}: {asteroids: Array<NearEarthObject>}) => {

  if (!asteroids.length) {
    return <></>
  }

  return (
    <ul className="mx-2">
      {asteroids.map((item: NearEarthObject) => (
        <li key={item.id} className="border-b">
          <Asteroid asteroid={item} simple={true} />
        </li>
      ))
      }
    </ul>
  )
}

export default Asteroids