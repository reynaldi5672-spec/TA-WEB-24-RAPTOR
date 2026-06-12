import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Wisata Bandar Lampung',
    short_name: 'VisitBDL',
    description: 'Portal Pariwisata Resmi Kota Bandar Lampung',
    start_url: '/',
    display: 'standalone',
    background_color: '#050505',
    theme_color: '#ffcc00',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
