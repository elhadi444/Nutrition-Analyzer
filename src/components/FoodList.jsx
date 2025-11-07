export default function FoodList({list, anlyzeFood}) {

     const foodListItems = list.map(food => (
        <li key={food}>{food}</li>
    ))

    return (
        <section className="ingredients-section">
            <h2>Meal to analyse</h2>
            <ul className="ingredients-list" aria-live="polite">{foodListItems}</ul>
            {list.length >= 0 &&
                <div className="get-recipe-container">
                    <div>
                        <h3>Ready to analyse ?</h3>
                        <p>Estimate the total nutritional values of a meal.</p>
                    </div>
                    <button onClick={() => anlyzeFood()}>Get nutritional values</button>
                </div>
            }
        </section>
    )
}