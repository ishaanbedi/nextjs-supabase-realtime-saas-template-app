import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FiUsers } from "react-icons/fi";
import { BsShieldCheck } from "react-icons/bs";
import { AiOutlineBarChart } from "react-icons/ai";
const Features = () => {
  return (
    <div className="pt-12">
      <h1 className="text-4xl font-bold text-stone-100 text-center py-12">
        Features
      </h1>
      <div className="flex lg:md:sm:flex-row flex-col  lg:md:sm:space-x-2 lg:md:sm:space-y-0 space-y-2 px-2 pb-12">
        <FeatureCard
          icon={<FiUsers />}
          title="Collaborate"
          description="Help your team stay in sync with shared projects and tasks, and stay connected with in-app chat, video calls, and screen sharing."
        />
        <FeatureCard
          icon={<BsShieldCheck />}
          title="Security"
          description="Ensure your data is secure with our enterprise-grade security features, including end-to-end encryption, SSO, and compliance support."
        />
        <FeatureCard
          icon={<AiOutlineBarChart />}
          title="Analytics"
          description="Get insights into your team’s activity with advanced analytics and search, and connect your favorite tools with our integrations, including Slack."
        />
      </div>
    </div>
  );
};

export default Features;

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <Card className="text-white rounded-2xl bg-transparent border-stone-800 border-2">
      <CardHeader>
        <CardTitle>
          <div className="text-4xl bg-stone-800 w-20 h-20 rounded-xl flex justify-center items-center">
            {icon}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardTitle>{title}</CardTitle>
        <CardDescription className="text-stone-300 pt-3">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
};
