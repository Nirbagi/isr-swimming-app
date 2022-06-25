exports.seed = (knex, Promise) => {
  return knex("announcements")
    .del()
    .then(() => {
      return knex("announcements").insert([
        {
          author_id: 1,
          body: "השחיין הישראלי כריס פיצ'וגין זינק הערב (שני) לחצי גמר אליפות העולם בבודפשט במשחה ל-50 מטר חזה וסיים במקום ה-11. פיצ'וגין בן ה-20 קבע זמן של 27.42 שניות, שלוש מאיות מהר יותר מהבוקר, אך חסרו לו 22 מאיות כדי להעפיל לגמר.",
          image_link: null,
          created_at: knex.fn.now(),
          updated_at: knex.fn.now(),
        },
        {
          author_id: 1,
          body: "רון פולונסקי שבר הערב (רביעי) את אחד השיאים הוותיקים והאיכותיים בטבלת שיאי ישראל, הלא הוא שיאו של גל נבו מעידן החליפות ב-200 מעורב אישי מ-2009.",
          image_link: "https://www.isr.org.il/pics/_DSC3891(1).jpg",
          created_at: knex.fn.now(),
          updated_at: knex.fn.now(),
        },
        {
          author_id: 1,
          body: "שחיין הישראלי כריס פיצ'וגין זינק הערב (שני) לחצי גמר אליפות העולם בבודפשט במשחה ל-50 מטר חזה וסיים במקום ה-11. ",
          image_link: "https://www.isr.org.il/pics/_DSC0966.jpg",
          created_at: knex.fn.now(),
          updated_at: knex.fn.now(),
        },
        {
          author_id: 1,
          body: "האימון ביום ראשון שמתוכנן לשעה 16:30 , יידחה בחצי שעה",
          team_id: 1,
          created_at: knex.fn.now(),
          updated_at: knex.fn.now(),
        },
        {
          author_id: 1,
          body: "נא להביא נעליים סגורים לאימון הבא- אימון יבש",
          team_id: 2,
          created_at: knex.fn.now(),
          updated_at: knex.fn.now(),
        },
        {
          author_id: 1,
          body: "שימו לב ! ביום שלישי הקרוב 31/6 ייערך מבדק",
          team_id: 3,
          created_at: knex.fn.now(),
          updated_at: knex.fn.now(),
        },
      ]);
    });
};
