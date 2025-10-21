import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// POST /api/progress
export async function POST(req: Request) {
  const data = await req.json()
  const { studentId, stage, time } = data

  if (!studentId || !stage) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  const record = await prisma.gameProgress.create({
    data: { studentId, stage, time },
  })

  return NextResponse.json(record)
}

// GET /api/progress?studentId=123
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const studentId = searchParams.get('studentId') || ''
  const progress = await prisma.gameProgress.findMany({
    where: { studentId },
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json(progress)
}
