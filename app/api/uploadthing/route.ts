import { createRouteHandler } from 'uploadthing/next'

import { ourFileRouter } from './core'

export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
  config: {
    uploadthingSecret: "sk_live_4aa64b06de61687f3a227e21c8593e02f6fe6c867670c059b8d7cf2823731528"
  }
})
