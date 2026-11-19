import HomeClient from "./HomeClient";

// Server component: owns the home page's metadata and structured data so both
// are in the raw HTML response. The interactive gallery lives in HomeClient.

const SITE_URL = "https://claynicholson.com/";
const DESCRIPTION =
  "MIT student (EECS, Course 6-5) and software engineer at Hack Club. Founder of Hack Club Blueprint and co-founder of Green Mountain Robotics.";

export const metadata = {
  title: "Clay Nicholson",
  description: DESCRIPTION,
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "profile",
    title: "Clay Nicholson",
    description: DESCRIPTION,
    url: SITE_URL,
    firstName: "Clay",
    lastName: "Nicholson",
  },
  twitter: {
    card: "summary",
    title: "Clay Nicholson",
    description: DESCRIPTION,
    site: "@claynicholsonvt",
    creator: "@claynicholsonvt",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://claynicholson.com/#person",
      name: "Clay Nicholson",
      url: SITE_URL,
      mainEntityOfPage: { "@id": "https://claynicholson.com/#website" },
      description: DESCRIPTION,
      jobTitle: "Software Engineer",
      worksFor: {
        "@type": "Organization",
        name: "Hack Club",
        url: "https://hackclub.com/",
        sameAs: "https://www.wikidata.org/wiki/Q98127305",
      },
      alumniOf: [
        {
          "@type": "CollegeOrUniversity",
          name: "Massachusetts Institute of Technology",
          url: "https://www.mit.edu/",
          sameAs: "https://www.wikidata.org/wiki/Q49108",
        },
        {
          "@type": "HighSchool",
          name: "Champlain Valley Union High School",
          sameAs: "https://www.wikidata.org/wiki/Q5070184",
        },
      ],
      homeLocation: {
        "@type": "Place",
        name: "Williston, Vermont, United States",
      },
      memberOf: [
        {
          "@type": "Organization",
          name: "Green Mountain Robotics",
          url: "https://greenmountainrobotics.org/",
          sameAs: "https://www.wikidata.org/wiki/Q142216238",
        },
        {
          "@type": "Organization",
          name: "CVU RoboHawks",
          url: "https://www.robohawks5741.com/",
          sameAs: "https://www.wikidata.org/wiki/Q142216239",
        },
      ],
      award: [
        "Regeneron ISEF 2025 Third Place Grand Award",
        "Regeneron ISEF 2026 Chief of Naval Research Scholarship Award",
        "Regeneron ISEF 2026 Midwest Microelectronics Consortium First Award",
        "FIRST Tech Challenge Dean's List Finalist 2025",
        "2023 Congressional App Challenge Winner, Vermont At-Large District",
        "2026 U.S. Presidential Scholars Program Semifinalist",
      ],
      knowsAbout: [
        "FPGA design",
        "Verilog",
        "ASIC design",
        "AI hardware",
        "Robotics",
        "Open-source hardware",
      ],
      sameAs: [
        "https://www.wikidata.org/wiki/Q142215948",
        "https://github.com/claynicholson",
        "https://www.linkedin.com/in/claynicholson/",
        "https://x.com/claynicholsonvt",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://claynicholson.com/#website",
      url: SITE_URL,
      name: "Clay Nicholson",
      publisher: { "@id": "https://claynicholson.com/#person" },
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <HomeClient />
    </>
  );
}
