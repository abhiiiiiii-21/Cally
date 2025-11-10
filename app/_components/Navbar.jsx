import CardNav from "@/components/ui/CardNav";

const Navbar = () => {
  const items = [
    {
      label: "About",
      bgColor: "#0D0716",
      textColor: "#fff",
      links: [
        { label: "Company", ariaLabel: "About Company" },
        { label: "Careers", ariaLabel: "About Careers" }
      ]
    },
    {
      label: "Projects", 
      bgColor: "#0D0716",
      textColor: "#fff",
      links: [
        { label: "Featured", ariaLabel: "Featured Projects" },
        { label: "Case Studies", ariaLabel: "Project Case Studies" }
      ]
    },
    {
      label: "Contact",
      bgColor: "#0D0716", 
      textColor: "#fff",
      links: [
        { label: "Email", ariaLabel: "Email us" },
        { label: "Twitter", ariaLabel: "Twitter" },
        { label: "LinkedIn", ariaLabel: "LinkedIn" }
      ]
    }
  ];

return (
    <CardNav
      logo= "/Logo/C.png"
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