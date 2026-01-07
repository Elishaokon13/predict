/**
 * API Route: Get Markets from Polymarket Gamma API
 */

import { NextResponse } from 'next/server'
import { getMarkets } from '@/lib/api/polymarket-gamma'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const active = searchParams.get('active') === 'true'
    const closed = searchParams.get('closed') === 'true'
    const limit = parseInt(searchParams.get('limit') || '50', 10)
    const offset = parseInt(searchParams.get('offset') || '0', 10)
    const category = searchParams.get('category') || undefined

    const markets = await getMarkets({
      active,
      closed,
      limit,
      offset,
      category,
    })

    return NextResponse.json({ markets })
  } catch (error) {
    console.error('Error fetching markets:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch markets',
        message: error instanceof Error ? error.message : 'Unknown error',
        markets: []
      },
      { status: 500 }
    )
  }
}

