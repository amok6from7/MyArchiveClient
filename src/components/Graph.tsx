import React, { useState, useLayoutEffect, useContext } from 'react'
import { HorizontalBar } from 'react-chartjs-2'
import axios from 'axios'
import { AuthContext } from './Auth'

type analysis = {
  name: string
  count: number
}

const Graph = (props: any) => {
  const [authors, setAuthors] = useState(Array)
  const [counts, setCounts] = useState(Array)
  const { currentUser } = useContext(AuthContext)

  useLayoutEffect(() => {
    currentUser === null && props.history.push('/login')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser])

  useLayoutEffect(() => {
    const f = async () => {
      await getCount()
    }
    f()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getCount = async () => {
    axios
      .get<analysis[]>(`${process.env.REACT_APP_HEROKU_API}author/count`)
      .then((res) => {
        const results = res.data
        const res_authors: string[] = []
        const res_counts: number[] = []
        Array.from(results).forEach((e) => {
          res_authors.push(e.name)
          res_counts.push(e.count)
        })
        setAuthors(res_authors)
        setCounts(res_counts)
      })
  }

  const data = {
    labels: authors,
    datasets: [
      {
        label: 'Book Count By Author',
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        data: counts,
      },
    ],
  }

  const options = {
    scales: {
      xAxes: [
        {
          ticks: {
            beginAtZero: true,
            min: 0,
          },
        },
      ],
    },
  }
  return <HorizontalBar data={data} options={options} height={400} />
}

export default Graph
