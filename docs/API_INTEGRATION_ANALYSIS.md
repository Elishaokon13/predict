# API Integration Analysis: Making Copy Trading Dashboard Live

## Executive Summary

After studying Kalshi and Polymarket API documentation, I've identified the APIs needed and **critical limitations** for implementing copy trading functionality.

## Platform Comparison: Kalshi vs Polymarket

### Kalshi
- **Architecture**: Centralized platform
- **API Access**: REST API with RSA-PSS authentication
- **Data Privacy**: User data is private, no public leaderboards
- **Copy Trading**: ❌ Not directly supported via API

### Polymarket
- **Architecture**: Blockchain-based (on-chain data)
- **API Access**: Multiple APIs (Gamma, CLOB, Data, Subgraph)
- **Data Privacy**: Some on-chain data is publicly queryable
- **Copy Trading**: ⚠️ Potentially possible via Subgraph queries (needs verification)

## ⚠️ Critical Finding: Copy Trading Limitation

**Kalshi API does NOT provide public access to other users' trading data.** The API is designed for:
- Your own account management
- Market data access
- Your own order execution

**Polymarket has more potential** due to blockchain architecture - on-chain data may be queryable, but user privacy settings may still limit access.

**This means true "copy trading" (mirroring other users' trades) may require:**
1. User opt-in systems
2. On-chain data analysis (Polymarket)
3. Partnership agreements
4. Manual tracking systems

## Required APIs for Dashboard Features

### 1. Dashboard Metrics (Portfolio Overview)

**Kalshi API:**
- ✅ `GET /trade-api/v2/portfolio`
  - Returns: User's portfolio balance, positions, PnL
  - Use for: Total Portfolio Value, Total Copied Capital, Lifetime PnL, ROI%
  - **Status**: Available ✅

**Implementation:**
```typescript
// lib/api/kalshi.ts
export async function getPortfolio(): Promise<PortfolioMetrics> {
  const response = await fetch('https://api.kalshi.com/trade-api/v2/portfolio', {
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      // Kalshi uses RSA-PSS signature auth
    }
  })
  return response.json()
}
```

---

### 2. Top Traders Leaderboard

**Kalshi API:**
- ❌ **NOT AVAILABLE** - No public leaderboard endpoint
- ❌ **NOT AVAILABLE** - No public user rankings endpoint
- ❌ **NOT AVAILABLE** - No public trader performance data

**Alternative Solutions:**
1. **Build your own leaderboard** by:
   - Tracking users who opt-in to share data
   - Using web scraping (not recommended, may violate ToS)
   - Partnering with Kalshi for data access
   - Creating a community-driven leaderboard

2. **Use Polymarket Data** (if applicable):
   - Polymarket has more public data
   - But still limited trader-specific data

**Workaround Implementation:**
```typescript
// lib/api/traders.ts
// This would need to be built from opt-in users or partnerships
export async function getTopTraders(): Promise<TopTrader[]> {
  // Option 1: User opt-in system
  // Option 2: Scrape public profiles (risky)
  // Option 3: Partner API access
  throw new Error('Not available via public API')
}
```

---

### 3. Copied Traders Table

**Kalshi API:**
- ✅ `GET /trade-api/v2/portfolio/positions`
  - Returns: Current positions in user's portfolio
  - Use for: Displaying copied trader allocations
  - **Status**: Available ✅

**Implementation:**
```typescript
export async function getPositions(): Promise<Position[]> {
  const response = await fetch('https://api.kalshi.com/trade-api/v2/portfolio/positions', {
    headers: getAuthHeaders()
  })
  return response.json()
}
```

---

### 4. Performance Chart Data

**Kalshi API:**
- ✅ `GET /trade-api/v2/portfolio/history`
  - Returns: Historical portfolio value over time
  - Use for: Performance chart data points
  - **Status**: Available ✅

**Implementation:**
```typescript
export async function getPortfolioHistory(
  startTime: Date,
  endTime: Date
): Promise<PerformanceDataPoint[]> {
  const response = await fetch(
    `https://api.kalshi.com/trade-api/v2/portfolio/history?start_time=${startTime}&end_time=${endTime}`,
    { headers: getAuthHeaders() }
  )
  return response.json()
}
```

---

### 5. Markets Overview

**Kalshi API:**
- ✅ `GET /trade-api/v2/markets`
  - Returns: List of available markets
  - Query params: `status`, `limit`, `offset`
  - Use for: Markets view
  - **Status**: Available ✅

**Implementation:**
```typescript
export async function getMarkets(params: {
  status?: 'open' | 'closed' | 'resolved'
  limit?: number
  offset?: number
}): Promise<Market[]> {
  const query = new URLSearchParams(params)
  const response = await fetch(
    `https://api.kalshi.com/trade-api/v2/markets?${query}`,
    { headers: getAuthHeaders() }
  )
  return response.json()
}
```

---

### 6. Copy Trading Execution

**Kalshi API:**
- ✅ `POST /trade-api/v2/portfolio/orders`
  - Creates new orders
  - Use for: Executing copy trades
  - **Status**: Available ✅

**Challenge**: 
- You can place orders for YOUR account
- You CANNOT automatically mirror another user's trades without:
  1. That user's API credentials (not feasible)
  2. A social trading feature from Kalshi
  3. Manual tracking and replication

**Implementation:**
```typescript
export async function placeOrder(order: {
  market_ticker: string
  side: 'yes' | 'no'
  action: 'buy' | 'sell'
  count: number
  price: number
  type: 'limit' | 'market'
}): Promise<Order> {
  const response = await fetch('https://api.kalshi.com/trade-api/v2/portfolio/orders', {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(order)
  })
  return response.json()
}
```

---

## Authentication Requirements

### Kalshi API Authentication

**Method**: RSA-PSS Signature Authentication

**Required:**
1. API Key (from Kalshi account settings)
2. RSA Private Key (generated by user)
3. Request signing with RSA-PSS algorithm

**Implementation:**
```typescript
// lib/api/kalshi-auth.ts
import crypto from 'crypto'

