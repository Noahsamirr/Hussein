const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Create directories if they don't exist
const dirs = [
  'public/courses',
  'public/testimonials'
];

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Course images
const courses = [
  'web-dev',
  'mobile-dev',
  'ui-ux',
  'data-science',
  'digital-marketing',
  'cloud'
];

// Testimonial images
const testimonials = [
  'sarah',
  'michael'
];

// Generate course images
courses.forEach(course => {
  sharp({
    create: {
      width: 800,
      height: 400,
      channels: 4,
      background: { r: Math.random() * 255, g: Math.random() * 255, b: Math.random() * 255, alpha: 1 }
    }
  })
  .composite([{
    input: {
      text: {
        text: course.toUpperCase(),
        font: 'sans',
        fontSize: 60,
        rgba: true
      }
    },
    gravity: 'center'
  }])
  .jpeg()
  .toFile(`public/courses/${course}.jpg`)
  .catch(err => console.error(`Error generating ${course}.jpg:`, err));
});

// Generate testimonial images
testimonials.forEach(person => {
  sharp({
    create: {
      width: 400,
      height: 400,
      channels: 4,
      background: { r: Math.random() * 255, g: Math.random() * 255, b: Math.random() * 255, alpha: 1 }
    }
  })
  .composite([{
    input: {
      text: {
        text: person.toUpperCase(),
        font: 'sans',
        fontSize: 40,
        rgba: true
      }
    },
    gravity: 'center'
  }])
  .jpeg()
  .toFile(`public/testimonials/${person}.jpg`)
  .catch(err => console.error(`Error generating ${person}.jpg:`, err));
}); 