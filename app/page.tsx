import Card, {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/Card";
import { Headline, Meta, Data } from "@/components/ui/Typography";
import Badge from "@/components/ui/Badge";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Featured Trader Section (Hashnode-inspired pinned section) */}
        <div className="mb-12">
          <Card variant="elevated" hover className="overflow-hidden">
            <div className="relative">
              <div className="absolute top-4 left-4 z-10">
                <Badge variant="elite" size="sm">
                  FEATURED
                </Badge>
              </div>
              <div className="grid md:grid-cols-2 gap-6 p-6">
                <div className="relative h-64 md:h-auto rounded-lg bg-gradient-to-br from-accent/20 to-accent-success/20 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-6xl">📈</div>
                  </div>
                </div>
                <div className="flex flex-col justify-center space-y-4">
                  <Headline size="lg" weight="bold">
                    Top Performing Trader This Week
                  </Headline>
                  <Meta size="base" variant="secondary">
                    Discover the strategies and insights from our most successful
                    trader. With an impressive win rate and consistent returns,
                    this trader has proven their expertise in navigating
                    prediction markets.
                  </Meta>
                  <div className="flex items-center gap-6 pt-4">
                    <div>
                      <Meta size="xs" variant="muted">ROI (7d)</Meta>
                      <Data variant="profit" size="lg" weight="bold">
                        +24.5%
                      </Data>
                    </div>
                    <div>
                      <Meta size="xs" variant="muted">Win Rate</Meta>
                      <Data variant="profit" size="lg" weight="bold">
                        78%
                      </Data>
                    </div>
                    <div>
                      <Meta size="xs" variant="muted">Volume</Meta>
                      <Data size="lg" weight="bold">
                        $125K
                      </Data>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Top Traders Grid (Hashnode-inspired article grid) */}
        <div className="mb-12">
          <Headline size="md" weight="semibold" className="mb-6">
            Top Gainers
          </Headline>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Card key={item} variant="default" hover padding="none" className="overflow-hidden">
                {/* Image Section */}
                <div className="relative h-48 w-full bg-gradient-to-br from-accent/20 via-accent-success/20 to-accent/20 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-6xl opacity-50">📈</div>
                  </div>
                  {/* Badges overlay */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    <Badge variant="top-gainer" size="sm">
                      Top Gainer
                    </Badge>
                    <Badge variant="consistent" size="sm">
                      Consistent
                    </Badge>
                  </div>
                </div>
                
                {/* Content Section */}
                <div className="p-4 space-y-3">
                  <div>
                    <CardTitle className="text-lg font-semibold mb-1">
                      Trader #{item} - Elite Performer
                    </CardTitle>
                    <CardDescription className="text-sm">
                      Consistent returns with low risk profile
                    </CardDescription>
                  </div>
                  
                  {/* Metrics */}
                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <div className="text-center">
                      <Meta size="xs" variant="muted" className="block mb-1">ROI</Meta>
                      <Data variant="profit" size="sm" weight="semibold">
                        +{15 + item * 2}%
                      </Data>
                    </div>
                    <div className="text-center">
                      <Meta size="xs" variant="muted" className="block mb-1">Win Rate</Meta>
                      <Data size="sm" weight="semibold">
                        {70 + item * 2}%
                      </Data>
                    </div>
                    <div className="text-center">
                      <Meta size="xs" variant="muted" className="block mb-1">Copied</Meta>
                      <Data size="sm" weight="semibold">
                        {120 + item * 10}
                      </Data>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

