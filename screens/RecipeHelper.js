const nutritionDB = {
  // Proteins
  'chicken': { calories: 165, protein: 31, carbs: 0, fat: 3.6 },
  'beef': { calories: 250, protein: 26, carbs: 0, fat: 17 },
  'fish': { calories: 206, protein: 22, carbs: 0, fat: 12 },
  'eggs': { calories: 155, protein: 13, carbs: 1.1, fat: 11 },
  'tofu': { calories: 76, protein: 8, carbs: 1.9, fat: 4.8 },

  // Dairy
  'milk': { calories: 103, protein: 3.4, carbs: 4.8, fat: 6.2 },
  'cheese': { calories: 402, protein: 25, carbs: 1.3, fat: 33 },
  'butter': { calories: 717, protein: 0.9, carbs: 0.1, fat: 81 },
  'cream': { calories: 340, protein: 2.1, carbs: 2.8, fat: 36 },
  'yogurt': { calories: 59, protein: 10, carbs: 3.6, fat: 0.4 },

  // Grains
  'flour': { calories: 364, protein: 10, carbs: 76, fat: 1 },
  'rice': { calories: 130, protein: 2.7, carbs: 28, fat: 0.3 },
  'pasta': { calories: 158, protein: 5.8, carbs: 31, fat: 0.9 },
  'bread': { calories: 265, protein: 9, carbs: 49, fat: 3.2 },
  'oats': { calories: 389, protein: 16.9, carbs: 66, fat: 6.9 },

  // Vegetables
  'potato': { calories: 77, protein: 2, carbs: 17, fat: 0.1 },
  'carrot': { calories: 41, protein: 0.9, carbs: 9.6, fat: 0.2 },
  'broccoli': { calories: 34, protein: 2.8, carbs: 7, fat: 0.4 },
  'spinach': { calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4 },
  'tomato': { calories: 18, protein: 0.9, carbs: 3.9, fat: 0.2 },

  // Fruits
  'apple': { calories: 52, protein: 0.3, carbs: 14, fat: 0.2 },
  'banana': { calories: 89, protein: 1.1, carbs: 23, fat: 0.3 },
  'orange': { calories: 47, protein: 0.9, carbs: 12, fat: 0.1 },
  'berries': { calories: 57, protein: 0.7, carbs: 14, fat: 0.3 },

  // Fats and Oils
  'oil': { calories: 884, protein: 0, carbs: 0, fat: 100 },
  'olive oil': { calories: 884, protein: 0, carbs: 0, fat: 100 },
  'coconut oil': { calories: 862, protein: 0, carbs: 0, fat: 100 },

  // Sweeteners
  'sugar': { calories: 387, protein: 0, carbs: 100, fat: 0 },
  'honey': { calories: 304, protein: 0.3, carbs: 82, fat: 0 },
  'maple syrup': { calories: 260, protein: 0, carbs: 67, fat: 0 }
};

// Define healthy ingredient substitutions
export const healthySwaps = {
  'butter': {
    ingredient: 'Greek yogurt',
    note: '(reduces fat while maintaining moisture)',
    ratio: 1
  },
  'sugar': {
    ingredient: 'monk fruit sweetener',
    note: '(zero calories, natural sweetener)',
    ratio: 1
  },
  'white flour': {
    ingredient: 'almond flour',
    note: '(lower carbs, higher protein)',
    ratio: 1
  },
  'cream': {
    ingredient: 'coconut milk',
    note: '(dairy-free alternative with healthy fats)',
    ratio: 1
  },
  'pasta': {
    ingredient: 'zucchini noodles',
    note: '(low-carb alternative)',
    ratio: 1.5
  },
  'rice': {
    ingredient: 'cauliflower rice',
    note: '(low-carb, vitamin-rich alternative)',
    ratio: 1.25
  },
  'bread crumbs': {
    ingredient: 'ground almonds',
    note: '(gluten-free, protein-rich)',
    ratio: 0.75
  },
  'vegetable oil': {
    ingredient: 'applesauce',
    note: '(for baking, reduces fat)',
    ratio: 0.75
  },
  'mayonnaise': {
    ingredient: 'mashed avocado',
    note: '(healthy fats and nutrients)',
    ratio: 1
  },
  'sour cream': {
    ingredient: 'Greek yogurt',
    note: '(higher protein, lower fat)',
    ratio: 1
  }
};

// Get healthy substitute for an ingredient
export const getHealthySubstitute = (ingredient) => {
  if (!ingredient) return null;
  
  const normalizedIngredient = ingredient.toLowerCase();
  
  for (const [original, substitute] of Object.entries(healthySwaps)) {
    if (normalizedIngredient.includes(original)) {
      return substitute;
    }
  }
  
  return null;
};

// Function to estimate nutrition based on ingredient name
const estimateNutrition = (ingredientName) => {
  if (!ingredientName) return null;
  
  const normalized = ingredientName.toLowerCase();
  
  // Search for matching ingredients in our database
  for (const [dbIngredient, nutrition] of Object.entries(nutritionDB)) {
    if (normalized.includes(dbIngredient)) {
      return nutrition;
    }
  }
  
  // Default values if no match found
  return {
    calories: 100,
    protein: 5,
    carbs: 10,
    fat: 5
  };
};

