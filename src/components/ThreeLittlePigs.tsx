import { useState } from "react";
import "../App.css";
import type { Language } from "../App";
import image01 from "../assets/3pigs001.png";
import video02 from "../assets/3pigs002.mp4";
import video03 from "../assets/3pigs003.mp4";
import video05 from "../assets/3pigs005.mp4";

type Translation = { title: string; text: string;};
type Choice = { text: Record<Language, string>; nextScene: string;};
type Scene = {
  id: string;
  content: Record<Language, Translation>;
  illustration: string;
  mediaType?: "emoji" | "image" | "video";
  choices: Choice[];
};

type ThreeLittlePigsProps = {
  language: Language;
  setLanguage: (language: Language) => void;
  onExit: () => void;
};

const interfaceText = {
  es: {
    storyName: "Los tres cerditos",
    language: "Idioma",
    restart: "Reiniciar",
    back: "← Volver",
    readAgain: "Leer nuevamente",
    sceneNotFound: "No se encontró esta parte de la historia.",
  },
  en: {
    storyName: "The Three Little Pigs",
    language: "Language",
    restart: "Restart",
    back: "← Back",
    readAgain: "Read again",
    sceneNotFound: "This part of the story could not be found.",
  },
};

const story: Scene[] = [
  {
    id: "inicio",
    illustration: image01,
    mediaType: "image",
    content: {
      es: {
        title: "Los tres cerditos",
        text: "Había una vez tres cerditos hermanos que decidieron construir cada uno su propia casa.",
      },
      en: {
        title: "The Three Little Pigs",
        text: "Once upon a time, there were three little pig brothers who decided to build their own houses.",
      },
    },
    choices: [
      {
        text: {
          es: "Comenzar la historia",
          en: "Start the story",
        },
        nextScene: "casas",
      },
    ],
  },
  {
    id: "casas",
    illustration: video02,
    mediaType: "video",
    content: {
      es: {
        title: "Tres casas diferentes",
        text: "El primer cerdito construyó una casa de paja. El segundo eligió madera y el tercero trabajó con ladrillos.",
      },
      en: {
        title: "Three different houses",
        text: "The first little pig built a house of straw. The second chose wood, and the third worked with bricks.",
      },
    },
    choices: [
      {
        text: {
          es: "Continuar",
          en: "Continue",
        },
        nextScene: "lobo",
      },
    ],
  },
  {
    id: "lobo",
    illustration: video03,
    mediaType: "video",
    content: {
      es: {
        title: "El lobo aparece",
        text: "Mientras los cerditos descansaban, un lobo hambriento llegó al bosque y encontró la casa de paja.",
      },
      en: {
        title: "The wolf appears",
        text: "While the little pigs were resting, a hungry wolf arrived in the forest and found the house of straw.",
      },
    },
    choices: [
      {
        text: {
          es: "Avisar al cerdito",
          en: "Warn the little pig",
        },
        nextScene: "advertencia",
      },
      {
        text: {
          es: "Esconderse y observar",
          en: "Hide and watch",
        },
        nextScene: "casaPaja",
      },
    ],
  },
  {
    id: "advertencia",
    illustration: "🐷💨",
    content: {
      es: {
        title: "¡Cuidado, viene el lobo!",
        text: "Gracias a tu aviso, el cerdito salió rápidamente y corrió hacia la casa de madera de su hermano.",
      },
      en: {
        title: "Watch out! The wolf is coming!",
        text: "Thanks to your warning, the little pig quickly escaped and ran to his brother's wooden house.",
      },
    },
    choices: [
      {
        text: {
          es: "Seguir a los cerditos",
          en: "Follow the little pigs",
        },
        nextScene: "casaMadera",
      },
    ],
  },
  {
    id: "casaPaja",
    illustration: video05,
    mediaType: "video",
    content: {
      es: {
        title: "La casa de paja",
        text: "El lobo sopló con todas sus fuerzas. La casa de paja salió volando y el cerdito escapó hacia la casa de madera.",
      },
      en: {
        title: "The house of straw",
        text: "The wolf blew with all his might. The house of straw flew away, and the little pig escaped to the wooden house.",
      },
    },
    choices: [
      {
        text: {
          es: "Continuar",
          en: "Continue",
        },
        nextScene: "casaMadera",
      },
    ],
  },
  {
    id: "casaMadera",
    illustration: "🐷🏠🐷",
    content: {
      es: {
        title: "La casa de madera",
        text: "Los dos cerditos se refugiaron dentro de la casa. El lobo volvió a respirar profundamente y se preparó para soplar.",
      },
      en: {
        title: "The wooden house",
        text: "The two little pigs hid inside the house. The wolf took another deep breath and prepared to blow.",
      },
    },
    choices: [
      {
        text: {
          es: "Ayudarlos a reforzar la puerta",
          en: "Help them reinforce the door",
        },
        nextScene: "refuerzo",
      },
      {
        text: {
          es: "Decirles que corran a la casa de ladrillos",
          en: "Tell them to run to the brick house",
        },
        nextScene: "ladrillos",
      },
    ],
  },
  {
    id: "refuerzo",
    illustration: "🚪🔨",
    content: {
      es: {
        title: "Una buena idea",
        text: "Reforzaron la puerta, pero el lobo sopló tan fuerte que toda la casa comenzó a temblar. Era momento de escapar.",
      },
      en: {
        title: "A good idea",
        text: "They reinforced the door, but the wolf blew so hard that the entire house began to shake. It was time to escape.",
      },
    },
    choices: [
      {
        text: {
          es: "Correr a la casa de ladrillos",
          en: "Run to the brick house",
        },
        nextScene: "ladrillos",
      },
    ],
  },
  {
    id: "ladrillos",
    illustration: "🐷🐷🐷 🧱",
    content: {
      es: {
        title: "La casa más fuerte",
        text: "Los tres hermanos se reunieron en la casa de ladrillos. El lobo sopló una y otra vez, pero no consiguió derribarla.",
      },
      en: {
        title: "The strongest house",
        text: "The three brothers gathered inside the brick house. The wolf blew again and again, but he could not knock it down.",
      },
    },
    choices: [
      {
        text: {
          es: "Ver el final",
          en: "See the ending",
        },
        nextScene: "final",
      },
    ],
  },
  {
    id: "final",
    illustration: "🎉🐷🏠",
    content: {
      es: {
        title: "Juntos estaban seguros",
        text: "El lobo se marchó cansado y los tres cerditos comprendieron que trabajar con paciencia y ayudarse era la mejor decisión.",
      },
      en: {
        title: "They were safe together",
        text: "The wolf left exhausted, and the three little pigs learned that working patiently and helping one another was the best decision.",
      },
    },
    choices: [],
  },
];

