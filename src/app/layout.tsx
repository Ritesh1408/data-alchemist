import './globals.css';
import { ReduxProvider } from './providers';
import type { Metadata } from 'next';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: 'Data Alchemist',
  description: 'AI-powered data configurator',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          {children}
          {/* Enable toast notifications globally */}
          <Toaster richColors position="top-right" /> 
        </ReduxProvider>
      </body>
    </html>
  );
}
