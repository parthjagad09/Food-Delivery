import { useParams } from "react-router-dom"

export default function RestaurantDetails() {
  const { id } = useParams()

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">
        Restaurant Details – {id}
      </h1>
    </div>
  )
}
