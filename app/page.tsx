import Card, {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/Card";

export default function Home() {
  return (
    <main className="min-h-screen p-8 md:p-24">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Kalshi Copy Trading Dashboard
          </h1>
          <p className="text-foreground-secondary">
            Dashboard coming soon...
          </p>
        </div>

        {/* Card Component Demo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card variant="default" hover>
            <CardHeader>
              <CardTitle>Default Card</CardTitle>
              <CardDescription>
                Standard card with hover effect
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-foreground-secondary">
                This is a default card variant with hover animation.
              </p>
            </CardContent>
          </Card>

          <Card variant="elevated">
            <CardHeader>
              <CardTitle>Elevated Card</CardTitle>
              <CardDescription>
                Card with elevated shadow
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-foreground-secondary">
                This card has a stronger shadow for emphasis.
              </p>
            </CardContent>
          </Card>

          <Card variant="glass">
            <CardHeader>
              <CardTitle>Glass Card</CardTitle>
              <CardDescription>
                Glassmorphism effect
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-foreground-secondary">
                This card uses glassmorphism with backdrop blur.
              </p>
            </CardContent>
          </Card>

          <Card variant="outlined" hover>
            <CardHeader>
              <CardTitle>Outlined Card</CardTitle>
              <CardDescription>
                Card with prominent border
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-foreground-secondary">
                This card has a thicker border for definition.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}

