import { useEffect, useState } from 'react'

import Form from './components/form'
import Asteroids from './components/asteroids'

import { formatDate } from './utils/date'
import { getAsteroids, getClosestObjectInGroup } from './services/asteroids'
import { NearEarthObjects, NearEarthObject } from './types/nearEarthObjects'

function App() {
  const [asteroids, setAsteroids] = useState<NearEarthObjects|undefined>(undefined)
  const [nearest, setNearest] = useState<NearEarthObject|undefined>(undefined)
  const [startDate, setStartDate] = useState<string>(formatDate(new Date()))
  const [endDate, setEndDate] = useState<string|undefined>(undefined)

  const setDates = (start: any, end: any) => {
    setStartDate(start)
    setEndDate(end)
  }

  useEffect(() => {
    setAsteroids(undefined)
    setNearest(undefined)

    getAsteroids(startDate, endDate)
      .then((near_earth_objects: any) => {
        setAsteroids(near_earth_objects)
        return getClosestObjectInGroup(near_earth_objects)
      })
      .then(nearest => {
        setNearest(nearest)
      })
  }, [startDate, endDate])

  return (
    <div>
      <main>
        <Form onSubmit={setDates} />

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
