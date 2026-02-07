# YELLO - Implementation Plan

## 📋 Current State Analysis

### ✅ What's Already Built

1. **UI Pages (All 4 pages exist with basic structure)**
   - `/landing` - Landing page with Connect Wallet button (non-functional)
   - `/match` - Matching/waiting page with animations
   - `/call` - Video call page with UI (no actual WebRTC)
   - `/summary` - Session summary page with mock data

2. **UI Components**
   - Navbar with session time/balance display
   - StakeModal for amount selection
   - Various UI components (buttons, cards, animations)

3. **Frontend Stack**
   - Next.js 16.1.6
   - React 19.2.3
   - Tailwind CSS
   - GSAP animations
   - TypeScript

### ❌ What's Missing (Critical Gaps)

---

## 🔧 IMPLEMENTATION REQUIREMENTS

### 1. **Web3/Wallet Integration** ⚠️ CRITICAL

**Status:** Not implemented - "Connect Wallet" button is just UI

**What to Build:**
- [ ] Install Web3 libraries (wagmi + viem recommended, or ethers.js)
- [ ] Wallet connection provider/context
- [ ] Connect Wallet button functionality
- [ ] Wallet address display in Navbar
- [ ] Network switching (if needed)
- [ ] Wallet state persistence

**Dependencies to Add:**
```json
{
  "wagmi": "^2.x",
  "viem": "^2.x",
  "@tanstack/react-query": "^5.x"
}
```

**Files to Create/Modify:**
- `lib/wallet-provider.tsx` - Wallet context provider
- `components/Navbar.tsx` - Add wallet connection logic
- `app/layout.tsx` - Wrap with wallet provider

---

### 2. **Yellow Network Integration** ⚠️ CRITICAL

**Status:** Not implemented - No Yellow SDK integration

**What to Build:**

#### 2.1 Yellow SDK Setup
- [ ] Install Yellow Network SDK
- [ ] Configure Yellow Network connection
- [ ] Set up application counterparty account
- [ ] Initialize Yellow session manager

#### 2.2 On-Chain Locking (StakeModal)
- [ ] Modify `StakeModal.tsx` to:
  - Connect to user's wallet
  - Lock specified amount (e.g., 5 USDC) on-chain
  - Open Yellow state channel session
  - Store session ID and state

#### 2.3 Off-Chain Balance Tracking
- [ ] Create session balance manager
- [ ] Track per-second/per-minute usage
- [ ] Update balance in real-time during `/call`
- [ ] Calculate cost based on:
  - Base rate (0.0005 ETH/minute)
  - User's reputation discount (if tags exist)

#### 2.4 Session Settlement
- [ ] On session end (`/summary`):
  - Calculate final used amount
  - Sign final state with user
  - Submit to Yellow Network on-chain
  - Return remaining balance to user
  - Close state channel

**Dependencies to Add:**
```json
{
  "@yellow-network/sdk": "^x.x.x" // Check Yellow docs for actual package
}
```

**Files to Create:**
- `lib/yellow-session.ts` - Yellow session manager
- `lib/yellow-balance.ts` - Balance tracking logic
- `lib/yellow-settlement.ts` - Settlement logic
- `hooks/useYellowSession.ts` - React hook for session state

**Files to Modify:**
- `components/StakeModal.tsx` - Add actual locking logic
- `app/call/page.tsx` - Integrate balance tracking
- `app/summary/page.tsx` - Add settlement logic

---

### 3. **Backend Server (Signaling & Matching)** ⚠️ CRITICAL

**Status:** Does not exist - Need to create from scratch

**What to Build:**

#### 3.1 Server Setup
- [ ] Create backend server (Node.js + Express or Next.js API routes)
- [ ] Install Socket.io server
- [ ] Set up WebSocket connection handling
- [ ] Configure CORS for client connection

#### 3.2 Matching System
- [ ] User queue management
- [ ] Matching algorithm:
  - First user waits in queue
  - Second user matches immediately
  - Create unique room ID
  - Notify both users
- [ ] Handle user disconnection during matching
- [ ] Handle queue timeout

#### 3.3 WebRTC Signaling Server
- [ ] Handle WebRTC offer/answer exchange
- [ ] Handle ICE candidate exchange
- [ ] Relay signaling messages between peers
- [ ] Manage room state (connected/disconnected)

**Technology Choice:**
- Option A: Next.js API Routes + Socket.io
- Option B: Separate Node.js/Express server

**Files to Create:**
- `server/index.ts` or `app/api/socket/route.ts` - Socket.io server
- `server/matching.ts` - Matching queue logic
- `server/rooms.ts` - Room management
- `server/signaling.ts` - WebRTC signaling handlers

**Dependencies to Add:**
```json
{
  "socket.io": "^4.x",
  "socket.io-client": "^4.x"
}
```

---

### 4. **WebRTC Video Streaming** ⚠️ CRITICAL

**Status:** UI exists, but no actual video streaming

**What to Build:**

#### 4.1 Media Access
- [ ] Request camera/microphone permissions
- [ ] Get user media streams
- [ ] Handle permission denial gracefully
- [ ] Display local video stream in PIP

#### 4.2 Peer Connection Setup
- [ ] Create RTCPeerConnection
- [ ] Configure STUN/TURN servers (for NAT traversal)
- [ ] Add local media tracks to peer connection
- [ ] Handle remote stream reception

#### 4.3 Signaling Integration
- [ ] Connect to Socket.io server
- [ ] Send WebRTC offer when matched
- [ ] Handle incoming answer
- [ ] Exchange ICE candidates
- [ ] Handle connection state changes

