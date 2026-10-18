import { Activity, Heart, ShieldCheck, Sprout } from 'lucide-react'
export const services = [
  {
    id: 'primary',
    number: '01',
    icon: Heart,
    title: 'Everyday primary care',
    description:
      'Routine visits for everyday health questions, with a plan for what to do next.',
    detail:
      'This primary care concept brings together your health questions, relevant history, and current priorities, with room to discuss a follow-up plan.',
    includes: [
      'Everyday health questions',
      'Routine check-ins and follow-ups',
      'Planning your next steps',
    ],
  },
  {
    id: 'preventive',
    number: '02',
    icon: ShieldCheck,
    title: 'Preventive health',
    description:
      'Routine check-ins and conversations about screenings, guided by your individual needs.',
    detail:
      'Prevention is personal. A preventive visit is a chance to review your health, discuss appropriate check-ups, and consider a plan with your clinician.',
    includes: [
      'Routine wellness conversations',
      'Discussion of age-appropriate screenings',
      'A plan informed by your individual needs',
    ],
  },
  {
    id: 'ongoing',
    number: '03',
    icon: Activity,
    title: 'Ongoing care',
    description:
      'Review an existing care plan, discuss medication questions, and plan follow-up conversations.',
    detail:
      'Ongoing care makes room for the bigger picture. Talk through how you are doing, review an existing care plan, and discuss questions with a clinician.',
    includes: [
      'Regular care-plan conversations',
      'Medication questions and reviews',
      'Coordination of appropriate next steps',
    ],
  },
  {
    id: 'wellness',
    number: '04',
    icon: Sprout,
    title: 'Whole-person wellness',
    description:
      'Talk through movement, nourishment, and rest, then explore routines that fit your day.',
    detail:
      'Wellness should feel like a part of your life. This program concept explores realistic routines around movement, nourishment, rest, and personal priorities.',
    includes: [
      'Conversations about sustainable routines',
      'Space to explore your personal goals',
      'An approach that respects your pace',
    ],
  },
]
