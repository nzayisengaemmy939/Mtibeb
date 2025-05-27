// app/layout.tsx
import './globals.css';
import { Toaster } from "react-hot-toast";


export const metadata = {
  title: 'Miti Tibeb',
  description: 'Art of Trees',
  icons: {
    icon: '/icon2.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Toaster position="bottom-right" />
        <main>{children}</main>
        
      </body>
    </html>
  );
}