export function signRequest(
  method: string,
  path: string,
  body: string,
  apiKey: string,
  privateKey: string
): string {
  const timestamp = Date.now().toString()
  const message = `${method}\n${path}\n${timestamp}\n${body}`
  
  const sign = crypto.createSign('RSA-SHA256')
  sign.update(message)
  const signature = sign.sign(privateKey, 'base64')
  
  return signature
}

export function getAuthHeaders(
  method: string,
  path: string,
  body: string
): HeadersInit {
  const signature = signRequest(method, path, body, API_KEY, PRIVATE_KEY)
  const timestamp = Date.now().toString()
  
  return {
    'Authorization': `Bearer ${API_KEY}`,
    'X-Kalshi-Timestamp': timestamp,
    'X-Kalshi-Signature': signature,
  }
}
```

---

## Recommended Implementation Strategy

### Phase 1: Core Portfolio Features (Fully Possible)
✅ **Can implement immediately:**
- Dashboard metrics (your portfolio)
- Performance charts (your portfolio history)
- Markets overview
- Your own positions table

### Phase 2: Copy Trading Features (Requires Workaround)
⚠️ **Requires alternative approach:**

**Option A: Opt-In Social Trading**
- Users opt-in to share their trading data
- Build your own leaderboard from opt-in users
- Track their trades and allow copying
- Requires backend database to store user data

**Option B: Manual Copy Trading**
- Users manually select traders to "follow"
- Dashboard shows their public profile data (if available)
- Users manually replicate trades
- Less automated but more transparent

**Option C: Partner with Kalshi**
- Request API access to public leaderboards
- May require business partnership
- Best long-term solution

### Phase 3: Advanced Features
- Real-time order execution
- Risk management (max drawdown, stop-loss)
- Portfolio rebalancing
- Trade notifications

---

## Required API Endpoints Summary

### Kalshi API

| Feature | Endpoint | Status | Notes |
|---------|----------|--------|-------|
| Portfolio Metrics | `GET /trade-api/v2/portfolio` | ✅ Available | Your own portfolio |
| Portfolio History | `GET /trade-api/v2/portfolio/history` | ✅ Available | For charts |
| Positions | `GET /trade-api/v2/portfolio/positions` | ✅ Available | Your positions |
| Markets | `GET /trade-api/v2/markets` | ✅ Available | Market data |
| Order Book | `GET /trade-api/v2/markets/{ticker}/orderbook` | ✅ Available | Market depth |
| Place Order | `POST /trade-api/v2/portfolio/orders` | ✅ Available | Execute trades |
| Cancel Order | `DELETE /trade-api/v2/portfolio/orders/{id}` | ✅ Available | Cancel trades |
| **Top Traders** | ❌ **NOT AVAILABLE** | ❌ Missing | Need workaround |
| **User Rankings** | ❌ **NOT AVAILABLE** | ❌ Missing | Need workaround |
| **Public Trade History** | ❌ **NOT AVAILABLE** | ❌ Missing | Need workaround |

### Polymarket API

| Feature | API/Endpoint | Status | Notes |
|---------|--------------|--------|-------|
| Market Discovery | `Gamma API: /markets` | ✅ Available | Market metadata |
| Real-time Prices | `CLOB API: /book` | ✅ Available | Order book data |
| User Positions | `Data API: /positions` | ⚠️ Limited | Your own positions |
| Trade History | `Data API: /trades` | ⚠️ Limited | Your own trades |
| **Activity Subgraph** | `GraphQL: activity-subgraph` | ⚠️ **POTENTIALLY AVAILABLE** | **On-chain activity data** |
| **PNL Subgraph** | `GraphQL: pnl-subgraph` | ⚠️ **POTENTIALLY AVAILABLE** | **User PnL calculations** |
| **Positions Subgraph** | `GraphQL: positions-subgraph` | ⚠️ **POTENTIALLY AVAILABLE** | **On-chain positions** |
| Place Order | `CLOB API: /orders` | ✅ Available | Execute trades |
| WebSocket Updates | `wss://ws-subscriptions-clob.polymarket.com` | ✅ Available | Real-time data |
| **Top Traders** | ⚠️ **POSSIBLY AVAILABLE** | ⚠️ **Needs Verification** | Via Subgraph queries |

