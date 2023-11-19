import { type NextRequest, NextResponse } from 'next/server'
import { fetchWalletAccounts } from '~/actions/WalletAccount'

export async function GET(_: NextRequest) {
  const data = await fetchWalletAccounts()
  return NextResponse.json({ success: true, data }, { status: 200 })
}
