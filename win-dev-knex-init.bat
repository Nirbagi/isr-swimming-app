ECHO "starting -- recreating tables"
call npx knex migrate:rollback --all && (
    call npx knex migrate:latest --env development && (
        ECHO "finished -- recreating tables"
        ECHO "starting -- applying seeds"
        call npx knex seed:run --specific=roles_seed.js --env development && (
            call npx knex seed:run --specific=users_seed.js --env development && (
                call npx knex seed:run --specific=teams_seed.js --env development && (
                    call npx knex seed:run --specific=teams_members_seed.js --env development && (
                        call npx knex seed:run --specific=exercises_seed.js --env development && (
                            call npx knex seed:run --specific=trainings_seed.js --env development && (
                                call npx knex seed:run --specific=training_videos_seed.js --env development && (
                                    call npx knex seed:run --specific=training_scores_seed.js --env development && (
                                        call npx knex seed:run --specific=tournaments_seed.js --env development && (
                                            call npx knex seed:run --specific=tournaments_scores_seed.js --env development && (
                                                call npx knex seed:run --specific=announcements_seed.js --env development && (
                                                    ECHO "finished -- applying seeds"
                                                )
                                            )
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            )
        )
    )
)







