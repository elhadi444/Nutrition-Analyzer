import { useState } from "react"
import Summary from "./Summary";
import FoodList from "./FoodList";
import { analyzeIngredients } from "../services/nutritionService";

export default function Main() {

    const [list, setList] = useState([]); //"eggs", "pasta", "ground beef"

    const [analyse, setAnalyse] = useState("")

    const [analysed, setAnalysed] = useState(false)


    function addFood(formData) {
        const newfood = formData.get("food")
        if (!newfood?.trim()) return;

        if (analysed) {
            setList([newfood]);
            setAnalyse("");
            setAnalysed(false);
        } else {

            setList(prev => [...prev, newfood]);
        }
    }

    async function anlyzeFood() {
        const meal_string = list.join(", ");
        const analysis = await analyzeIngredients(meal_string);
        // console.log(analysis);
        setAnalyse(analysis);
        setAnalysed(true);
    }

    return (
        <main>
            <form action={addFood} className="add-form">
                <input
                    aria-label="Add food"
                    type="text"
                    placeholder="e.g. 2 eggs "
                    name="food"
                />
                <button>Add food</button>
            </form>

            {
                list.length > 0 &&
                <FoodList
                    list={list}
                    anlyzeFood={anlyzeFood}
                />
            }
            {analyse && <Summary analyse={analyse} />}
        </main>
    )
}