import { Mistral } from "@mistralai/mistralai";


const apiKey = import.meta.env.VITE_MISTRAL_API_KEY;

const client = new Mistral({ apiKey });

export async function analyzeIngredients(ingredients_list) {
  try {
    const chatResponse = await client.chat.complete({
      model: "mistral-small-latest",
 messages: [
    {
        "role": "system",
        "content": `You are a nutrition analysis assistant.

Rules:
1️⃣ Detect the language of the user input (English or French). The response must be entirely in the same language.
2️⃣ If the input is not edible food items (e.g., "stone", "chair"), respond with a warning in the same language: 
   - English: "⚠️ Input must describe food ingredients."
   - French: "⚠️ L'entrée doit décrire des ingrédients alimentaires."
3️⃣ If the input is valid, analyze the ingredients list and:
   - Estimate reasonable weights/volumes for any ingredient without a specific quantity.
     Examples: 
       - "1 medium banana" → 120 g
       - "1 cup milk" → 240 ml
       - "1 tbsp peanut butter" → 15 g
   - Calculate approximate nutritional values (Calories, Proteins, Carbohydrates, Fats) for each ingredient and for the total.
4️⃣ Output format:
   - **Markdown**, ready to render in React.
   - Include a table for per-ingredient nutrition, total nutrition, estimated weights, and a short summary.
5️⃣ Quantities may be in grams, milliliters, spoons, cups, bowls, or pieces. Use standard approximations when units are missing or unclear.`
    },
    {
        "role": "user",
        "content": "1 medium banana, 2 tablespoons of peanut butter, 200 ml semi-skimmed milk"
    },
    {
        "role": "assistant",
        "content": `### 🍽️ Nutrition Summary

**Total values:**
- Calories: 350 kcal  
- Proteins: 14 g  
- Carbohydrates: 35 g  
- Fats: 18 g  

**Per ingredient (with estimated weights/volumes):**
| Ingredient | Estimated weight/volume | Calories (kcal) | Proteins (g) | Carbohydrates (g) | Fats (g) |
|-------------|-----------------------|----------------|---------------|-----------------|-----------|
| Banana | 120 g | 90 | 1 | 23 | 0 |
| Peanut Butter | 30 g (2 tbsp) | 190 | 8 | 6 | 16 |
| Semi-skimmed Milk | 200 ml | 70 | 5 | 6 | 3 |

**Summary:** Protein-rich and energy-dense smoothie.`
    },
    {
        "role": "user",
        "content": "1 banane moyenne, 2 cuillères à soupe de beurre de cacahuète, lait demi-écrémé"
    },
    {
        "role": "assistant",
        "content": `### 🍽️ Résumé Nutritionnel

**Valeurs totales :**
- Calories : 350 kcal  
- Protéines : 14 g  
- Glucides : 35 g  
- Lipides : 18 g  

**Par ingrédient (avec poids/volume estimé) :**
| Ingrédient | Poids/volume estimé | Calories (kcal) | Protéines (g) | Glucides (g) | Lipides (g) |
|------------|-------------------|----------------|---------------|-------------|-------------|
| Banane | 120 g | 90 | 1 | 23 | 0 |
| Beurre de cacahuète | 30 g (2 c. à soupe) | 190 | 8 | 6 | 16 |
| Lait demi-écrémé | 200 ml | 70 | 5 | 6 | 3 |

**Résumé :** Smoothie riche en protéines et en énergie.`
    },
    {
        "role": "user",
        "content": "une pierre et une feuille"
    },
    {
        "role": "assistant",
        "content": "⚠️ L'entrée doit décrire des ingrédients alimentaires."
    },
    {
        "role": "user",
        "content": ingredients_list
    }
]
    });


    const content = chatResponse.choices[0].message.content;

    return content;
  } catch (error) {
    console.error("Nutrition analysis error:", error);
    return { error: "An error occurred while analyzing ingredients." };
  }
}
