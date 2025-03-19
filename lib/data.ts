'use server'

import { prisma } from './prisma'
import type { ChoreData, Flatmate } from "./types"

// Static data for the chore tracker
export async function getChoreData(): Promise<ChoreData> {
  const [chores, flatmates] = await Promise.all([
    prisma.chore.findMany({
      select: {
        id: true,
        chore_name: true,
        day: true,
        assigned_to: true,
        is_complete: true
      }
    }),
    prisma.personInfo.findMany({
      select: {
        id: true,
        name: true,
        points: true
      }
    })
  ]);

  return {
    flatmates: flatmates.map(f => ({
      id: f.id.toString(),
      name: f.name
    })),
    chores: chores.map(c => ({
      id: c.id.toString(),
      name: c.chore_name
    })),
    assignments: chores.map(c => ({
      choreId: c.id.toString(),
      flatmateId: (c.assigned_to as string[])[0], // Assuming assigned_to is an array of IDs
      day: c.day
    }))
  }
}

export async function getFlatmates(): Promise<Flatmate[]> {
  const flatmates = await prisma.personInfo.findMany({
    select: {
      id: true,
      name: true,
      profile_pic: true
    }
  });

  return flatmates.map(f => ({
    id: f.id.toString(),
    name: f.name,
    profilePic: f.profile_pic ? Buffer.from(f.profile_pic).toString('base64') : null
  }));
}

export async function getChoreDataAction(): Promise<ChoreData> {
  const [chores, flatmates] = await Promise.all([
    prisma.chore.findMany({
      select: {
        id: true,
        chore_name: true,
        day: true,
        assigned_to: true,
        is_complete: true
      }
    }),
    prisma.personInfo.findMany({
      select: {
        id: true,
        name: true,
        points: true,
        profile_pic: true
      }
    })
  ]);

  return {
    flatmates: flatmates.map(f => ({
      id: f.id.toString(),
      name: f.name,
      profilePic: f.profile_pic ? Buffer.from(f.profile_pic).toString('base64') : null
    })),
    chores: chores.map(c => ({
      id: c.id.toString(),
      name: c.chore_name
    })),
    assignments: chores.map(c => ({
      choreId: c.id.toString(),
      flatmateId: (c.assigned_to as string[])[0],
      day: c.day
    }))
  }
}

