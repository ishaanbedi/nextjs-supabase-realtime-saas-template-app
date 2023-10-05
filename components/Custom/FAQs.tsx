import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
const FAQs = () => {
  const faqs = [
    {
      question: "Is it fast?",
      answer: "Yes. It is very fast.",
    },
    {
      question: "Does this use Supabase?",
      answer: "Yes, it does.",
    },
    {
      question: "Can I use this in production?",
      answer: "Yes, you can.",
    },
    {
      question: "Is it accessible?",
      answer: "Yes. It adheres to the WAI-ARIA design pattern.",
    },
  ];

  return (
    <div className="lg:md:ms:px-12 px-2">
      <h2 className="text-3xl font-bold mb-4">FAQs</h2>
      <Accordion type="single" collapsible>
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index + 1}`}>
            <AccordionTrigger className="text-xl">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent>
              <p>{faq.answer}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FAQs;
