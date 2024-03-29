exports.seed = (knex, Promise) => {
  return knex("exercises_scores")
    .del()
    .then(() => {
      return knex("exercises_scores").insert([
        {
          user_id: 5,
          training_id: 1,
          exercise_id: 1,
          time_duration: 0,
          sets: 2,
          reps: 100,
          weight: 5,
          is_test: false,
          created_at: knex.fn.now(),
          updated_at: knex.fn.now(),
        },
        {
          user_id: 5,
          training_id: 1,
          exercise_id: 3,
          time_duration: 100,
          sets: 2,
          reps: 4,
          weight: 0,
          is_test: false,
          created_at: knex.fn.now(),
          updated_at: knex.fn.now(),
        },
        {
          user_id: 5,
          training_id: 1,
          exercise_id: 5,
          time_duration: 0,
          sets: 3,
          reps: 50,
          weight: 3,
          is_test: false,
          created_at: knex.fn.now(),
          updated_at: knex.fn.now(),
        },
        {
          user_id: 6,
          training_id: 2,
          exercise_id: 2,
          time_duration: 0,
          sets: 2,
          reps: 100,
          weight: 5,
          is_test: false,
          created_at: knex.fn.now(),
          updated_at: knex.fn.now(),
        },
        {
          user_id: 6,
          training_id: 2,
          exercise_id: 3,
          time_duration: 100,
          sets: 2,
          reps: 4,
          weight: 0,
          is_test: false,
          created_at: knex.fn.now(),
          updated_at: knex.fn.now(),
        },
        {
          user_id: 6,
          training_id: 2,
          exercise_id: 5,
          time_duration: 0,
          sets: 3,
          reps: 50,
          weight: 3,
          is_test: false,
          created_at: knex.fn.now(),
          updated_at: knex.fn.now(),
        },
        {
          user_id: 7,
          training_id: 3,
          exercise_id: 3,
          time_duration: 0,
          sets: 1,
          reps: 1,
          weight: 0,
          is_test: false,
          created_at: "2022-04-01T19:22:31.529Z",
          updated_at: knex.fn.now(),
        },
        {
          user_id: 7,
          training_id: 3,
          exercise_id: 3,
          time_duration: 0,
          sets: 1,
          reps: 1,
          weight: 0,
          is_test: false,
          created_at: "2022-04-02T19:22:31.529Z",
          updated_at: knex.fn.now(),
        },
        {
          user_id: 7,
          training_id: 3,
          exercise_id: 3,
          time_duration: 0,
          sets: 2,
          reps: 1,
          weight: 0,
          is_test: false,
          created_at: "2022-04-03T19:22:31.529Z",
          updated_at: knex.fn.now(),
        },
        {
          user_id: 7,
          training_id: 3,
          exercise_id: 3,
          time_duration: 0,
          sets: 3,
          reps: 1,
          weight: 0,
          is_test: false,
          created_at: "2022-04-04T19:22:31.529Z",
          updated_at: knex.fn.now(),
        },
        {
          user_id: 7,
          training_id: 3,
          exercise_id: 3,
          time_duration: 0,
          sets: 3,
          reps: 1,
          weight: 0,
          is_test: false,
          created_at: "2022-04-05T19:22:31.529Z",
          updated_at: knex.fn.now(),
        },
        {
          user_id: 7,
          training_id: 3,
          exercise_id: 3,
          time_duration: 0,
          sets: 5,
          reps: 1,
          weight: 0,
          is_test: false,
          created_at: "2022-04-06T19:22:31.529Z",
          updated_at: knex.fn.now(),
        },
        {
          user_id: 7,
          training_id: 3,
          exercise_id: 3,
          time_duration: 0,
          sets: 3,
          reps: 1,
          weight: 0,
          is_test: false,
          created_at: "2022-04-07T19:22:31.529Z",
          updated_at: knex.fn.now(),
        },
        {
          user_id: 7,
          training_id: 3,
          exercise_id: 3,
          time_duration: 0,
          sets: 5,
          reps: 1,
          weight: 0,
          is_test: false,
          created_at: "2022-04-08T19:22:31.529Z",
          updated_at: knex.fn.now(),
        },
        {
          user_id: 7,
          training_id: 3,
          exercise_id: 3,
          time_duration: 0,
          sets: 7,
          reps: 1,
          weight: 0,
          is_test: false,
          created_at: "2022-04-09T19:22:31.529Z",
          updated_at: knex.fn.now(),
        },
        {
          user_id: 7,
          training_id: 3,
          exercise_id: 3,
          time_duration: 0,
          sets: 8,
          reps: 1,
          weight: 0,
          is_test: false,
          created_at: "2022-04-10T19:22:31.529Z",
          updated_at: knex.fn.now(),
        },
        {
          user_id: 7,
          training_id: 3,
          exercise_id: 3,
          time_duration: 0,
          sets: 7,
          reps: 1,
          weight: 0,
          is_test: false,
          created_at: "2022-04-11T19:22:31.529Z",
          updated_at: knex.fn.now(),
        },
        {
          user_id: 7,
          training_id: 3,
          exercise_id: 4,
          time_duration: 0.2,
          sets: 2,
          reps: 4,
          weight: 0,
          is_test: false,
          created_at: "2022-04-01T19:22:31.529Z",
          updated_at: knex.fn.now(),
        },
        {
          user_id: 7,
          training_id: 3,
          exercise_id: 4,
          time_duration: 0.22,
          sets: 2,
          reps: 4,
          weight: 0,
          is_test: false,
          created_at: "2022-04-03T19:22:31.529Z",
          updated_at: knex.fn.now(),
        },
        {
          user_id: 7,
          training_id: 3,
          exercise_id: 4,
          time_duration: 0.26,
          sets: 2,
          reps: 4,
          weight: 0,
          is_test: false,
          created_at: "2022-04-05T19:22:31.529Z",
          updated_at: knex.fn.now(),
        },
        {
          user_id: 7,
          training_id: 3,
          exercise_id: 4,
          time_duration: 0.31,
          sets: 2,
          reps: 4,
          weight: 0,
          is_test: false,
          created_at: "2022-04-20T20:22:31.529Z",
          updated_at: knex.fn.now(),
        },
        {
          user_id: 7,
          training_id: 3,
          exercise_id: 4,
          time_duration: 0.21,
          sets: 2,
          reps: 4,
          weight: 0,
          is_test: false,
          created_at: "2022-04-21T19:22:31.529Z",
          updated_at: knex.fn.now(),
        },
        {
          user_id: 7,
          training_id: 3,
          exercise_id: 4,
          time_duration: 0.27,
          sets: 2,
          reps: 4,
          weight: 0,
          is_test: false,
          created_at: "2022-04-21T19:22:31.529Z",
          updated_at: knex.fn.now(),
        },
        {
          user_id: 7,
          training_id: 3,
          exercise_id: 4,
          time_duration: 0.4,
          sets: 2,
          reps: 4,
          weight: 0,
          is_test: false,
          created_at: "2022-04-22T19:22:31.529Z",
          updated_at: knex.fn.now(),
        },
        {
          user_id: 7,
          training_id: 3,
          exercise_id: 4,
          time_duration: 0.55,
          sets: 2,
          reps: 4,
          weight: 0,
          is_test: false,
          created_at: "2022-04-23T19:22:31.529Z",
          updated_at: knex.fn.now(),
        },
        {
          user_id: 7,
          training_id: 3,
          exercise_id: 4,
          time_duration: 0.52,
          sets: 2,
          reps: 4,
          weight: 0,
          is_test: false,
          created_at: "2022-04-24T19:22:31.529Z",
          updated_at: knex.fn.now(),
        },
        {
          user_id: 7,
          training_id: 3,
          exercise_id: 4,
          time_duration: 0.42,
          sets: 2,
          reps: 4,
          weight: 0,
          is_test: false,
          created_at: "2022-05-01T19:22:31.529Z",
          updated_at: knex.fn.now(),
        },
        {
          user_id: 7,
          training_id: 3,
          exercise_id: 5,
          time_duration: 0,
          sets: 3,
          reps: 10,
          weight: 5,
          is_test: false,
          created_at: "2022-05-02T19:22:31.529Z",
          updated_at: knex.fn.now(),
        },
        {
          user_id: 7,
          training_id: 3,
          exercise_id: 5,
          time_duration: 0,
          sets: 3,
          reps: 10,
          weight: 5,
          is_test: false,
          created_at: "2022-05-03T19:22:31.529Z",
          updated_at: knex.fn.now(),
        },
        {
          user_id: 7,
          training_id: 3,
          exercise_id: 5,
          time_duration: 0,
          sets: 3,
          reps: 10,
          weight: 8,
          is_test: false,
          created_at: "2022-05-04T19:22:31.529Z",
          updated_at: knex.fn.now(),
        },
        {
          user_id: 7,
          training_id: 3,
          exercise_id: 5,
          time_duration: 0,
          sets: 3,
          reps: 12,
          weight: 9,
          is_test: false,
          created_at: "2022-05-05T19:22:31.529Z",
          updated_at: knex.fn.now(),
        },
        {
          user_id: 7,
          training_id: 3,
          exercise_id: 5,
          time_duration: 0,
          sets: 3,
          reps: 10,
          weight: 15,
          is_test: false,
          created_at: "2022-05-06T19:22:31.529Z",
          updated_at: knex.fn.now(),
        },
        {
          user_id: 7,
          training_id: 3,
          exercise_id: 5,
          time_duration: 0,
          sets: 3,
          reps: 11,
          weight: 17,
          is_test: false,
          created_at: "2022-05-07T19:22:31.529Z",
          updated_at: knex.fn.now(),
        },
      ]);
    });
};
