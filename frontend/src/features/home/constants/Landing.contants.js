import { ListTodo, Clock, CheckCircle } from 'lucide-react';

export const FEATURES = [
    {
        id: 'organize',
        icon: ListTodo,
        title: 'Organize tasks',
        desc: 'Create, categorize, and prioritize tasks with an intuitive interface.',
    },
    {
        id: 'track',
        icon: Clock,
        title: 'Track progress',
        desc: 'Move tasks through stages and see exactly where things stand.',
    },
    {
        id: 'stay-on-top',
        icon: CheckCircle,
        title: 'Stay on top',
        desc: 'Never miss a deadline with clear status tracking and reminders.',
    },
];