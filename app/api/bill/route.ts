import { type NextRequest, NextResponse } from 'next/server'
import { catchError } from '~/utils'
import prisma from '~/prisma/db'
import { billCreateSchema } from '~/schemas'
import type { BillCreate, BillServer } from '~/types'
import { categorySelectField } from '~/app/api/category/route'

export async function POST(request: NextRequest) {
  try {
    const bill: BillCreate = await request.json()
    const validation = billCreateSchema.safeParse(bill)
    if (!validation.success) {
      return NextResponse.json({ message: '参数错误', errors: validation.error.issues }, { status: 400 })
    }

    const data: BillServer = await prisma.bill.create({
      data: bill,
      select: {
        id: true,
        date: true,
        amount: true,
        note: true,
        category: {
          select: categorySelectField,
        },
        walletAccount: {
          select: {
            id: true,
            name: true,
            amount: true,
          },
        },
      },
    })
    return NextResponse.json({ success: true, message: '创建成功', data }, { status: 201 })
  }
  catch (error) {
    return catchError(error, { module: '账单' })
  }
}
