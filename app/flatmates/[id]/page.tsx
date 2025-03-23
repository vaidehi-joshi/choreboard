import { getFlatmates, getChoreData } from "@/lib/data"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"

// Mark the page as dynamic
export const dynamic = 'force-dynamic'

export default async function FlatmatePage({ params }: { params: { id: string } }) {
  // Fetch data with proper error handling
  try {
    const [flatmates, choreData] = await Promise.all([
      getFlatmates(),
      getChoreData()
    ])

    const flatmate = flatmates.find((f) => f.id === params.id)

    if (!flatmate) {
      notFound()
    }

    const assignments = choreData.assignments.filter((a) => a.flatmateId === flatmate.id)

    // Group assignments by day
    const assignmentsByDay = assignments.reduce(
      (acc, assignment) => {
        if (!acc[assignment.day]) {
          acc[assignment.day] = []
        }

        const chore = choreData.chores.find((c) => c.id === assignment.choreId)
        if (chore) {
          acc[assignment.day].push(chore)
        }

        return acc
      },
      {} as Record<string, typeof choreData.chores>,
    )

    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

    return (
      <div className="p-4 md:p-6">
        <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">{flatmate.name}'s Chores</h1>

        <div className="grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {days.map((day) => (
            <div key={day} className="rounded-lg border p-3 md:p-4 bg-white shadow-sm">
              <h2 className="font-semibold mb-2 md:mb-3 text-primary">{day}</h2>
              <div className="space-y-2">
                {assignmentsByDay[day]?.length ? (
                  assignmentsByDay[day].map((chore) => (
                    <div key={chore.id} className="flex items-center">
                      <Badge variant="outline" className="font-normal border-primary/30">
                        {chore.name}
                      </Badge>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground text-sm">No chores assigned</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error fetching flatmate data:', error)
    return (
      <div className="p-4 md:p-6">
        <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Error Loading Data</h1>
        <p>Unable to load flatmate data. Please try again later.</p>
      </div>
    )
  }
}

