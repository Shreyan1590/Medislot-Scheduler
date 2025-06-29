
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Stethoscope, FlaskConical, Calendar, TestTube } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="w-full">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="flex justify-between items-center py-6">
          <div className="flex items-center gap-2">
            <TestTube className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold">DR Medlab</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost">
              <Link href="/login">Log In</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Register</Link>
            </Button>
          </div>
        </header>

        <main>
          <section className="text-center py-12 md:py-20">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-primary">
              Precision Diagnostics, Unmatched Care.
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              DR Medlab offers state-of-the-art diagnostic services with a focus on accuracy, speed, and patient comfort. Book your appointments online with ease.
            </p>
            <Button asChild size="lg" className="mt-8">
              <Link href="/register">Get Started</Link>
            </Button>
            <div className="relative mt-12 w-full max-w-4xl mx-auto">
              <Image 
                src="https://placehold.co/1200x600.png"
                alt="Medical laboratory"
                width={1200}
                height={600}
                className="rounded-lg shadow-2xl"
                data-ai-hint="medical laboratory"
              />
            </div>
          </section>

          <section className="py-20">
            <div className="container mx-auto">
              <h3 className="text-3xl font-bold text-center mb-12">Why Choose DR Medlab?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="text-center">
                  <CardHeader className="items-center">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <FlaskConical className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle>Advanced Technology</CardTitle>
                  </CardHeader>
                  <CardContent className="text-muted-foreground">
                    We use the latest equipment to ensure the most accurate and reliable results for all our tests.
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardHeader className="items-center">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <Stethoscope className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle>Expert Staff</CardTitle>
                  </CardHeader>
                  <CardContent className="text-muted-foreground">
                    Our team of certified professionals and experienced doctors are dedicated to providing the best care.
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardHeader className="items-center">
                     <div className="p-3 bg-primary/10 rounded-full">
                      <Calendar className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle>Seamless Booking</CardTitle>
                  </CardHeader>
                  <CardContent className="text-muted-foreground">
                    Our online platform makes scheduling your appointments quick, easy, and hassle-free.
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </main>

      </div>
        <footer className="text-center py-8 mt-12 border-t w-full bg-secondary">
          <p className="text-muted-foreground">&copy; {new Date().getFullYear()} DR Medlab. All Rights Reserved.</p>
        </footer>
    </div>
  );
}