**Key Difference**: Polymarket's blockchain architecture means some data is on-chain and potentially queryable via Subgraph APIs, unlike Kalshi's centralized approach.

---

## Next Steps

1. **Set up Kalshi API authentication**
   - Generate API keys
   - Implement RSA-PSS signing
   - Create auth utility functions

2. **Implement available endpoints**
   - Portfolio data fetching
   - Market data fetching
   - Order execution

3. **Design workaround for copy trading**
   - Decide on opt-in vs manual approach
   - Build backend if needed
   - Create user data storage

4. **Test with sandbox/demo environment**
   - Kalshi may have test environment
   - Verify all endpoints work
   - Test authentication flow

---

## Polymarket-Specific Analysis

### Polymarket Subgraph APIs (Most Promising for Copy Trading)

Polymarket uses **GraphQL Subgraphs** hosted on Goldsky that query on-chain data. These are the most promising for copy trading:

#### 1. Activity Subgraph
- **Endpoint**: `https://api.goldsky.com/api/public/project_cl6mb8i9h0003e201j6li0diw/subgraphs/activity-subgraph/0.0.4/gn`
- **Purpose**: Query trading activity, fills, and user actions
- **Potential Use**: Track user trades, identify top traders
- **Example Query**:
```graphql
query GetUserActivity($user: String!) {
  fills(
    where: { user: $user }
    orderBy: timestamp
    orderDirection: desc
    first: 100
  ) {
    id
    user
    market
    outcome
    price
    amount
    timestamp
  }
}
```

#### 2. PNL Subgraph
- **Endpoint**: `https://api.goldsky.com/api/public/project_cl6mb8i9h0003e201j6li0diw/subgraphs/pnl-subgraph/0.0.14/gn`
- **Purpose**: Calculate user PnL and performance metrics
- **Potential Use**: Build leaderboards, calculate ROI, win rates
- **Example Query**:
```graphql
query GetUserPNL($user: String!) {
  userPNLs(
    where: { user: $user }
    orderBy: timestamp
    orderDirection: desc
  ) {
    user
    realizedPnL
    unrealizedPnL
    totalPnL
    timestamp
  }
}
```

#### 3. Positions Subgraph
- **Endpoint**: `https://api.goldsky.com/api/public/project_cl6mb8i9h0003e201j6li0diw/subgraphs/positions-subgraph/0.0.7/gn`
- **Purpose**: Query user positions across markets
- **Potential Use**: Track what positions users hold
- **Example Query**:
```graphql
query GetUserPositions($user: String!) {
  positions(
    where: { user: $user }
  ) {
    user
    market
    outcome
    size
    averagePrice
  }
}
```

### Polymarket Implementation Strategy

**✅ UPDATED: Using Data API Leaderboard (Recommended)**

**Primary Approach**: Use Polymarket's Data API leaderboard endpoint
- **Endpoint**: `GET https://data-api.polymarket.com/v1/leaderboard`
- **Advantages**: 
  - Official API, more reliable
  - Returns structured leaderboard data
  - Includes username, PnL, volume, profile images
  - No GraphQL schema issues
- **Parameters**:
  - `category`: OVERALL, POLITICS, SPORTS, CRYPTO, etc.
  - `timePeriod`: DAY, WEEK, MONTH, ALL
  - `orderBy`: PNL or VOL
  - `limit`: 1-50
  - `offset`: For pagination

**Secondary Approach**: Use Subgraph for detailed metrics
- Activity Subgraph: For trade history and win rate calculations
- Positions Subgraph: For active markets count
- Only used as fallback/enhancement to leaderboard data

