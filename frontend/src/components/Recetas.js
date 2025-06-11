import React, { useState } from "react";

export const Recetas = () => {
  const [preferencias, setPreferencias] = useState({
    vegano: false,
    picante: false,
    sinPescado: false,
    sinVerdura: false,
    sinLegumbres: false,
    sinCarne: false,
  });
  const [recetas, setRecetas] = useState([]);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setPreferencias({ ...preferencias, [name]: checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch("http://localhost:5000/api/generate-recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          gustos: Object.entries(preferencias)
            .filter(([_, valor]) => valor)
            .map(([clave]) => clave)
        })
      });

      if (!response.ok) {
        throw new Error("Error en la solicitud");
      }

      const data = await response.json();
      setRecetas(data);
    } catch (err) {
      setError("No se pudieron cargar las recetas.");
      console.error(err);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Generar Recetas Personalizadas</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(preferencias).map((pref) => (
          <div className="form-check" key={pref}>
            <input
              type="checkbox"
              name={pref}
              onChange={handleChange}
              className="form-check-input"
              id={pref}
            />
            <label className="form-check-label" htmlFor={pref}>
              {pref.replace("sin", "No me gusta ").replace(/([A-Z])/g, " $1")}
            </label>
          </div>
        ))}
        <button type="submit" className="btn btn-primary mt-3">Generar Recetas</button>
      </form>

      {error && <div className="alert alert-danger mt-3">{error}</div>}

      <div className="mt-4">
        <h4>Recetas Sugeridas:</h4>
        <ul className="list-group">
          {recetas.map((receta, index) => (
            <li key={index} className="list-group-item">
              <strong>{receta.title}</strong><br />
              {receta.image && <img src={receta.image} alt={receta.title} style={{maxWidth:"200px"}} />}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};