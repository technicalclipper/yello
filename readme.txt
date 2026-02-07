PROJECT SPECIFICATION – YELLO
App Name

Yello

One-Line Description

Yello is a paid, calm random video chat application where users lock a small session balance, interact via live WebRTC video, and gradually earn behavior-based reputation tags and fee discounts over time. Payments and session accounting are handled using Yellow Network’s session-based off-chain settlement.

Current Pages (Already Built)

/landing

/match

/call

/summary

Note: /landing contains the Connect Wallet button.

Core Problem Being Solved

Traditional random video chat platforms failed due to:

No cost for spam/bots

Instant skipping and shallow interactions

No way to reward good users

Over-moderation or zero moderation

No sustainable monetization

Yello introduces a light economic layer to naturally improve interaction quality without ratings, reports, or social punishment.

Core Product Principles

No profiles

No ratings

No reporting / slashing

No usernames required

Wallet = anonymous identity anchor

Reputation emerges only from actual usage

Paying unlocks calm, not power

High-Level User Flow

User opens /landing

User clicks Connect Wallet

User locks a fixed session amount (e.g. 5 USDC)

User is routed to /match

User is matched with another user

User enters /call for live video chat

Session timer runs and balance decreases

User ends the session

User sees /summary with session stats

Page Responsibilities (High Level)
/landing

App introduction

Connect Wallet button

/match

Waiting / matching UI

No user interaction required

/call

Live 1-to-1 video (WebRTC)

Session timer

Session balance display

End session button

/summary

Session duration

Amount spent

Amount returned

Button to return to landing

Technology Stack
Frontend

Next.js

Client-side components for WebRTC

Routing already implemented for existing pages

Real-Time Video

WebRTC (1-to-1 only)

Camera + microphone

No group calls

Signaling & Matching

Socket.io or WebSocket

Simple queue-based matching:

First user waits

Second user matches

Room created

WebRTC signaling begins

Payment & Session Accounting (Yellow Network)
Why Yellow Is Used

Yello requires:

Per-second or per-minute charging

Zero gas during live sessions

Trustless final settlement

Smooth Web2-like UX

This is not feasible with on-chain transactions alone.

Yellow Usage Model (Important Clarification)

Although Yellow documentation often describes two-party state channels, Yello uses Yellow as a session-based accounting layer:

User = one party

Application (Yello) = counterparty

The user is the only payer.
No peer-to-peer payments are required.

This is a valid Yellow use case because Yellow supports:

Off-chain balance updates

Application-defined state transitions

On-chain settlement at session end

Payment Flow

User connects wallet on /landing

User locks a fixed amount (e.g. 5 USDC) on-chain

Yellow session (state channel) is opened

Session usage is tracked off-chain

Balance decreases during /call

No on-chain transactions during session

Session ends

Final signed state is submitted on-chain

Remaining balance is returned to the user

User can never spend more than the locked amount.

Pricing Model
Base Cost

Fixed base rate (example):

0.0005 eth / minute

Reputation Tags (Behavior-Based)
Core Idea

Yello does not use ratings or reviews.

Instead, tags are automatically assigned based on long-term session usage.

Tags summarize observable behavior, not opinions.

Raw Metrics Used

Average session duration

Early disconnect rate

Sessions per week

Time-of-day consistency

Camera/mic usage ratio

No chat content is analyzed or stored.

Example Tags

Stays Longer

Low Skipper

Consistent

Night Regular

Camera Friendly

Progressive Trust Discounts

Each tag unlocks a small permanent discount on session cost.

Example:

Each tag → –5%

Maximum discount cap → 25–30%

Price never reaches zero

This creates:

Long-term reward for real users

Natural bot resistance

Sustainable economics

Bot Resistance (Passive)

Bots are not blocked explicitly.

Instead:

Bots pay full base price

Bots struggle to earn tags

Bots churn due to cost

Real users become cheaper over time

This is economic selection, not moderation.

On-Chain Data Storage

Only lightweight, non-sensitive data is stored:

Wallet address

Earned tag identifiers

Optional counters / confidence scores

No:

Video data

Audio data

Message content

Personal information

ENS Integration (Optional)

If a user owns an ENS name:

ENS is displayed instead of wallet address

Tags can optionally be linked to ENS text records

ENS is optional and used only for:

Human-readable identity

Reputation portability

What This Project Is NOT

Not a dating app

Not a social network

Not a moderation system

Not a rating platform

Not a token-gated community

Core Value Proposition

Pay a little. Waste less time.
Good behavior compounds.

Key Differentiator (Judge-Friendly)

“Instead of letting users rate each other, Yello lets reputation quietly emerge from real session behavior — and anchors it to wallets using session-based settlement.”