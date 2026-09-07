export const coverage = [
  [
    'Product',
    'Can someone use it without you?',
    'We follow the core journey from a fresh account. Onboarding, empty states, broken states and the moments where a user needs a way back.',
  ],
  [
    'Engineering',
    'Can you keep building on it?',
    'We trace the important logic through the code. Boundaries, duplicated assumptions and fragile dependencies matter more than cosmetic cleanup.',
  ],
  [
    'Data',
    'Is the right data in the right hands?',
    'We examine data structure, access rules, environment separation and recovery. Obvious exposure is flagged; specialist security work is scoped separately.',
  ],
  [
    'Access',
    'Does every role stay in its lane?',
    'Sign up, sign in, password reset, sessions and server-side authorization. We try a second account, not just the happy path.',
  ],
  [
    'Payments',
    'What happens when checkout goes sideways?',
    'Where payments apply: failed checkout, webhook handling, duplicate events, subscription state changes and the link between payment and access.',
  ],
  [
    'Production',
    'Will you know when something breaks?',
    'Deployment, configuration, errors, logs, external dependencies and backup expectations. Enough visibility to operate your next stage.',
  ],
  [
    'Performance',
    'Does it feel ready on a real phone?',
    'Loading, page weight, font and image delivery, unnecessary scripts and key journeys on smaller screens. Search basics where discovery matters.',
  ],
] as const;
