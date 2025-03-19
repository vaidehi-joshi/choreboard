import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import type { ChoreData } from "@/lib/types"
import { getChoreDataAction } from "@/lib/data"

export default async function ChoreSchedule() {
  const data = await getChoreDataAction()
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  
  // Define the desired order of chores
  const choreOrder = ["Lunch", "Trash", "Dinner", "Kitchen", "Living Room"]

  // Group chores by name
  const groupedChores = data.chores.reduce((acc, chore) => {
    if (!acc[chore.name]) {
      acc[chore.name] = {
        name: chore.name,
        ids: [chore.id]
      }
    } else {
      acc[chore.name].ids.push(chore.id)
    }
    return acc
  }, {} as Record<string, { name: string, ids: string[] }>)

  // Sort chores according to the defined order
  const sortedChores = Object.values(groupedChores).sort((a, b) => {
    const indexA = choreOrder.indexOf(a.name)
    const indexB = choreOrder.indexOf(b.name)
    return indexA - indexB
  })

  return (
    <div>
      {/* Desktop view - horizontal ta ble */}
      <div className="hidden md:block rounded-md border bg-white shadow-sm">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="w-[250px] font-semibold text-foreground text-lg py-6">Chore</TableHead>
              {days.map((day) => (
                <TableHead key={day} className="font-semibold text-foreground text-lg py-6">
                  {day}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedChores.map((chore) => (
              <TableRow key={chore.name}>
                <TableCell className="font-medium bg-muted/30 text-lg py-6">{chore.name}</TableCell>
                {days.map((day) => {
                  const assignments = data.assignments.filter(
                    (a) => chore.ids.includes(a.choreId) && a.day === day
                  )
                  const flatmates = assignments
                    .map(assignment => {
                      const flatmate = data.flatmates.find((f) => f.id === assignment.flatmateId)
                      return flatmate || null
                    })
                    .filter((f): f is NonNullable<typeof f> => f !== null)

                  return (
                    <TableCell key={`${chore.name}-${day}`} className="py-6">
                      {flatmates.length > 0 ? (
                        <div className="flex flex-wrap gap-3">
                          {flatmates.map((flatmate) => (
                            <Avatar 
                              key={flatmate.id} 
                              className="h-12 w-12"
                              title={flatmate.name}
                            >
                              {flatmate.profilePic ? (
                                <AvatarImage 
                                  src={`data:image/jpeg;base64,${flatmate.profilePic}`} 
                                  alt={flatmate.name} 
                                />
                              ) : (
                                <AvatarFallback className="text-base">{flatmate.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                              )}
                            </Avatar>
                          ))}
                        </div>
                      ) : (
                        <span className="text-muted-foreground text-lg">-</span>
                      )}
                    </TableCell>
                  )
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile view - cards for each day */}
      <div className="md:hidden space-y-6">
        {days.map((day) => (
          <div key={day} className="rounded-md border bg-white shadow-sm p-4">
            <h3 className="font-semibold text-lg mb-3 text-primary">{day}</h3>
            <div className="space-y-4">
              {sortedChores.map((chore) => {
                const assignments = data.assignments.filter(
                  (a) => chore.ids.includes(a.choreId) && a.day === day
                )
                const flatmates = assignments
                  .map(assignment => {
                    const flatmate = data.flatmates.find((f) => f.id === assignment.flatmateId)
                    return flatmate || null
                  })
                  .filter((f): f is NonNullable<typeof f> => f !== null)

                return (
                  <div
                    key={`${day}-${chore.name}`}
                    className="flex justify-between items-center p-2 rounded-md bg-muted/30"
                  >
                    <span className="font-medium">{chore.name}</span>
                    {flatmates.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {flatmates.map((flatmate) => (
                          <Avatar 
                            key={flatmate.id} 
                            className="h-6 w-6"
                            title={flatmate.name}
                          >
                            {flatmate.profilePic ? (
                              <AvatarImage 
                                src={`data:image/jpeg;base64,${flatmate.profilePic}`} 
                                alt={flatmate.name} 
                              />
                            ) : (
                              <AvatarFallback>{flatmate.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                            )}
                          </Avatar>
                        ))}
                      </div>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

