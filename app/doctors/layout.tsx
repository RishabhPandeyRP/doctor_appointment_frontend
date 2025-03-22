// app/doctors/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Find a Doctor",
  description: "Search for doctors based on specialization, rating, experience, and more",
};

export default function DoctorsLayout({
  children,
}: Readonly<{
    children: React.ReactNode;
  }>) {
  return children;
}