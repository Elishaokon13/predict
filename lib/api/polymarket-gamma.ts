/**
 * Polymarket Gamma API Client
 * 
 * Market discovery and metadata from Polymarket's Gamma API
 */

export interface PolymarketMarket {
  id: string
  question: string
  slug: string
  description: string
  image: string
  icon: string
  active: boolean
  closed: boolean
  archived: boolean
  liquidity: string
  volume: string
  endDate: string
  startDate: string
  outcomes: string[]
  category: string
  tags: string[]
}

const GAMMA_API_BASE = 'https://gamma-api.polymarket.com'

/**
 * Get markets from Polymarket Gamma API
 */
export async function getMarkets(params: {
  active?: boolean
  closed?: boolean
  archived?: boolean
  limit?: number
  offset?: number
  category?: string
}): Promise<PolymarketMarket[]> {
  try {
    const queryParams = new URLSearchParams()
    
    if (params.active !== undefined) queryParams.append('active', String(params.active))
    if (params.closed !== undefined) queryParams.append('closed', String(params.closed))
    if (params.archived !== undefined) queryParams.append('archived', String(params.archived))
    if (params.limit) queryParams.append('limit', String(params.limit))
    if (params.offset) queryParams.append('offset', String(params.offset))
    if (params.category) queryParams.append('category', params.category)

    const response = await fetch(`${GAMMA_API_BASE}/markets?${queryParams.toString()}`)
    
    if (!response.ok) {
      throw new Error(`Gamma API error: ${response.statusText}`)
    }

    const data = await response.json()
    return data.results || data || []
  } catch (error) {
    console.error('Error fetching markets from Polymarket Gamma API:', error)
    throw error
  }
}

/**
 * Get a specific market by ID or slug
 */
export async function getMarket(marketId: string): Promise<PolymarketMarket | null> {
  try {
    const response = await fetch(`${GAMMA_API_BASE}/markets/${marketId}`)
    
    if (!response.ok) {
      if (response.status === 404) return null
      throw new Error(`Gamma API error: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching market:', error)
    return null
  }
}

/**
 * Get market categories
 */
export async function getCategories(): Promise<string[]> {
  try {
    const response = await fetch(`${GAMMA_API_BASE}/categories`)
    
    if (!response.ok) {
      throw new Error(`Gamma API error: ${response.statusText}`)
    }

    const data = await response.json()
    return data.results?.map((cat: any) => cat.name) || data || []
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

/**
 * Get events (collections of markets)
 */
export async function getEvents(params: {
  limit?: number
  offset?: number
}): Promise<any[]> {
  try {
    const queryParams = new URLSearchParams()
    if (params.limit) queryParams.append('limit', String(params.limit))
    if (params.offset) queryParams.append('offset', String(params.offset))

    const response = await fetch(`${GAMMA_API_BASE}/events?${queryParams.toString()}`)
    
    if (!response.ok) {
      throw new Error(`Gamma API error: ${response.statusText}`)
    }

    const data = await response.json()
    return data.results || data || []
  } catch (error) {
    console.error('Error fetching events:', error)
    return []
  }
}

