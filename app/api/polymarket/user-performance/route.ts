/**
 * API Route: Get User Performance from Polymarket Subgraph
 */

import { NextResponse } from 'next/server'
import { getUserPerformance } from '@/lib/api/polymarket-subgraph'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userAddress = searchParams.get('address')

    if (!userAddress) {
      return NextResponse.json(
        { error: 'User address is required' },
        { status: 400 }
      )
    }

    const performance = await getUserPerformance(userAddress)

    return NextResponse.json({ performance })
  } catch (error) {
    console.error('Error fetching user performance:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch user performance',
        message: error instanceof Error ? error.message : 'Unknown error',
        performance: null
      },
      { status: 500 }
    )
  }
}

