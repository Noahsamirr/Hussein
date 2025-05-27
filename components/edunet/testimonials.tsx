import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Software Engineer',
    content: '&ldquo;The courses here have transformed my career. The practical approach and real-world projects helped me land my dream job.&rdquo;',
    image: '/testimonials/sarah.jpg',
  },
  {
    name: 'Michael Chen',
    role: 'Data Scientist',
    content: '&ldquo;I&apos;ve tried many platforms, but this one stands out. The quality of instruction and community support is unmatched.&rdquo;',
    image: '/testimonials/michael.jpg',
  },
  {
    name: 'Emily Rodriguez',
    role: 'UX Designer',
    content: '&ldquo;The interactive learning experience and personalized feedback have accelerated my growth as a designer. Highly recommended!&rdquo;',
    image: '/testimonials/emily.jpg',
  },
]

export const Testimonials = () => {
  return (
    <div className="py-12 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-blue-900 dark:text-blue-100 mb-4">
            What Our Students Say
          </h2>
          <p className="text-lg text-blue-800/80 dark:text-blue-200/80">
            Join thousands of satisfied learners who have transformed their careers
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
              <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                />
                  </div>
                <div>
                    <h3 className="font-semibold text-blue-900 dark:text-blue-100">
                      {testimonial.name}
                  </h3>
                    <p className="text-sm text-blue-800/80 dark:text-blue-200/80">
                    {testimonial.role}
                  </p>
                </div>
              </div>
                <p className="text-blue-800/80 dark:text-blue-200/80">
                  {testimonial.content}
              </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
} 