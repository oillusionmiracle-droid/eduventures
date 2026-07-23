export const AWARD_CATEGORIES = [
  "Fashionista Female", "Fashionista Male", "Most Reserved", "Most Social", 
  "Most Influential", "Entrepreneur of the Year", "Voice of the Class", 
  "Most Impactful Student", "Business Brand of the Year", "Most Friendly People", 
  "Content Creator of the Year"
];

export function sanitizeInput(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/<[^>]*>?/gm, '').trim();
}

export function validateSubmission(body) {
  const errors = [];
  
  if (!body.nominations || !Array.isArray(body.nominations)) {
    errors.push("Nominations must be an array");
  } else {
    let mostInfluentialCount = 0;
    
    for (const nom of body.nominations) {
      if (!AWARD_CATEGORIES.includes(nom.category)) {
        errors.push(`Invalid category: ${nom.category}`);
      }
      
      if (nom.category === "Most Influential" && typeof nom.nominatedPerson === 'string' && nom.nominatedPerson.trim().length > 0) {
        mostInfluentialCount++;
      }
    }
    
    if (mostInfluentialCount < 1) {
      errors.push("At least 1 nomination for 'Most Influential' is required");
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}