function ThreeLittlePigs({language, setLanguage, onExit,}: ThreeLittlePigsProps) {

  const [currentSceneId, setCurrentSceneId] = useState("inicio");
  const [history, setHistory] = useState<string[]>([]);

  const labels = interfaceText[language];

  const currentScene = story.find(
    (scene) => scene.id === currentSceneId,
  );

  if (!currentScene) {
    return <p>{labels.sceneNotFound}</p>;
  }

  const currentContent = currentScene.content[language];

  const selectChoice = (nextScene: string) => {
    setHistory((previousHistory) => [
      ...previousHistory,
      currentSceneId,
    ]);

    setCurrentSceneId(nextScene);
  };

  const goBack = () => {
    const previousScene = history[history.length - 1];

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
      <button className="libraryButton" onClick={onExit} type="button" >
        ← {language === "es" ? "Cuentos" : "Stories"}
      </button>

  <div className="headerActions">
    <label className="languageSelector">

      <span>{labels.language}</span>
      <select value={language} onChange={(event) => setLanguage(event.target.value as Language)}>
        <option value="es">🇦🇷 Español</option>
        <option value="en">🇬🇧 English</option>
      </select>

    </label>

    <button className="restartButton" onClick={restartStory} type="button">{labels.restart}</button>
  
  </div>
</header>
      <section className="book">
        <div className="illustration">
        {currentScene.mediaType === "video" ? (
          <video className="storyMedia" src={currentScene.illustration} autoPlay loop muted playsInline
            aria-label={currentContent.title}
          />
        ) : currentScene.mediaType === "image" ? (
          <img className="storyMedia" src={currentScene.illustration} alt={currentContent.title}/>) : (
          <span className="storyEmoji">
            {currentScene.illustration}
          </span>
        )}
      </div>

        <div className="page">
          <p className="storyName">{labels.storyName}</p>
          <h1>{currentContent.title}</h1>
          <p className="storyText">
            {currentContent.text}
          </p>

          <div className="choices">
            {currentScene.choices.map((choice) => (
              <button key={choice.nextScene} onClick={() => selectChoice(choice.nextScene)}
                type="button">
                {choice.text[language]}
              </button>
            ))}
          </div>

          {currentScene.choices.length === 0 && (
            <button className="playAgainButton" onClick={restartStory} type="button">
              {labels.readAgain}
            </button>
          )}

          <button className="backButton" onClick={goBack} disabled={history.length === 0}
           type="button">
            {labels.back}
          </button>
        </div>
      </section>
    </main>
  );
}

export default ThreeLittlePigs;