**Implementation Approach**:
```typescript
// lib/api/polymarket-subgraph.ts
import { GraphQLClient } from 'graphql-request'

const ACTIVITY_SUBGRAPH = 'https://api.goldsky.com/api/public/project_cl6mb8i9h0003e201j6li0diw/subgraphs/activity-subgraph/0.0.4/gn'
const PNL_SUBGRAPH = 'https://api.goldsky.com/api/public/project_cl6mb8i9h0003e201j6li0diw/subgraphs/pnl-subgraph/0.0.14/gn'

export async function getTopTradersByPNL(limit: number = 20): Promise<TopTrader[]> {
  const client = new GraphQLClient(PNL_SUBGRAPH)
  
  const query = `
    query GetTopTraders($limit: Int!) {
      userPNLs(
        orderBy: totalPnL
        orderDirection: desc
        first: $limit
      ) {
        user
        totalPnL
        realizedPnL
        timestamp
      }
    }
  `
  
  const data = await client.request(query, { limit })
  // Transform and return top traders
  return transformToTopTraders(data.userPNLs)
}

export async function getUserTradeHistory(userAddress: string): Promise<Trade[]> {
  const client = new GraphQLClient(ACTIVITY_SUBGRAPH)
  
  const query = `
    query GetUserTrades($user: String!) {
      fills(
        where: { user: $user }
        orderBy: timestamp
        orderDirection: desc
        first: 1000
      ) {
        id
        market
        outcome
        price
        amount
        timestamp
      }
    }
  `
  
  const data = await client.request(query, { user: userAddress })
  return data.fills
}
```

### Polymarket CLOB API (Trading)

**Endpoint**: `https://clob.polymarket.com`

**Key Endpoints**:
- `GET /book` - Order book data
- `POST /orders` - Place orders
- `DELETE /orders/{orderId}` - Cancel orders
- `GET /user` - User account info

**Authentication**: Requires API key and signature

```typescript
// lib/api/polymarket-clob.ts
import { ClobClient } from '@polymarket/clob-client'

const client = new ClobClient({
  apiKey: process.env.POLYMARKET_API_KEY!,
  privateKey: process.env.POLYMARKET_PRIVATE_KEY!,
})

export async function placeOrder(order: {
  market: string
  side: 'BUY' | 'SELL'
  price: string
  size: string
}) {
  return await client.createOrder({
    token_id: order.market,
    side: order.side,
    price: order.price,
    size: order.size,
  })
}
```

### Polymarket Gamma API (Market Data)

**Endpoint**: `https://gamma-api.polymarket.com`

**Key Endpoints**:
- `GET /markets` - List markets
- `GET /events` - List events
- `GET /categories` - Market categories

```typescript
export async function getMarkets(params: {
  active?: boolean
  closed?: boolean
  limit?: number
}): Promise<Market[]> {
  const response = await fetch(
    `https://gamma-api.polymarket.com/markets?${new URLSearchParams(params)}`
  )
  return response.json()
}
```

## Recommendation: Polymarket vs Kalshi

### For Copy Trading: **Polymarket is More Promising**

**Why**:
1. ✅ **On-chain data** is potentially queryable via Subgraphs
2. ✅ **PNL Subgraph** can help build leaderboards
3. ✅ **Activity Subgraph** can track user trades
4. ✅ **More open architecture** (blockchain-based)

**However**:
- ⚠️ Still need to verify if user addresses are publicly linkable to usernames
- ⚠️ Privacy features may hide some data
- ⚠️ Requires GraphQL knowledge and Subgraph querying

### For Portfolio Management: **Both Work**

- Kalshi: Cleaner REST API, easier authentication
- Polymarket: More comprehensive, real-time via WebSockets

## Additional Resources

- **Kalshi API Docs**: https://docs.kalshi.com
- **Kalshi SDKs**: https://docs.kalshi.com/sdks/overview
- **Authentication Guide**: https://docs.kalshi.com/getting_started/api_keys
- **Polymarket Docs**: https://docs.polymarket.com
- **Polymarket Subgraph Docs**: https://docs.polymarket.com/developers/subgraph/overview
- **Polymarket CLOB Client**: `npm install @polymarket/clob-client`
- **GraphQL Client**: `npm install graphql-request graphql`

---

## Conclusion

**What we CAN build:**
- Full portfolio dashboard (your own data)
- Market browsing and analysis
- Order execution (your own trades)
- Performance tracking (your own performance)

**What we CANNOT build (without workarounds):**
- Public trader leaderboards
- Automatic copy trading of other users
- Real-time mirroring of other users' trades

**Recommended Path Forward:**
1. Implement all available portfolio features
2. Build opt-in social trading system
3. Or pivot to "portfolio management" + "market analysis" dashboard
4. Consider reaching out to Kalshi for partnership/API access

