import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-4xl font-bold text-destructive">404</CardTitle>
          <CardDescription className="text-xl">Page Not Found</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-6">Sorry, we couldn't find the page you're looking for.</p>
          <Button asChild>
            <Link href="/">Return to Homepage</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
