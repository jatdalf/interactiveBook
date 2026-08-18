import { useState } from "react";
import coverImage from "./assets/lola-rosy-cover.png";
import ThreeLittlePigs from "./components/ThreeLittlePigs";
import "./App.css";

export type Language = "es" | "en";

type Screen = "cover" | "stories" | "threeLittlePigs";

const uiText = {
  es: {
    coverEyebrow: "Historias para compartir",
    coverTitle: "Lola Rosy,",
    coverTitleAccent: "cuentos",
    coverDescription:
      "Un rincón lleno de aventuras, decisiones y personajes inolvidables.",
    chooseStory: "Elegir cuento",
    cover: "Portada",
    libraryTitle: "Elegí un cuento",
    libraryDescription:
      "Seleccioná una historia para comenzar la aventura.",
    category: "Cuento interactivo",
    storyTitle: "Los tres cerditos",
    storyDescription:
      "Acompañá a los tres hermanos y ayudalos a tomar decisiones cuando aparezca el lobo.",
    readStory: "Leer cuento",
    language: "Idioma",
  },
  en: {
    coverEyebrow: "Stories to share",
    coverTitle: "Lola Rosy,",
    coverTitleAccent: "stories",
    coverDescription:
      "A special place filled with adventures, choices and unforgettable characters.",
    chooseStory: "Choose a story",
    cover: "Home",
    libraryTitle: "Choose a story",
    libraryDescription:
      "Select a story and begin the adventure.",
    category: "Interactive story",
    storyTitle: "The Three Little Pigs",
    storyDescription:
      "Join the three brothers and help them make decisions when the wolf appears.",
    readStory: "Read story",
    language: "Language",
  },
};

function App() {
  const [screen, setScreen] = useState<Screen>("cover");
  const [language, setLanguage] = useState<Language>("es");

  const text = uiText[language];

  const languageSelector = (
    <label className="globalLanguageSelector">
      <span>{text.language}</span>

      <select
        value={language}
        onChange={(event) =>
          setLanguage(event.target.value as Language)
        }
        aria-label={text.language}
      >
        <option value="es">🇦🇷 Español</option>
        <option value="en">🇬🇧 English</option>
      </select>
    </label>
  );

  if (screen === "threeLittlePigs") {
    return (
      <ThreeLittlePigs
        language={language}
        setLanguage={setLanguage}
        onExit={() => setScreen("stories")}
      />
    );
  }

  if (screen === "stories") {
    return (
      <main className="library">
        <header className="libraryTopbar">
          <button
            className="libraryButton"
            onClick={() => setScreen("cover")}
            type="button"
          >
            ← {text.cover}
          </button>

          {languageSelector}
        </header>

        <section className="libraryIntroduction">
          <h1>{text.libraryTitle}</h1>
          <p>{text.libraryDescription}</p>
        </section>

        <section className="storyGrid">
          <article className="storyCard">
            <div className="storyCardImage">
              <span aria-hidden="true">🐷 🐷 🐷</span>
            </div>

            <div className="storyCardContent">
              <p className="storyCategory">
                {text.category}
              </p>

              <h2>{text.storyTitle}</h2>

              <p>{text.storyDescription}</p>

              <button
                onClick={() =>
                  setScreen("threeLittlePigs")
                }
                type="button"
              >
                {text.readStory}
              </button>
            </div>
          </article>
        </section>
      </main>
    );
  }

  return (
    <main className="cover">
      <img
        className="coverImage"
        src={coverImage}
        alt="Lola Rosy leyendo un cuento a los niños"
      />

      <div className="coverShade" />

      <header className="coverTopbar">
        <p className="coverBrand">📖 Lola Rosy</p>
        {languageSelector}
      </header>

      <section className="coverContent">
        <p className="coverEyebrow">
          {text.coverEyebrow}
        </p>

        <h1>
          {text.coverTitle}
          <span>{text.coverTitleAccent}</span>
        </h1>

        <p className="coverDescription">
          {text.coverDescription}
        </p>

        <button
          className="chooseStoryButton"
          onClick={() => setScreen("stories")}
          type="button"
        >
          {text.chooseStory}
          <span aria-hidden="true">→</span>
        </button>
      </section>
    </main>
  );
}

export default App;