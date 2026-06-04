import { Service, Practitioner, BlogPost } from './types';

export const SERVICES_DATA: Service[] = [
  {
    id: 'individual-therapy',
    title: 'Individual Counseling',
    description: 'Explore personal hurdles, anxiety, or depression in a safe, confidential environment designed for self-discovery and healing.',
    longDescription: 'Our individual therapy sessions offer a deeply personalized space to unpack complex emotions, identify negative behavioral patterns, and cultivate sustainable coping strategies. We integrate evidence-based modalities like Cognitive Behavioral Therapy (CBT) and Acceptance and Commitment Therapy (ACT) to guide you toward a more resilient and meaningful life alignment.',
    duration: '50 Min',
    price: '$150',
    icon: 'User',
    benefits: [
      'Understand core emotional and behavioral patterns',
      'Develop evidence-based distress tolerance techniques',
      'Navigate major life transitions with structured support',
      'Address roots of clinical depression, anxiety, and trauma'
    ],
    techniques: [
      'Cognitive Behavioral Therapy (CBT)',
      'Acceptance and Commitment Therapy (ACT)',
      'Schema Therapy',
      'Internal Family Systems (IFS) informed parts work'
    ]
  },
  {
    id: 'couples-therapy',
    title: 'Couples & Relationship Therapy',
    description: 'Rebuild communication channels, resolve recurring conflicts, and foster emotional intimacy with structured marital guidance.',
    longDescription: 'Relationships are complex systems that sometimes require professional calibration. Utilizing elements from the Gottman Method and Emotionally Focused Therapy (EFT), we assist couples in dismantling destructive patterns of criticism or stonewalling. We aim to construct an atmosphere of mutual empathy and deep respect.',
    duration: '60 Min',
    price: '$180',
    icon: 'Users',
    benefits: [
      'Construct healthy, clarifying communication models',
      'De-escalate chronic relationship cycles and triggers',
      'Restore deep psychological safety and intimacy',
      'Navigate difficult decisions in a structured, safe setting'
    ],
    techniques: [
      'Gottman Method Couple Therapy',
      'Emotionally Focused Therapy (EFT)',
      'Nonviolent Communication framework',
      'Attachment-based relational healing'
    ]
  },
  {
    id: 'mindfulness-counseling',
    title: 'Mindfulness & Stress Resilience',
    description: 'Incorporate somatic mindfulness techniques to regulate your nervous system, navigate burnout, and ground yourself.',
    longDescription: 'Chronic stress can lead to nervous system exhaustion and physical depletion. Our somatic and mindfulness-informed therapy merges modern neuroscience with classic grounding practices. Together, we will build a tailored set of sensory mindfulness tools to calm physiological panic, restore emotional regulation, and alleviate burnout.',
    duration: '50 Min',
    price: '$140',
    icon: 'Brain',
    benefits: [
      'Incorporate mindful somatic presence into daily routines',
      'Regulate high adrenaline and cortisol physical triggers',
      'Prevent severe professional and emotional burnout',
      'Improve physiological sleep and attention span'
    ],
    techniques: [
      'Mindfulness-Based Stress Reduction (MBSR)',
      'Somatic Experiencing (SE) techniques',
      'Vagus Nerve regulation exercises',
      'Guided breathwork & progressive relaxation'
    ]
  },
  {
    id: 'adolescent-therapy',
    title: 'Adolescent & Young Adult Care',
    description: 'Support older children and young adults navigating identity exploration, peer anxiety, and academic overwhelm.',
    longDescription: 'Transitioning into adulthood is marked by rapid neurological and social modifications. We offer teenage and student clients (ages 14-25) a non-judgmental space to navigate identity questions, social media pressures, perfectionism, and school performance anxiety. We aim to empower youth with autonomous self-esteem and healthy boundaries.',
    duration: '50 Min',
    price: '$145',
    icon: 'Compass',
    benefits: [
      'Develop emotional expression and literacy',
      'Curb self-critical perfectionism and social anxiety',
      'Co-create constructive boundary strategies with parents',
      'Establish robust personal identity and self-trust'
    ],
    techniques: [
      'Compassion-Focused Therapy',
      'Expressive art and narrative therapy approaches',
      'Dialectical Behavior Therapy (DBT) skills training',
      'Strength-based developmental counseling'
    ]
  }
];

