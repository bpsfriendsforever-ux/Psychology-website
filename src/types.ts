export interface Service {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  duration: string;
  price: string;
  icon: string;
  benefits: string[];
  techniques: string[];
}

export interface Practitioner {
  name: string;
  role: string;
  bio: string;
  specialties: string[];
  education: string[];
  image: string;
}

export interface Appointment {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  serviceId: string;
  date: string;
  timeSlot: string;
  notes?: string;
  createdAt: string;
  status: 'scheduled' | 'cancelled' | 'completed';
}

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: 'Mindfulness' | 'Relationships' | 'Anxiety' | 'Self-Care' | 'Research';
  readTime: string;
  date: string;
  author: string;
  reflectionPrompt: string; // Dynamic self-growth interactive writing prompt
}

export interface UserReflection {
  postId: string;
  reflectionText: string;
  savedAt: string;
}
