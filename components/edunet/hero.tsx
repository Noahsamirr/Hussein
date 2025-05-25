import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'lucide-react'

export const Hero = () => {
  return (
    <section className="relative bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-32 md:py-48">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-8 inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <span className="mr-2">New</span>
            <span>Professional Certification Programs Available</span>
          </div>
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
            Elevate Your Business Career with Expert-Led Training
          </h1>
          <p className="mb-8 text-xl text-gray-600 dark:text-gray-300">
            Join thousands of professionals who have transformed their careers through our comprehensive 
            accounting and business development programs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Button asChild size="lg" className="text-lg">
              <Link href="/courses">
                Start Learning Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg">
              <Link href="/about">Schedule a Consultation</Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 text-center">
            {[
              "Industry-Recognized Certifications",
              "Expert-Led Training",
              "Flexible Learning Schedule",
              "Career Support"
            ].map((feature) => (
              <div key={feature} className="flex items-center justify-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
      </div>
    </section>
  )
} 