export const PRACTITIONERS: Practitioner[] = [
  {
    name: 'Dr. Evelyn Sinclair, Psy.D.',
    role: 'Clinical Psychologist & Founder',
    bio: 'Dr. Sinclair has over 12 years of experience in clinical cognitive therapy. She specializes in integrating somatic mindfulness with Evidence-Based Practices to treat severe anxiety, grief, and life transitions. Her focus is on restoring client autonomy through warm, direct guidance.',
    specialties: ['Anxiety Disorders', 'Nervous System Somatic Regulation', 'Existential Life Transitions'],
    education: [
      'Psy.D. in Clinical Psychology - Stanford University',
      'M.S. in Somatic Psychology - Naropa University',
      'Licensed Clinical Psychologist (No. 4088921)'
    ],
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=450'
  },
  {
    name: 'Marcus Vance, LCSW',
    role: 'Certified Gottman Relationship Clinician',
    bio: 'Marcus Vance is a dedicated systemic relationship therapist. With extensive training in Gottman principles and Attachment theory, Marcus walks alongside couples struggling with emotional breakdown, communication gridlock, or complex trust repair.',
    specialties: ['Couples Counseling', 'Attachment Healing', 'Communication Repair'],
    education: [
      'Master of Social Work (MSW) - Columbia University',
      'B.S. in Human Development - Cornell University',
      'Gottman Method Couples Therapy - Level 3 Academic Track'
    ],
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400&h=450'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'understanding-nervous-system',
    title: 'Anatomy of Calm: Understanding Somatic Nervous System Regulation',
    summary: 'Discover how your body interprets chronic everyday stressors and learn three sensory somatic shifts to instantly soothe overwhelm.',
    content: `When stress triggers your body, your sympathetic nervous system initiates a biological chain reaction: shallow breathing, muscle tension, and narrow cognitive focus. 

Understanding that this is a protective survival mechanism of your physiology is the first step in self-compassion. Instead of trying to "think your way out of anxiety," we can utilize bottom-up somatic calming tools. 

### 1. The Physiological Sigh
A rapid double inhale through the nose followed by a slow, audible sigh out of the mouth. Doing this twice immediately signals the brain stem that the body is in no immediate danger, resetting the oxygen-carbon dioxide balance.

### 2. Broaden Your Peripheral Horizon
Anxiety forces narrow focal vision. By letting your eyes relax and expanding your focus to take in everything in your left and right peripheral fields, you mechanically signal the parasympathetic system to engage.

### 3. Progressive Sensory Grounding
A simple 5-4-3-2-1 exercise redirects hyper-arousal back to physical reality. Identify 5 objects around you, touch 4 physical textures, hear 3 distinct sounds, smell 2 smells, and taste 1 taste. Reflect on the shifting physical sensations inside your abdomen as you do this.`,
    category: 'Self-Care',
    readTime: '5 Min Read',
    date: 'May 28, 2026',
    author: 'Dr. Evelyn Sinclair, Psy.D.',
    reflectionPrompt: 'Briefly note how your shoulders, jaw, and breathing feel in this exact second. Take a slow deep breath, release your jaw, and write down an observation about any tension you successfully released.'
  },
  {
    id: 'breaking-conflict-loops',
    title: 'The Soft Start-Up: Breaking Couples’ Destructive Conflict Cycles',
    summary: 'Relationship gridlock is rarely about the topic of disagreement itself. Learn how starting critical discussions with soft, gentle phrasing changes everything.',
    content: `According to relationship pioneer John Gottman, 94% of the time, the outcome of a twenty-minute conflict negotiation can be predicted by the first three minutes of the conversation. 

When we start critical feedback with an accusation ("You never help with this!" or "Why are you always ignore me?"), we trigger instant defensiveness, forcing our partners into fight or flight.

### Reframing Critical accusers into Soft Starts:
To create discussions that build instead of burn, utilize this 3-step formula:
1. **Explain how you feel**: Start with "I feel" instead of accusing "You".
2. **Describe a specific objective event**: Rather than using words like "always" or "never," describe a singular concrete situation.
3. **State a positive structural need**: Clearly explain exactly what action would relieve your distress.

### Example Transformation:
*Harsh Start*: "You are incredibly selfish for leaving all these dishes, I am totally sick of doing your chores."
*Soft Start*: "I feel quite overwhelmed looking at the kitchen tonight. I noticed there are several dishes in the sink, and I would feel so much better and supported if we could clear them together soon."`,
    category: 'Relationships',
    readTime: '6 Min Read',
    date: 'April 14, 2026',
    author: 'Marcus Vance, LCSW',
    reflectionPrompt: 'Think of a minor tension you are currently experiencing with a partner, family member, or friend. How can you translate that frustration into a soft start-up statement utilizing "I feel..."?'
  },
  {
    id: 'mindfulness-over-efficiency',
    title: 'Quiet Attention: Cultivating Daily Mindfulness in an Efficiency-Obsessed Society',
    summary: 'In an era of relentless multitasking, we explore how mini-moments of deep presence restore neurological integrity.',
    content: `We have been conditioned to treat empty space as wasted space. Our minds are perpetually multi-tasking: answering emails while eating lunch, listening to podcasts during walks, and calculating schedules under the shower. 

This hyper-stimulated baseline triggers chronic mild dysregulation, leaving us feeling permanently tired but mentally wired.

### Radical Simplicity
Mindfulness is not about sitting on a cushion for 2 hours in silent meditation. Rather, it is the deliberate act of paying gentle attention to the present moment without instant judgment. You can integrate this into everyday acts:
- **Mindful Drinking**: When sipping tea, hold the cup in your hand, feel the radiant ceramic heat, smell the herbal steam, and focus solely on the swallow mechanism without opening your phone.
- **Active Walking**: Walk 50 steps without headphones. Focus on the direct physical pressure of your heels rolls onto the concrete and look at the architectural shadows.

By introducing quiet attentional boundaries, we allow our amygdala to step down, lowering our cognitive distress baseline.`,
    category: 'Mindfulness',
    readTime: '4 Min Read',
    date: 'March 02, 2026',
    author: 'Dr. Evelyn Sinclair, Psy.D.',
    reflectionPrompt: 'Write down one small daily habit (e.g., brushing teeth, washing coffee cup, waiting for elevator) that you commit to doing with absolute singular attentional focus today.'
  }
];

