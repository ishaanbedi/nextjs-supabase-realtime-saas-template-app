import { TiTick } from "react-icons/ti";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
const Pricing = () => {
  return (
    <div className="pt-4 px-2">
      <div>
        <h1 className="text-4xl font-bold">Our Pricing</h1>
      </div>
      <div>
        <h2 className="text-md text-stone-400 max-w-md pt-3">
          We offer a range of pricing options to suit your needs, from free to a
          fully-featured enterprise version.
        </h2>
      </div>
      <div className="py-12 flex lg:md:sm:flex-row flex-col lg:md:sm:space-x-2 lg:md:sm:space-y-0 space-y-2 pt-12 justify-evenly">
        <PriceCard
          planName="Basic"
          planDescription="For individual users"
          features={[
            "5 GB Storage",
            "10 GB transfer/month",
            "4 user per namespace",
            "Local and private repos",
          ]}
          destination="https://google.com"
          price="$0"
        />
        <PriceCard
          planName="Premium"
          planDescription="For a small team"
          features={[
            "60 GB Storage",
            "Advanced CI/CD",
            "Enterprise agile planning",
            "Protected branches",
          ]}
          destination="https://google.com"
          price="$16"
          featuredPlan={true}
        />
        <PriceCard
          planName="Enterprise"
          planDescription="For large companies"
          features={[
            "260 GB Storage",
            "Security dashboards",
            "Free guest users",
            "Container scanning",
          ]}
          destination="https://google.com"
          price="$99"
        />
      </div>
    </div>
  );
};

export default Pricing;
const PriceCard = ({
  planName,
  planDescription,
  features,
  destination,
  price,
  featuredPlan,
}: {
  planName: string;
  planDescription: string;
  features: string[];
  destination: string;
  price: string;
  featuredPlan?: boolean;
}) => {
  return (
    <Card
      className={`text-white rounded-2xl ${featuredPlan ? "bg-transparent" : "bg-transparent"
        } border-stone-800 border-2 w-full`}
    >
      <CardHeader>
        <CardTitle>
          <div>
            <span className="text-2xl font-bold">{planName}</span>
            <br />
            <span className="text-stone-300 text-sm">{planDescription}</span>
          </div>
        </CardTitle>
        <Separator
          className={`mt-2 
        ${featuredPlan ? "border-white" : "border-stone-800"}
        border-b-2`}
        />
      </CardHeader>
      <CardContent>
        <CardDescription className="text-stone-300">
          <ul className="list-none list-inside">
            {features.map((feature) => (
              <li key={feature} className="flex space-x-4 items-center text-lg">
                <TiTick />
                {feature}
              </li>
            ))}
          </ul>
          <Separator
            className={`mt-2 
        ${featuredPlan ? "border-white" : "border-stone-800"}
        border-b-2`}
          />{" "}
          <div className="pt-2">
            <span className="text-3xl text-white">{price}</span> / month
          </div>
          <br />
          <Button
            className="px-10 rounded-full w-full mt-4"
            variant="secondary"
          >
            {planName === "Basic" ? "Get Started For Free" : "Contact Us"}
          </Button>
        </CardDescription>
      </CardContent>
    </Card>
  );
};
