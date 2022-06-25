exports.seed = (knex, Promise) => {
  return knex("training_videos")
    .del()
    .then(() => {
      return knex("training_videos").insert([
        {
          name: "תרגילים יבשים - חלק א",
          category: "DryTrain",
          sub_category: "coordination",
          link: "https://www.youtube.com/watch?v=s0fpyS2-wow",
        },
        {
          name: "תרגילים יבשים - חלק ב",
          category: "DryTrain",
          sub_category: "coordination",
          link: "https://www.youtube.com/watch?v=s9lK4GUDkb0",
        },
        {
          name: "תרגילים יבשים - חלק ג",
          category: "DryTrain",
          sub_category: "coordination",
          link: "https://www.youtube.com/watch?v=hBQRPCyLAxU",
        },
        {
          name: "הדרכה חתירה",
          category: "StyleExercise",
          sub_category: "free/rowing",
          link: "https://www.youtube.com/watch?v=K6cnuEI6KIM",
        },
        {
          name: "הדרכה בקטגוריית חזה רגליים",
          category: "StyleExercise",
          sub_category: "chest",
          link: "https://www.youtube.com/watch?v=laXZFRXqKkY",
        },
        {
          name: "הדרכה קטגוריית חתירה",
          category: "StyleExercise",
          sub_category: "free/rowing",
          link: "https://www.youtube.com/watch?v=zlfDaRV1jtk",
        },
        {
          name: "אליפות ישראל ארנה לצעירים - הצגת בוקר 22.2.22 ",
          category: "SelectedCompetitions",
          sub_category: "open-water",
          link: "https://www.youtube.com/watch?v=oZSQCivSiko",
        },
        {
          name: "אליפות ישראל צפון לגילאי 11-10",
          category: "SelectedCompetitions",
          sub_category: "pool-competition",
          link: "https://www.youtube.com/watch?v=qTe98PaW7Yk",
        },
        {
          name: "דריה גולובטי שוברת שיא ומנצחת",
          category: "SelectedCompetitions",
          sub_category: "pool-competition",
          link: "https://www.youtube.com/watch?v=5UIYdlT50ZY",
        },
        {
          name: "תחרות 2020 כינרת- קטעים נבחרים",
          category: "SelectedCompetitions",
          sub_category: "kineret",
          link: "https://www.youtube.com/watch?v=qTe98PaW7Yk",
        },
        {
          name: "מבדק בריכה",
          category: "Tests",
          sub_category: "pool",
          link: "https://www.youtube.com/watch?v=laXZFRXqKkY",
        },
        {
          name: "מבדק יבשה",
          category: "Tests",
          sub_category: "land",
          link: "https://www.youtube.com/watch?v=qTe98PaW7Yk",
        },
        {
          name: "סרטון פרפר א",
          category: "StyleExercise",
          sub_category: "butterfly",
          link: "https://www.youtube.com/watch?v=s0fpyS2-wow",
        },
        {
          name: "סרטון פרפר ב",
          category: "StyleExercise",
          sub_category: "butterfly",
          link: "https://www.youtube.com/watch?v=s9lK4GUDkb0",
        },
        {
          name: "סרטון פרפר ג",
          category: "StyleExercise",
          sub_category: "butterfly",
          link: "https://www.youtube.com/watch?v=hBQRPCyLAxU",
        },
        {
          name: "תרגול פרפר בריכה",
          category: "StyleExercise",
          sub_category: "butterfly",
          link: "https://www.youtube.com/watch?v=NVX6X964pbo",
        },
      ]);
    });
};
