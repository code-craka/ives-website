interface EligibilityCriteria {
    nationality: string;
    visaType: string;
    purpose: string;
    duration: number;
    previousVisas?: string[];
  }
  
  interface EligibilityResult {
    isEligible: boolean;
    requirements: string[];
    recommendations: string[];
  }
  
  export async function checkEligibility(criteria: EligibilityCriteria): Promise<EligibilityResult> {
    // Implement your eligibility logic here
    return {
      isEligible: true,
      requirements: [],
      recommendations: []
    };
  }