/**
 * The English copy is the source of truth: `es.ts` is typed against it, so a
 * missing translation is a build error rather than an English string leaking
 * into the Spanish site. Headings that mix roman and italic are stored as
 * `{ lead, em }` pairs instead of raw HTML.
 */
export const en = {
  meta: {
    siteName: 'AI-built → Real product',
    shortName: 'Real product',
    description:
      'You built it with AI. Get a human product and engineering review before real users, real data and real payments arrive.',
    homeTitle: 'Built with AI. Ready for real life.',
    founderRole: 'Product engineer & full-stack product builder',
    ogImageAlt: 'AI-built. Real product. Ready for what comes next.',
    rssTitle: 'Real product field notes',
    serviceType: 'Product readiness review for AI-built products',
  },
  common: {
    cta: 'Check my product',
    skipToContent: 'Skip to content',
    home: 'Home',
    languageLabel: 'Language',
    pauseMotion: 'Pause motion',
    resumeMotion: 'Resume motion',
  },
  nav: {
    label: 'Main navigation',
    brandHome: 'AI-built to Real product home',
    caption: ['Independent product readiness', 'For the ones who built it.'],
    menu: 'Menu',
    cta: "Let's look at it",
    items: [
      { key: 'realityCheck', label: 'Reality Check' },
      { key: 'learn', label: 'Field notes' },
      { key: 'about', label: 'About' },
    ],
  },
  footer: {
    brand: 'real product.',
    tagline: 'Built for what comes next.',
    human: 'A human on the other side.',
    privacy: 'Privacy',
    terms: 'Terms',
    rss: 'RSS',
  },
  hero: {
    eyebrow: 'AI-built → Real-world ready',
    kicker: 'A new beginning, after the build.',
    title: ['Built with AI.', 'Ready for'],
    titleEm: 'real life.',
    intro: ['You made something that works.', "Let's make sure it works"],
    introStrong: 'out there.',
    secondary: 'What happens in a check',
    note: 'A human review. A clear next move. Still your product.',
    toolsCaption: ['Built with whatever.', 'Ready for whoever.'],
    toolsSuffix: '& everything after.',
  },
  sculpture: {
    index: ['Object 001', 'A work in becoming.'],
    note: ['Separate parts.', 'One real product.'],
    assemble: 'Bring it together',
    separate: 'See the parts',
    assembleLabel: 'Bring the sculpture together',
    separateLabel: 'Separate the sculpture',
    statusPrototype: 'Prototype: separate parts.',
    statusProduct: 'Product: the parts come together.',
    pauseLabel: 'Pause 3D motion',
    resumeLabel: 'Resume 3D motion',
  },
  opening: {
    margin: 'A NOTE TO THE BUILDER',
    title: ['You had an idea.', 'This time,'],
    titleBuilt: 'you built it.',
    aside: ['That’s a', 'big deal.'],
    copy: "AI changed who gets to build. We think that's extraordinary. You made something that works. Now comes the next chapter: letting other people in.",
  },
  scenes: {
    chapter: ['01 / Out in the world', 'A working demo is a beginning.'],
    heading: ['Then reality', 'walks in.'],
    copy: ['Your product meets the things', "you couldn't prompt away."],
    tablist: 'Real-world product moments',
    shiftPerspective: 'Shift perspective',
    frontPerspective: 'Front perspective',
    replay: 'Replay the scene',
    coordinate: 'REAL WORLD / LIVE CONNECTIONS',
    noscript:
      'We also review separation between accounts, payment recovery and visibility when something breaks.',
    noscriptLink: 'Explore the full review.',
    items: [
      {
        name: 'The first stranger.',
        title: 'You are no longer there to explain it.',
        copy: 'Someone opens your product with no context, no instructions and very little patience. Can they find their first useful result?',
        note: 'Follow the journey with a fresh account.',
      },
      {
        name: 'The second account.',
        title: 'Two customers. Two separate worlds.',
        copy: 'A product can look private and still expose the wrong information. We check what a second account can actually see and change.',
        note: 'Check access where the data lives.',
      },
      {
        name: 'The interrupted payment.',
        title: 'Paid. But did the product catch up?',
        copy: 'Checkout is only part of the story. The payment can succeed while access fails, or the same event can arrive twice. Recovery matters.',
        note: 'Trace the handoff, including the unhappy path.',
      },
      {
        name: 'The unexpected Tuesday.',
        title: 'Something breaks. Who notices?',
        copy: 'An expired key. A slow dependency. A release that changes a small assumption. We look for enough visibility to understand what happened.',
        note: 'Make failure visible and recovery possible.',
      },
    ],
  },
  bench: {
    chapter: ['02 / On the workbench', 'One product. The whole picture.'],
    heading: ['A second set', 'of'],
    headingEm: 'eyes.',
    copy: 'We follow the experience into the code, the data and the way it runs. Always in the context of your next release.',
    indexLabel: 'THE SEVEN LENSES',
    indexCopy: ['Small details.', 'Connected consequences.'],
    indexLink: 'Inside the Reality Check',
    evidence: 'FOLLOW THE EVIDENCE',
  },
  coverage: [
    {
      category: 'Product',
      title: 'Can someone use it without you?',
      description:
        'We follow the core journey from a fresh account. Onboarding, empty states, broken states and the moments where a user needs a way back.',
    },
    {
      category: 'Engineering',
      title: 'Can you keep building on it?',
      description:
        'We trace the important logic through the code. Boundaries, duplicated assumptions and fragile dependencies matter more than cosmetic cleanup.',
    },
    {
      category: 'Data',
      title: 'Is the right data in the right hands?',
      description:
        'We examine data structure, access rules, environment separation and recovery. Obvious exposure is flagged; specialist security work is scoped separately.',
    },
    {
      category: 'Access',
      title: 'Does every role stay in its lane?',
      description:
        'Sign up, sign in, password reset, sessions and server-side authorization. We try a second account, not just the happy path.',
    },
    {
      category: 'Payments',
      title: 'What happens when checkout goes sideways?',
      description:
        'Where payments apply: failed checkout, webhook handling, duplicate events, subscription state changes and the link between payment and access.',
    },
    {
      category: 'Production',
      title: 'Will you know when something breaks?',
      description:
        'Deployment, configuration, errors, logs, external dependencies and backup expectations. Enough visibility to operate your next stage.',
    },
    {
      category: 'Performance',
      title: 'Does it feel ready on a real phone?',
      description:
        'Loading, page weight, font and image delivery, unnecessary scripts and key journeys on smaller screens. Search basics where discovery matters.',
    },
  ],
  report: {
    ariaLabel: 'Illustrative Reality Check report',
    top: 'Reality report',
    badge: 'Illustrative example',
    statusLabel: 'Your next move',
    statusTitle: 'Ship after fixes.',
    statusHint:
      'The core journey works. Fix access and payment recovery first.',
    bottom: 'Priorities. Evidence. A clear next step.',
    blocker: 'Blocker',
    fixSoon: 'Fix soon',
    fineForNow: 'Fine for now',
    rows: [
      'Another account can open a private project',
      'Failed checkout has no recovery path',
      "Errors don't reach anyone",
      'Onboarding gets a new user to value',
    ],
  },
  reportChapter: {
    chapter: ['03 / What you leave with', 'Less noise. A next move.'],
    heading: ['Clarity,'],
    headingEm: 'in your hands.',
    copy: [
      'A short, prioritised report. What blocks your next release, what to fix soon, and what is already good enough.',
      'Every finding comes with evidence and a next action. Use it yourself, with AI, or with us.',
    ],
    link: 'Get a clear next move',
    deskAnnotation: 'AN EXAMPLE / EXPLORE THE PRIORITIES',
    filterLabel: 'Explore example priorities',
    filterAll: 'The whole picture',
    filterBlockers: 'Launch blockers',
    hint: 'Open a finding to see the thinking behind it.',
  },
  human: {
    question: 'A FAIR QUESTION',
    title: ["“Couldn't I", 'just ask'],
    titleEm: 'AI?”',
    answer: ['Absolutely.', 'We do too.'],
    copy: 'The hard part is deciding which answer matters for your product, your users and your next launch. Someone needs to test the assumptions, follow the evidence and stand behind the recommendation.',
    signoff: 'THE HUMAN BEHIND REAL PRODUCT',
    link: 'Meet the person behind the check',
  },
  path: {
    chapter: ['04 / From here, forward', 'Still your product. Always.'],
    heading: ['One check.'],
    headingEm: 'A way forward.',
    copy: [
      'First product? First users? First paying customers?',
      "This is the moment we're here for.",
    ],
    steps: [
      {
        label: 'UNDERSTAND',
        title: 'Reality Check',
        titleEm: '',
        copy: 'Show us what you’ve built. We agree the scope and fee, review the product, then walk you through a short, prioritised report.',
        link: 'Start with a check',
      },
      {
        label: 'MAKE IT READY / OPTIONAL',
        title: 'Reality Sprint',
        titleEm: '',
        copy: 'Want help with the fixes? We agree a focused scope, work through the important issues and verify the changes.',
        link: 'Explore a sprint',
      },
      {
        label: 'KEEP GOING',
        title: 'Ship.',
        titleEm: 'Keep building.',
        copy: 'Take the next step knowing what works, what needs attention and what can wait.',
        link: '',
      },
    ],
  },
  journal: {
    label: 'THE FIELD NOTES',
    heading: ['A little more'],
    headingEm: 'perspective.',
    link: 'Open the library',
  },
  closing: {
    eyebrow: 'The next step is a small one.',
    title: ['You built it.', "Let's see if it's ready."],
  },
  about: {
    title: 'About Víctor Andújar and Real product',
    description:
      'Meet the product engineer behind Real product. Human judgement for founders who built with AI and are preparing for real users.',
    eyebrow: 'The human behind the check',
    h1: ['More people can build.', "That's a good thing."],
    h2: ['Product thinking.', 'Engineering judgement.'],
    body: [
      'I build digital products, from the experience people see to the systems that make it work.',
      'AI has opened that process to far more people. Founders can explore an idea, build something useful and learn from it without assembling a whole team first.',
      "I want more of those products to make it into people's hands.",
    ],
    wheelTitle: 'You keep the wheel.',
    wheelBody: [
      'Real product exists for the stage after the first working version. When you need to know whether a stranger can use it, whether access rules hold up and whether the important flows recover when something goes wrong.',
      'My job is to look carefully, explain what I find and help you decide what to do next. Sometimes that means fixing something. Sometimes it means leaving it alone.',
    ],
    expectTitle: 'What you can expect',
    expect: [
      'Evidence you can inspect.',
      'Clear language and honest limits.',
      'Priorities that match your next step.',
      'A product that stays yours.',
    ],
  },
  realityCheck: {
    title: 'Reality Check for your AI-built product',
    description:
      'A focused human review of your AI-built product: user journeys, data, access, payments and production. Leave with evidence and a clear next move.',
    breadcrumb: 'Reality Check',
    eyebrow: 'A human review. A practical answer.',
    h1: ['Ready for real users?', "Let's find out."],
    lead: "You've built the product. The Reality Check helps you understand whether it's ready for the next thing you want to do.",
    lookEyebrow: 'What we look at',
    lookTitle: ['The product.', 'Not just the code.'],
    lookCopy:
      'We agree the important journeys and risks before reviewing. A tiny beta and a product taking payments need different levels of confidence.',
    lookNotice:
      'This is a product and engineering review. It is not a penetration test, security certification or guarantee against every failure. Specialist concerns get a clear referral.',
    getEyebrow: 'What you get',
    getTitle: ['Evidence.', 'Priorities.', 'Your next move.'],
    getLead:
      'A concise report and a walkthrough of the findings. Each issue includes how we found it, why it matters and what to do next.',
    getList: [
      { term: 'Blockers:', copy: 'address before the agreed next step.' },
      { term: 'Fix soon:', copy: 'schedule after the blockers.' },
      { term: 'Fine for now:', copy: 'keep what works.' },
    ],
    outcomes: [
      'Ship',
      'Ship after fixes',
      'Keep testing',
      'Rethink foundation',
    ],
    scopeEyebrow: 'Scope before commitment',
    scopeTitle: ['Start with', "what you've built."],
    priceLabel: 'Reality Check',
    priceUnset: 'A fee agreed before we begin.',
    scopeCopy:
      "Submit your product and what's coming next. We'll review the fit, then agree the scope, timeline and fee with you. Sending a request does not start a paid engagement.",
    sprintTitle: 'Need help fixing it?',
    sprintCopy:
      'The optional Reality Sprint turns the priorities into a focused piece of work. You can also take the report and make the changes yourself.',
    sprintLink: 'Ask about a Reality Sprint',
    faqTitle: ['A few useful', 'answers.'],
    faq: [
      {
        q: 'Do I need to share my repository?',
        a: 'Not to start. A product URL and a short description are enough for the initial conversation. If code access is needed, we agree a suitable way to share it. Never send passwords or API keys in the form.',
      },
      {
        q: 'Will you tell me to rebuild everything?',
        a: 'Only if the evidence supports that decision. We focus on the smallest useful set of changes for your next stage.',
      },
      {
        q: 'Can I keep building with AI?',
        a: 'Yes. The findings should help you ask better questions, test the right things and keep ownership of your product.',
      },
      {
        q: 'How long does it take?',
        a: 'We agree a timeline once we understand the size of the product and the journeys to review. There is no automatic audit running behind this form.',
      },
    ],
  },
  learn: {
    title: 'Field notes for AI builders',
    description:
      'Practical guides to launching an AI-built product: production readiness, launch checks and the things that change when real users arrive.',
    eyebrow: 'Field notes / Before you ship',
    h1: ['Less guesswork.', 'More ready.'],
    lead: 'Practical notes for the space between “it works” and “people are using it”.',
    breadcrumb: 'Field notes',
    articleCtaTitle: 'Want a second set of eyes?',
    articleCtaCopy:
      'A Reality Check applies this thinking to your product and your next stage.',
    backToNotes: 'More field notes',
    empty: 'New field notes are on the way.',
  },
  notFound: {
    title: 'Page not found',
    eyebrow: '404 / A small detour',
    h1: ['This page', "isn't here."],
    lead: "Let's get you back to something useful.",
    backHome: 'Back to the start',
    readNotes: 'Read the field notes',
  },
  check: {
    title: 'Start your Reality Check',
    description:
      'Show us your AI-built product and what comes next. Request a focused human review before launch.',
    eyebrow: 'The Reality Check',
    h1: ['You built it.', "Let's"],
    h1Em: 'look at it.',
    lead: [
      'Tell us a little about your product.',
      "We'll take it from there, together.",
    ],
    facts: ['About 3 minutes', 'No payment required'],
    founderNote:
      "I read every request. If it's a fit, we'll agree the scope, timing and fee before starting any work.",
    privacyNote: [
      'A product link is enough to start.',
      'Keep passwords, keys and customer data private.',
    ],
    compassCaption: 'A clearer picture, one step at a time.',
    compassNodes: { product: 'PRODUCT', context: 'CONTEXT', human: 'YOU' },
  },
  form: {
    noscript:
      'Enable JavaScript to complete the request. Your details are only sent when you choose Send my request.',
    progressLabel: 'Request progress',
    stepAria: [
      'Step 1: Your product',
      'Step 2: Your next step',
      'Step 3: Your details',
    ],
    stepNames: ['Your product', 'Your next step', 'Your details'],
    guidance: [
      'Three small steps. Start with your product.',
      'A little context helps us focus the review.',
      'One last step. Review your brief and leave your email.',
    ],
    briefCaptions: [
      '01 — Start with what you built.',
      '02 — Give it a direction.',
      '03 — Put a person behind it.',
    ],
    legends: [
      'First, your product.',
      'Where are you headed?',
      "Let's put a name to it.",
    ],
    captions: [
      'The thing you made. And who you made it for.',
      'So we can focus on what matters for your next step.',
      'A real person will reply to you. No mailing lists.',
    ],
    labels: {
      productUrl: 'Product URL',
      description: 'What does your product do?',
      tool: 'What did you build it with?',
      users: 'Do you already have users?',
      payments: 'Taking payments?',
      data: 'Handles customer or personal data?',
      next: 'What are you planning next?',
      uncertainty: 'What are you most unsure about?',
      repository: 'Repository URL',
      optional: '(optional)',
      name: 'Your name',
      email: 'Email',
      honeypot: 'Leave this field empty',
    },
    hints: {
      productUrl: 'A live link or a publicly accessible preview.',
      repository:
        'No access needed yet. Never include passwords, keys or customer records.',
      free: 'Sending this request is free. We agree any paid work with you first.',
    },
    placeholders: {
      productUrl: 'https://your-product.com',
      description: 'Who is it for? What does it help them do?',
      uncertainty: "The thing you'd like a second pair of eyes on.",
    },
    chooseTool: 'Choose your main tool',
    chooseOne: 'Choose one',
    options: {
      users: ['No', 'Beta users', 'Yes'],
      payments: ['No', 'Soon', 'Yes'],
      data: ['Yes', 'No', 'Not sure'],
      next: [
        'Private testing',
        'Public beta',
        'Launch',
        'Start charging',
        'Scale existing users',
        'Other',
      ],
    },
    brief: 'Your brief',
    editBrief: 'Edit details',
    consent: {
      before: 'I have read the ',
      link: 'privacy notice',
      after: ' and agree to be contacted about this request.',
    },
    errorTitle: "Let's check that.",
    sending: 'Sending your request. Please keep this tab open.',
    back: 'Back',
    continue: 'Continue',
    submit: 'Send my request',
    success: {
      eyebrow: 'Safely on the other side.',
      title: ['Got it.', "Now it's our turn."],
      body: {
        before:
          'Your request is in. Víctor will review the product and reply to ',
        fallback: 'the email you shared',
        after: '.',
      },
      nextTitle: 'What happens next?',
      nextCopy:
        'A conversation about fit, scope and timing. No paid work starts without your agreement.',
      link: "A little clarity while you're here",
    },
  },
  legal: {
    eyebrow: 'Real product / Legal',
    updated: 'Last updated:',
  },
} as const;

export type Dictionary = typeof en;
