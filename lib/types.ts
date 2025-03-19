export interface Flatmate {
  id: string
  name: string
  profilePic: string | null
}

export interface Chore {
  id: string
  name: string
}

export interface Assignment {
  choreId: string
  flatmateId: string
  day: string
}

export interface ChoreData {
  flatmates: Flatmate[]
  chores: Chore[]
  assignments: Assignment[]
}

