import { defineConfig } from '@prisma/config'

export default defineConfig({
  datasource: {
    // Tembak langsung URL pgAdmin lokalmu di sini biar si 'prisma migrate' gak bingung lagi, jirr!
    url: "postgresql://postgres:root@localhost:5432/lpg_dest_db?schema=public",
  },
})