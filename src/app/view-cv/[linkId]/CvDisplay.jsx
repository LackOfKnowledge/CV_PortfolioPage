// Plik: src/app/view-cv/[linkId]/CvDisplay.jsx

"use client";

import CvView from "@/components/CvView";

export default function CvDisplay({ cvData }) {
  return (
    <>
      <style
        jsx
        global
      >{`
        @media print {
          body {
            margin: 0;
            padding: 0;
            background: white !important;
          }
          @page {
            size: A4;
            margin: 1cm;
          }
        }
      `}</style>
      <CvView
        personalData={cvData.personalData}
        summary={cvData.summary}
        educationData={cvData.educationData}
        skillsData={cvData.skillsData}
        experienceData={cvData.experienceData}
        references={cvData.references}
        gdprClause={cvData.gdprClause}
      />
    </>
  );
}
