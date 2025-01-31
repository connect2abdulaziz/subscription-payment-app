# subscription-payment-app
subscription-payment-app/
├── .env.local                    # Environment variables
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
│
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout
│   │   ├── page.tsx             # Home page
│   │   ├── success/
│   │   │   └── page.tsx         # Success page after payment
│   │   ├── cancel/
│   │   │   └── page.tsx         # Cancel page for failed/cancelled payments
│   │   └── api/
│   │       ├── webhooks/
│   │       │   └── route.ts     # Stripe webhook handler
│   │       ├── create-checkout-session/
│   │       │   └── route.ts     # Checkout session creation
│   │       └── subscription-status/
│   │           └── route.ts     # Check subscription status
│   │
│   ├── components/
│   │   ├── ui/                  # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   └── alert-dialog.tsx
│   │   └── subscription/
│   │       ├── subscription-plans.tsx    # Main subscription component
│   │       ├── plan-card.tsx            # Individual plan card
│   │       └── feature-list.tsx         # Plan features list
│   │
│   ├── lib/
│   │   ├── stripe/
│   │   │   ├── config.ts       # Stripe configuration
│   │   │   └── utils.ts        # Stripe helper functions
│   │   └── types/
│   │       └── subscription.ts  # Type definitions
│   │
│   ├── config/
│   │   └── subscription-plans.ts # Plan configurations
│   │
│   └── utils/
│       └── api-helpers.ts       # API helper functions
│
└── public/
    └── images/
        └── plans/              # Plan-related images
