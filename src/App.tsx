import { useEffect, useState } from 'react'

import Form from './components/form'
import Asteroids from './components/asteroids'

import { get } from './api/http'
import { getClosestObjectInGroup } from './services/asteroids'
import { NearEarthObjects, NearEarthObject } from './types/nearEarthObjects'

import moment from 'moment'

function App() {
  const VITE_NASA_API_KEY: any = import.meta.env.VITE_NASA_API_KEY

  const [asteroids, setAsteroids] = useState<NearEarthObjects|undefined>(undefined)
  const [nearest, setNearest] = useState<NearEarthObject|undefined>(undefined)
  const [startDate, setStartDate] = useState(moment().format('YYYY-MM-DD'))

  const params = {
    start_date: moment(startDate).format('YYYY-MM-DD'),
    api_key: VITE_NASA_API_KEY
  }

  useEffect(() => {
    get('https://api.nasa.gov/neo/rest/v1/feed', params)
      .then((response) => response.json())
      .then(response => {
        const { near_earth_objects } = response
        setAsteroids(near_earth_objects)

        const result = getClosestObjectInGroup(near_earth_objects)
        setNearest(result)
      })
  }, [startDate])

  return (
    <div>
      <main>
        <Form onSubmit={setStartDate} />

        {nearest &&
          <Asteroids asteroids={[nearest]} />
        }
        <hr />

        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr'}}>
          {asteroids && Object.keys(asteroids).map((key: string) => (
            <div key={key}>
              <strong>{key}</strong>
              <Asteroids asteroids={asteroids[key]} />
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default App
