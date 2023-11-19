import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { fetchBillGroups } from '~/actions/Bill'

export async function GET(_: NextRequest) {
  const data = await fetchBillGroups()
  return NextResponse.json({ success: true, data }, { status: 200 })
}
