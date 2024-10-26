// app/api/eligibility/route.ts
import { checkEligibility } from './eligibilityChecker'; // Adjust the import path as needed

interface EligibilityCriteria {
    nationality: string;
    visaType: string;
    purpose: string;
    duration: number;
    previousVisas?: string[];
  }
  
  export async function POST(req: Request) {
    const data: EligibilityCriteria = await req.json();
    
    const eligibilityResult = await checkEligibility(data);
    return Response.json({ 
      eligible: eligibilityResult.isEligible,
      requirements: eligibilityResult.requirements,
      recommendations: eligibilityResult.recommendations
    });
  }
