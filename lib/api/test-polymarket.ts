/**
 * Test utility for Polymarket Subgraph queries
 * 
 * Run this to verify Subgraph API access
 */

import { getTopTradersByPNL, getUserPerformance } from './polymarket-subgraph'
import { getMarkets } from './polymarket-gamma'

/**
 * Test all Polymarket API endpoints
 */
export async function testPolymarketAPIs() {
  console.log('🧪 Testing Polymarket API Integration...\n')

  // Test 1: Top Traders from PNL Subgraph
  console.log('1️⃣ Testing Top Traders (PNL Subgraph)...')
  try {
    const topTraders = await getTopTradersByPNL(5)
    console.log(`✅ Success! Found ${topTraders.length} top traders`)
    if (topTraders.length > 0) {
      console.log(`   Sample trader: ${topTraders[0].username} (ROI: ${topTraders[0].roi30d}%)`)
    }
  } catch (error) {
    console.error('❌ Failed:', error instanceof Error ? error.message : error)
  }

  console.log('\n')

  // Test 2: Markets from Gamma API
  console.log('2️⃣ Testing Markets (Gamma API)...')
  try {
    const markets = await getMarkets({ active: true, limit: 5 })
    console.log(`✅ Success! Found ${markets.length} active markets`)
    if (markets.length > 0) {
      console.log(`   Sample market: ${markets[0].question || markets[0].id}`)
    }
  } catch (error) {
    console.error('❌ Failed:', error instanceof Error ? error.message : error)
  }

  console.log('\n')

  // Test 3: User Performance (if we have a test address)
  console.log('3️⃣ Testing User Performance (Activity Subgraph)...')
  try {
    // Use a known address or get from top traders
    const topTraders = await getTopTradersByPNL(1)
    if (topTraders.length > 0) {
      const testAddress = topTraders[0].id
      const performance = await getUserPerformance(testAddress)
      console.log(`✅ Success! Got performance for ${testAddress}`)
      console.log(`   Win Rate: ${performance.winRate.toFixed(1)}%`)
      console.log(`   Total Trades: ${performance.totalTrades}`)
      console.log(`   Markets Active: ${performance.marketsActive}`)
    } else {
      console.log('⚠️  Skipped: No traders available to test')
    }
  } catch (error) {
    console.error('❌ Failed:', error instanceof Error ? error.message : error)
  }

  console.log('\n✅ Testing complete!')
}

// Run if called directly (for testing)
if (require.main === module) {
  testPolymarketAPIs().catch(console.error)
}

