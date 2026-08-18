import { useState } from "react";
import "./App.css";

type Choice = { text: string; nextScene: string;};

type Scene = {id: string; title: string; text: string; illustration: string; choices: Choice[];};

const story: Scene[] = [
  {
    id: "inicio",
    title: "Los tres cerditos",
    text: "Había una vez tres cerditos hermanos que decidieron construir cada uno su propia casa.",
    illustration: "🐷 🐷 🐷",
    choices: [
      {
        text: "Comenzar la historia",
        nextScene: "casas",
      },
    ],
  },
  {
    id: "casas",
    title: "Tres casas diferentes",
    text: "El primer cerdito construyó una casa de paja. El segundo eligió madera y el tercero trabajó con ladrillos.",
    illustration: "🌾 🪵 🧱",
    choices: [
      {
        text: "Continuar",
        nextScene: "lobo",
      },
    ],
  },
  {
    id: "lobo",
    title: "El lobo aparece",
    text: "Mientras los cerditos descansaban, un lobo hambriento llegó al bosque y encontró la casa de paja.",
    illustration: "🐺",
    choices: [
      {
        text: "Avisar al cerdito",
        nextScene: "advertencia",
      },
      {
        text: "Esconderse y observar",
        nextScene: "casaPaja",
      },
    ],
  },
  {
    id: "advertencia",
    title: "¡Cuidado, viene el lobo!",
    text: "Gracias a tu aviso, el cerdito salió rápidamente y corrió hacia la casa de madera de su hermano.",
    illustration: "🐷💨",
    choices: [
      {
        text: "Seguir a los cerditos",
        nextScene: "casaMadera",
      },
    ],
  },
  {
    id: "casaPaja",
    title: "La casa de paja",
    text: "El lobo sopló con todas sus fuerzas. La casa de paja salió volando y el cerdito escapó hacia la casa de madera.",
    illustration: "🌬️🌾",
    choices: [
      {
        text: "Continuar",
        nextScene: "casaMadera",
      },
    ],
  },
  {
    id: "casaMadera",
    title: "La casa de madera",
    text: "Los dos cerditos se refugiaron dentro de la casa. El lobo volvió a respirar profundamente y se preparó para soplar.",
    illustration: "🐷🏠🐷",
    choices: [
      {
        text: "Ayudarlos a reforzar la puerta",
        nextScene: "refuerzo",
      },
      {
        text: "Decirles que corran a la casa de ladrillos",
        nextScene: "ladrillos",
      },
    ],
  },
  {
    id: "refuerzo",
    title: "Una buena idea",
    text: "Reforzaron la puerta, pero el lobo sopló tan fuerte que toda la casa comenzó a temblar. Era momento de escapar.",
    illustration: "🚪🔨",
    choices: [
      {
        text: "Correr a la casa de ladrillos",
        nextScene: "ladrillos",
      },
    ],
  },
  {
    id: "ladrillos",
    title: "La casa más fuerte",
    text: "Los tres hermanos se reunieron en la casa de ladrillos. El lobo sopló una y otra vez, pero no consiguió derribarla.",
    illustration: "🐷🐷🐷 🧱",
    choices: [
      {
        text: "Ver el final",
        nextScene: "final",
      },
    ],
  },
  {
    id: "final",
    title: "Juntos estaban seguros",
    text: "El lobo se marchó cansado y los tres cerditos comprendieron que trabajar con paciencia y ayudarse era la mejor decisión.",
    illustration: "🎉🐷🏠",
    choices: [],
  },
];

function App() {
  const [currentSceneId, setCurrentSceneId] = useState("inicio");
  const [history, setHistory] = useState<string[]>([]);

  const currentScene = story.find(
    (scene) => scene.id === currentSceneId,
  );

  if (!currentScene) {
    return <p>No se encontró esta parte de la historia.</p>;
  }

  const selectChoice = (nextScene: string) => {
    setHistory((previousHistory) => [
      ...previousHistory,
      currentSceneId,
    ]);

    setCurrentSceneId(nextScene);
  };

  const goBack = () => {
    const previousScene = history.at(-1);

    if (!previousScene) return;

    setCurrentSceneId(previousScene);
    setHistory((previousHistory) =>
      previousHistory.slice(0, -1),
    );
  };

  const restartStory = () => {
    setCurrentSceneId("inicio");
    setHistory([]);
  };

  return (
    <main className="app">
      <header className="header">
        <p className="logo">📖 InteractiveBook</p>

        <button
          className="restartButton"
          onClick={restartStory}
          type="button"
        >
          Reiniciar
        </button>
      </header>

      <section className="book">
        <div className="illustration">
          {currentScene.illustration}
        </div>

        <div className="page">
          <p className="storyName">Los tres cerditos</p>

          <h1>{currentScene.title}</h1>

          <p className="storyText">{currentScene.text}</p>

          <div className="choices">
            {currentScene.choices.map((choice) => (
              <button
                key={choice.text}
                onClick={() =>
                  selectChoice(choice.nextScene)
                }
                type="button"
              >
                {choice.text}
              </button>
            ))}
          </div>

          {currentScene.choices.length === 0 && (
            <button
              className="playAgainButton"
              onClick={restartStory}
              type="button"
            >
              Leer nuevamente
            </button>
          )}

          <button
            className="backButton"
            onClick={goBack}
            disabled={history.length === 0}
            type="button"
          >
            ← Volver
          </button>
        </div>
      </section>
    </main>
  );
}

export default App;