const testimonials = [
  {
    quote: "Hussein Abdulrahman transformed my career. The courses are well-structured and the instructors are incredibly knowledgeable. I landed my dream job as a web developer within 3 months of completing the bootcamp.",
    author: "Sarah Johnson",
    role: "Web Developer",
    avatar: "/testimonials/sarah.jpg"
  },
  {
    quote: "The flexibility of learning at my own pace while having access to expert instructors made all the difference. The certification helped me stand out in job interviews.",
    author: "Michael Chen",
    role: "Data Scientist",
    avatar: "/testimonials/michael.jpg"
  }
]

export const Testimonials = () => {
  return (
    <section className="py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            What Our Students Say
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Don't just take our word for it - hear from our successful graduates.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.author}
              className="relative rounded-2xl border bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-800"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.author}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {testimonial.role}
                  </p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                "{testimonial.quote}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 