import CardNav from "@/components/ui/CardNav";

const Navbar = () => {
  const items = [
    {
      label: "Product",
      bgColor: "#2E2E2E",
      textColor: "#fff",
      links: [
        { label: "Scheduling", ariaLabel: "Scheduling features" },
        { label: "Availability", ariaLabel: "Availability management" },
        { label: "Team Scheduling", ariaLabel: "Team scheduling" }
      ]
    },
    {
      label: "How it works",
      bgColor: "#2E2E2E",
      textColor: "#fff",
      links: [
        { label: "Featured", ariaLabel: "Featured Projects" },
        { label: "Case Studies", ariaLabel: "Project Case Studies" }
      ]
    },
    {
      label: "Contact",
      bgColor: "#2E2E2E",
      textColor: "#fff",
      links: [
        { label: "Email", ariaLabel: "Email us" },
        { label: "Instagram", ariaLabel: "Instagram" },
        { label: "LinkedIn", ariaLabel: "LinkedIn" }
      ]
    }
  ];

  return (
    <CardNav
      logo="/Logo/C.png"
      logoAlt="Company Logo"
      items={items}
      baseColor="#1a1a1a"
      menuColor="#e9ecef"
      buttonBgColor="#e9ecef"
      buttonTextColor="#1a1a1a"
      ease="power3.out"
      className="font-urbanist"
    />
  );
};

export default Navbar;