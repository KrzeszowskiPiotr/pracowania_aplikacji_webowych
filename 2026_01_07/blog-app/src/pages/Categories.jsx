const Categories = () => {
    const categories = ["Programowanie", "Design", "Lifestyle", "Technologia"];
    return (
        <div>
            <h1>Kategorie</h1>
            <div className="category-list">
                {categories.map(cat => (
                    <div key={cat} className="category-item">{cat}</div>
                ))}
            </div>
        </div>
    );
};
export default Categories;