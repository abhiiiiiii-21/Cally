import AnimatedBadge from "@/components/ui/animated-badge";
import { FaqAccordion } from "@/components/ui/faq-chat-accordion";

const defaultData = [
  {
    answer: "The internet doesn't close. It's available 24/7.",
    id: 1,
    question: "How late does the internet close?",
  },
  {
    answer: "No, you don't need a license to browse this website.",
    id: 2,
    question: "Do I need a license to browse this website?",
  },
  {
    answer: "Our cookies are digital, not edible. They're used for website functionality.",
    id: 3,
    question: "What flavour are the cookies?",
  },
  {
    answer: "Yes, but we do have a return policy",
    id: 4,
    question: "Can I get lost here?",
  },
  {
    answer: "Don't worry, you can always go back or refresh the page.",
    id: 5,
    question: "What if I click the wrong button?",
  },
  {
    answer: "The internet doesn't close. It's available 24/7.",
    id: 6,
    question: "How late does the internet close?",
  },
  {
    answer: "No, you don't need a license to browse this website.",
    id: 7,
    question: "Do I need a license to browse this website?",
  }
];

function FAQs() {
  return (

    <section className='mt-30 flex flex-col font-urbanist justify-center items-center'>

      <AnimatedBadge
        text="FAQs"
        color="#22d3ee"
      />

      <div className="mt-15 grid grid-cols-2 justify-center items-center gap-30">

        <div className="space-y-4 text-center">
          <h2 className="max-w-md text-balance font-semibold tracking-tight text-5xl">
            Got questions? We've got answers
          </h2>
          <p className="text-neutral-600">
            Find quick answers to common questions about our scheduling platform.
          </p>
        </div>

        <div className="w-full">
          <FaqAccordion
            data={defaultData}
            className="max-w-[700px]"
          />
        </div>
      </div>

    </section>
  );
}


export default FAQs;