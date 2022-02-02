import { useEffect, useState } from 'react'

import Form from './components/form'
import Asteroid from './components/asteroid'
import Asteroids from './components/asteroids'

import { formatDate } from './utils/date'
import { getAsteroids, getClosestObjectInGroup } from './services/asteroids'
import { NearEarthObjects, NearEarthObject } from './types/nearEarthObjects'

import "./assets/app.css"
import moment from 'moment'

function App() {
  const [asteroids, setAsteroids] = useState<NearEarthObjects|undefined>(undefined)
  const [nearest, setNearest] = useState<NearEarthObject|undefined>(undefined)
  const [startDate, setStartDate] = useState<string>(formatDate(new Date()))
  const [endDate, setEndDate] = useState<string|undefined>(undefined)
  const [loading, setLoading] = useState<boolean>(false)

  const setDates = (start: any, end: any) => {
    setStartDate(start)
    setEndDate(end)
  }

  const getEndDateString = () => {
    if (endDate) {
      return endDate
    }
    return formatDate(moment(startDate).add(7, 'days').toDate())
  }

  useEffect(() => {
    setLoading(true)

    getAsteroids(startDate, endDate)
      .then((near_earth_objects: any) => {
        setAsteroids(near_earth_objects)
        return getClosestObjectInGroup(near_earth_objects)
      })
      .then(nearest => {
        setNearest(nearest)
        setLoading(false)
      })
  }, [startDate, endDate])

  return (
    <div>
      <main className="p-8">
        <div className="pb-8">
          <Form onSubmit={setDates} loading={loading}/>
        </div>

        <div className="max-w-3xl mx-auto mb-8">
          {loading &&
            <div className="relative py-10 text-center">
              <div className="loading absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20"></div>
              Our finest miners are digging up some asteroids, please be patient...
            </div>
          }
          {nearest && !loading &&
            <Asteroid
            asteroid={nearest}
            startDate={startDate}
            endDate={getEndDateString()} />
          }
        </div>

        <hr />

        {asteroids && !loading &&
          <div className="max-w-7xl mx-auto my-8">
            <div className="grid md:grid-cols-3">
              {asteroids && Object.keys(asteroids).map((key: string) => (
                <div key={key}>
                  <strong>{key}</strong>
                  <div className="-mx-2">
                    <Asteroids asteroids={asteroids[key]}/>
                  </div>
                </div>
              ))}
            </div>
          </div>
        }
      </main>
    </div>
  )
}

export default App
