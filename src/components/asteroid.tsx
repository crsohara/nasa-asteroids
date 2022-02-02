import { NearEarthObject } from "../types/nearEarthObjects"

const Asteroid = ({
  asteroid,
  startDate,
  endDate,
  simple
}: {asteroid: NearEarthObject, startDate?: string, endDate?: string|undefined, simple?: boolean}) => {

  const details = () => {
    return <div className="mt-2 ">
    <dl>
      <dt>Name</dt>
      <dd>{asteroid.name}</dd>
    </dl>
    <dl>
      <dt>ID</dt>
      <dd>{asteroid.id}</dd>
    </dl>
    <dl>
      <dt>Distance (km):</dt>
      <dd>{asteroid.close_approach_data[0].miss_distance.kilometers}</dd>
    </dl>
  </div>
  }

  if (simple) {
    return details()
  }

  const { name } = asteroid
  const km = asteroid.close_approach_data[0].miss_distance.kilometers
  const kmFormatted = parseFloat(km).toFixed(2)
  const date = asteroid.close_approach_data[0].close_approach_date

  const introText = () => {
    if (startDate === endDate) {
      return <div>
        <h2>The closest asteroid on {startDate} is:</h2>
      </div>
    }

    return <div>
      <h2>The closest asteroid between {startDate} and {endDate} is:</h2>
    </div>
  }

  return (
    <div>
      <div>
        {introText()}
        <p>Asteroid <strong>{name}</strong> will pass by earth on <strong>{date}</strong>, <strong>{kmFormatted}</strong> km from earth</p>
        <p>
          Check out all this info in a less readable format <a href={asteroid.links.self} rel="noreferrer" target="_blank">here</a>, and check out the movie this asteroid is based on <a href="https://www.imdb.com/title/tt0120591/" rel="noreferrer" target="_blank">here</a>
        </p>
      </div>

      {details()}

    </div>
  )
}

export default Asteroid