export const FREQUENT_QUESTIONS = [
  {
    question: 'What happens during our first consultation session?',
    answer: 'The initial session is all about collaboration and mutual evaluation. We will talk about your current struggles, explore some of your background context, define what goals you would like to reach, and build an treatment roadmap. It is also an excellent chance for you to see if our clinical approach feels of safe and comfortable for you.'
  },
  {
    question: 'Do you accept major health insurance providers?',
    answer: 'Mindful Path is an out-of-network provider. We provide comprehensive monthly clinical superbills containing all necessary professional diagnosis and taxonomy codes, which you can easily submit to your insurance company for potential out-of-network reimbursement. We highly recommend calling your insurance provider to check out-of-network outpatient mental health coverage first.'
  },
  {
    question: 'What is your session cancellation policy?',
    answer: 'We maintain a strict 24-hour cancellation policy. Since therapeutic times are dedicated specifically to your journey, cancellations or rescheduling requests sent fewer than 24 hours in advance will undergo the standard session fee, excluding emergency situations.'
  },
  {
    question: 'How long do I need to attend therapy?',
    answer: 'There is no fixed timelines for personal wellness. Some clients obtain high relief and strategic tools within 8 to 12 weekly sessions focused on focused CBT. Others prefer long-term existential, somatic integration sessions spanning across months to deep-dive into persistent emotional structures. We continuously evaluate progress together to align therapy with your evolving life.'
  }
];

export const BUSINESS_HOURS = [
  { days: 'Monday - Thursday', hours: '8:00 AM - 6:00 PM' },
  { days: 'Friday', hours: '9:00 AM - 4:00 PM' },
  { days: 'Saturday', hours: '10:00 AM - 2:00 PM (By Pre-Arrangement Only)' },
  { days: 'Sunday', hours: 'Closed (Crisis Support Available Via State Hotline)' }
];
