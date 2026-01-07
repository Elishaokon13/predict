/**
 * API Route: Get Top Traders from Polymarket Subgraph
 * 
 * Server-side endpoint to query Polymarket's PNL Subgraph
 */

import { NextResponse } from 'next/server'
import { getTopTradersByPNL } from '@/lib/api/polymarket-subgraph'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '100', 10)

    const topTraders = await getTopTradersByPNL(limit)
    
    // Traders are already sorted by win rate (highest to lowest) in getTopTradersByPNL
    // No additional sorting needed here

    return NextResponse.json({ traders: topTraders })
  } catch (error) {
    console.error('Error fetching top traders:', error)
    
    // Return error response but don't crash
    return NextResponse.json(
      { 
        error: 'Failed to fetch top traders from Polymarket',
        message: error instanceof Error ? error.message : 'Unknown error',
        traders: [] // Return empty array as fallback
      },
      { status: 500 }
    )
  }
}