#### 4.4 Video Display
- [ ] Replace placeholder with actual `<video>` elements
- [ ] Display remote video stream
- [ ] Display local video in PIP
- [ ] Handle video/audio mute/unmute
- [ ] Handle stream ending/disconnection

**Files to Create:**
- `lib/webrtc.ts` - WebRTC utilities
- `hooks/useWebRTC.ts` - React hook for WebRTC
- `hooks/useMediaStream.ts` - React hook for media access

**Files to Modify:**
- `app/call/page.tsx` - Replace placeholder with real video
- `app/match/page.tsx` - Connect to matching server

**Dependencies to Add:**
```json
{
  "socket.io-client": "^4.x"
}
```

---

### 5. **Session Management** ⚠️ IMPORTANT

**Status:** Partially implemented (mock timers)

**What to Build:**

#### 5.1 Session State
- [ ] Create session context/state management
- [ ] Track session lifecycle:
  - Created (after locking)
  - Matching
  - In call
  - Ended
- [ ] Persist session state (localStorage/sessionStorage)

#### 5.2 Timer Integration
- [ ] Real-time session timer
- [ ] Sync timer with Yellow balance tracking
- [ ] Update balance display in Navbar
- [ ] Handle session timeout (balance depleted)

#### 5.3 Session End Flow
- [ ] Capture session metrics:
  - Duration
  - Amount used
  - Amount returned
- [ ] Trigger Yellow settlement
- [ ] Navigate to summary with real data

**Files to Create:**
- `lib/session-manager.ts` - Session state management
- `contexts/SessionContext.tsx` - React context for session
- `hooks/useSession.ts` - React hook for session

**Files to Modify:**
- `app/call/page.tsx` - Use real session state
- `app/summary/page.tsx` - Display real session data
- `components/Navbar.tsx` - Real-time balance updates

---

### 6. **Reputation System** 📝 FUTURE (Phase 2)

**Status:** Not implemented - Can be built later

**What to Build (Future):**
- [ ] Behavior tracking during sessions
- [ ] Tag assignment algorithm
- [ ] On-chain tag storage (lightweight)
- [ ] Discount calculation based on tags
- [ ] ENS integration (optional)

**Note:** This can be implemented after core functionality works.

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    CLIENT (Next.js)                      │
├─────────────────────────────────────────────────────────┤
│  Pages: /landing → /match → /call → /summary            │
│                                                           │
│  Features:                                                │
│  ├─ Web3/Wallet (wagmi + viem)                          │
│  ├─ Yellow Integration (SDK)                            │
│  ├─ WebRTC Client (Socket.io client)                    │
│  └─ Session Management                                   │
└─────────────────────────────────────────────────────────┘
                          ↕ WebSocket
┌─────────────────────────────────────────────────────────┐
│              BACKEND SERVER (Node.js)                    │
├─────────────────────────────────────────────────────────┤
│  Features:                                                │
│  ├─ Socket.io Server                                     │
│  ├─ Matching Queue                                       │
│  ├─ Room Management                                      │
│  └─ WebRTC Signaling Relay                               │
└─────────────────────────────────────────────────────────┘
                          ↕
┌─────────────────────────────────────────────────────────┐
│              YELLOW NETWORK (Blockchain)                 │
├─────────────────────────────────────────────────────────┤
│  ├─ On-chain locking                                     │
│  ├─ Off-chain state channel                             │
│  └─ On-chain settlement                                 │
└─────────────────────────────────────────────────────────┘
```

---

## 📦 Implementation Priority

### Phase 1: Core Infrastructure (Week 1)
1. ✅ Web3/Wallet Integration
2. ✅ Backend Server Setup
3. ✅ Basic Matching System

### Phase 2: Video & Yellow (Week 2)
4. ✅ WebRTC Video Streaming
5. ✅ Yellow Network Integration
6. ✅ Session Management

### Phase 3: Polish & Testing (Week 3)
7. ✅ Error Handling
8. ✅ Edge Cases
9. ✅ Testing

### Phase 4: Future Enhancements
10. ⏳ Reputation System
11. ⏳ ENS Integration

---

## 🔍 Key Technical Decisions Needed

1. **Backend Architecture:**
   - Use Next.js API Routes or separate server?
   - Recommendation: Separate server for better scalability

2. **Yellow Network SDK:**
   - Need to research actual Yellow Network SDK/API
   - May need to check Yellow Network documentation

3. **STUN/TURN Servers:**
   - Use free services (Google STUN) or paid TURN?
   - Recommendation: Start with free STUN, add TURN if needed

4. **State Management:**
   - Context API or Zustand/Jotai?
   - Recommendation: Context API for simplicity

---

## 📝 Next Steps

1. **Research Yellow Network SDK** - Find official documentation and SDK
2. **Set up Web3 integration** - Install and configure wagmi/viem
3. **Create backend server** - Set up Socket.io server
4. **Implement matching** - Build queue system
5. **Add WebRTC** - Implement video streaming
6. **Integrate Yellow** - Connect payment flow
7. **Test end-to-end** - Full user flow testing

---

## ⚠️ Important Notes

- **Yellow Network SDK:** Need to verify actual package name and API
- **USDC vs ETH:** Spec mentions 5 USDC but example shows ETH - clarify which token
- **Backend Hosting:** Need to decide where to host signaling server
- **Environment Variables:** Will need:
  - Yellow Network API keys/endpoints
  - Wallet provider RPC URLs
  - Socket.io server URL
  - STUN/TURN server credentials (if using paid)

