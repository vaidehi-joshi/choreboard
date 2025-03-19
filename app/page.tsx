import ChoreSchedule from "@/components/chore-schedule"
import { getChoreData } from "@/lib/data"

export default function Home() {
  const choreData = getChoreData()

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Weekly ChoreBoard Schedule</h1>
      <ChoreSchedule data={choreData} />
    </div>
  )
}

