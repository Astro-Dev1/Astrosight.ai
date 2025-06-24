import axios from 'axios'
import { useRouter } from 'next/router'

export default function Panchanga({ data }) {
  const router = useRouter()
  const { date } = router.query

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-6">Panchanga for {date}</h1>
      {/* Display Panchanga details */}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

export async function getServerSideProps({ params }) {
  const res = await axios.get(`https://your-api.com/panchanga?date=${params.date}`)
  const data = res.data

  return {
    props: { data },
  }
}
