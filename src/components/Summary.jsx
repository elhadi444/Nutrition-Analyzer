import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function Summary({ analyse }) {
    const md = "### 🍽️ Nutrition Summary \n**Total values:** \n- Calories: 750 kcal - Proteins: 60 g - Carbohydrates: 80 g - Fats: 20 g"
    return (
        <section className="recipe-section">
            <h2>Analyse</h2>
            <article className="suggested-recipe-container">
            
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{analyse}</ReactMarkdown>
             
            </article>
        </section>
    )
}