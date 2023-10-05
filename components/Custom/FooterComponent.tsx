import { Gem } from "lucide-react";
import Link from "next/link";
const FooterComponent = () => {
  return (
    <div>
      <footer className="">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="flex justify-center text-stone-600 dark:text-stone-300 sm:justify-start items-center">
              <Gem className="w-8 h-8" />
            </div>

            <p className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400 lg:mt-0 lg:text-right">
              A sample app by{" "}
              <Link
                className="font-medium text-gray-900 dark:text-gray-100"
                target="_blank"
                href="https://ishaanbedi.in"
              >
                Ishaan Bedi
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FooterComponent;