// Calculate nutrition information for the recipe
export const calculateNutrition = (ingredients) => {
  if (!ingredients || !Array.isArray(ingredients)) {
    return {
      original: { calories: 0, protein: 0, carbs: 0, fat: 0 },
      healthy: { calories: 0, protein: 0, carbs: 0, fat: 0 }
    };
  }

  const nutritionValues = {
    original: { calories: 0, protein: 0, carbs: 0, fat: 0 },
    healthy: { calories: 0, protein: 0, carbs: 0, fat: 0 }
  };

  ingredients.forEach(ingredient => {
    if (!ingredient || !ingredient.ingredient) return;

    // Get base nutrition for original ingredient
    const baseNutrition = estimateNutrition(ingredient.ingredient);
    const quantity = parseFloat(ingredient.quantity) || 1;

    // Add to original values
    nutritionValues.original.calories += baseNutrition.calories * quantity;
    nutritionValues.original.protein += baseNutrition.protein * quantity;
    nutritionValues.original.carbs += baseNutrition.carbs * quantity;
    nutritionValues.original.fat += baseNutrition.fat * quantity;

    // Check for healthy substitute
    const substitute = getHealthySubstitute(ingredient.ingredient);
    if (substitute) {
      const substituteNutrition = estimateNutrition(substitute.ingredient);
      const adjustedQuantity = quantity * (substitute.ratio || 1);

      // Add to healthy values
      nutritionValues.healthy.calories += substituteNutrition.calories * adjustedQuantity;
      nutritionValues.healthy.protein += substituteNutrition.protein * adjustedQuantity;
      nutritionValues.healthy.carbs += substituteNutrition.carbs * adjustedQuantity;
      nutritionValues.healthy.fat += substituteNutrition.fat * adjustedQuantity;
    } else {
      // If no substitute, use original values
      nutritionValues.healthy.calories += baseNutrition.calories * quantity;
      nutritionValues.healthy.protein += baseNutrition.protein * quantity;
      nutritionValues.healthy.carbs += baseNutrition.carbs * quantity;
      nutritionValues.healthy.fat += baseNutrition.fat * quantity;
    }
  });

  // Round all values
  Object.keys(nutritionValues).forEach(version => {
    Object.keys(nutritionValues[version]).forEach(nutrient => {
      nutritionValues[version][nutrient] = Math.round(nutritionValues[version][nutrient]);
    });
  });

  return nutritionValues;
};

// Calculate calorie savings for each substitution
export const calculateCalorieSavings = {
  'butter_to_greek_yogurt': 70,
  'sugar_to_monk_fruit_sweetener': 45,
  'white_flour_to_almond_flour': 20,
  'cream_to_coconut_milk': 50,
  'pasta_to_zucchini_noodles': 200,
  'rice_to_cauliflower_rice': 100,
  'bread_crumbs_to_ground_almonds': 30,
  'vegetable_oil_to_applesauce': 120,
  'mayonnaise_to_mashed_avocado': 90,
  'sour_cream_to_greek_yogurt': 45
};

// Adjust quantity based on substitution ratio
export const adjustQuantity = (substituteName, originalQuantity) => {
  const substitution = Object.values(healthySwaps).find(
    swap => swap.ingredient.toLowerCase().replace(/\s+/g, '_') === substituteName
  );
  
  if (substitution && substitution.ratio) {
    return originalQuantity * substitution.ratio;
  }
  
  return originalQuantity;
};

// Get adjusted cooking instructions for substitutions
export const getAdjustedCookingInstructions = (originalIngredient, substituteName) => {
  const adjustments = {
    'zucchini_noodles': {
      temp: -200,
      time: 'x0.25',
      note: 'Zucchini noodles only need 2-3 minutes of cooking to prevent becoming mushy'
    },
    'cauliflower_rice': {
      temp: 0,
      time: 'x0.5',
      note: 'Steam or sauté briefly to maintain texture and nutrients'
    },
    'almond_flour': {
      temp: -25,
      time: 'x0.8',
      note: 'Almond flour browns more quickly than regular flour'
    },
    'coconut_milk': {
      temp: -25,
      time: 'x0.9',
      note: 'Reduce heat slightly to prevent separation'
    },
    'greek_yogurt': {
      temp: -50,
      time: 'x0.75',
      note: 'Use lower temperature to prevent curdling'
    },
    'applesauce': {
      temp: 0,
      time: 'x1.1',
      note: 'May need slightly longer baking time for proper moisture content'
    },
    'monk_fruit_sweetener': {
      temp: -25,
      time: 'x0.9',
      note: 'Reduce temperature slightly as it browns faster than sugar'
    },
    'ground_almonds': {
      temp: -25,
      time: 'x0.8',
      note: 'Watch carefully as nuts can burn quickly'
    }
  };

  return adjustments[substituteName] || { temp: 0, time: 'x1', note: 'No specific adjustments needed' };
};

// Helper function to convert common measurements
export const convertMeasurements = (quantity, fromUnit, toUnit) => {
  const conversions = {
    cups_to_ml: 236.588,
    tbsp_to_ml: 14.787,
    tsp_to_ml: 4.929,
    oz_to_g: 28.3495,
    lb_to_g: 453.592,
    inch_to_cm: 2.54
  };
  
  const key = `${fromUnit}_to_${toUnit}`;
  if (conversions[key]) {
    return quantity * conversions[key];
  }
  
  return quantity;
};

// Helper function to adjust serving sizes
export const adjustServings = (ingredients, originalServings, newServings) => {
  if (!ingredients || !Array.isArray(ingredients)) return [];
  
  const ratio = newServings / originalServings;
  
  return ingredients.map(ingredient => ({
    ...ingredient,
    quantity: (parseFloat(ingredient.quantity) * ratio).toFixed(2)
  }));
};