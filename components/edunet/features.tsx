import { Calculator, TrendingUp, Award, Briefcase, Users, Globe } from 'lucide-react'

const features = [
  {
    icon: Calculator,
    title: 'Professional Accounting Training',
    description: 'Comprehensive courses covering financial accounting, managerial accounting, and advanced financial analysis.'
  },
  {
    icon: TrendingUp,
    title: 'Business Growth Strategies',
    description: 'Learn proven techniques for market expansion, revenue growth, and sustainable business development.'
  },
  {
    icon: Award,
    title: 'Industry-Recognized Certifications',
    description: 'Earn professional certifications that are valued by employers and enhance your career prospects.'
  },
  {
    icon: Briefcase,
    title: 'Career Development',
    description: 'Access career coaching, resume building, and interview preparation to advance your professional journey.'
  },
  {
    icon: Users,
    title: 'Expert Instructors',
    description: 'Learn from industry professionals with years of experience in accounting and business development.'
  },
  {
    icon: Globe,
    title: 'Global Network',
    description: 'Connect with professionals worldwide and expand your business network through our learning community.'
  }
]

export const Features = () => {
  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Why Choose Our Professional Training Programs?
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Our comprehensive approach to professional development sets us apart in the industry
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="relative rounded-2xl border bg-white p-8 shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-800"
            >
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 