import React, { useState } from "react";

export default function Home({ setView }) {
    const [prefs, setPrefs] = useState({
        vegan: false,
        spicy: false,
        noFish: false,
        noVeggies: false,
        noLegumes: false,
        noMeat: false
    });

    const handleChange = e => {
        setPrefs({ ...prefs, [e.target.name]: e.target.checked });
    };

    const handleSubmit = async () => {
        const res = await fetch("http://localhost:5000/api/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(prefs)
        });
        const data = await res.json();
        localStorage.setItem("recetas", JSON.stringify(data.recipes));
        setView("recetas");
    };

    return (
        <div style={{ padding: "1rem" }}>
            <h2>Selecciona tus preferencias:</h2>
            {Object.entries(prefs).map(([k, v]) => (
                <div key={k}>
                    <label>
                        <input type="checkbox" name={k} checked={v} onChange={handleChange} />
                        {k}
                    </label>
                </div>
            ))}
            <button onClick={handleSubmit}>Generar recetas</button>
        </div>
    );
}