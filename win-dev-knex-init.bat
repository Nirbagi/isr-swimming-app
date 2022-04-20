ECHO "--------------------------------------------------------------------"
ECHO "starting -- recreating tables"
ECHO "--------------------------------------------------------------------"
npx knex migrate:rollback --all
npx knex migrate:latest --env development
ECHO "--------------------------------------------------------------------"
ECHO "finished -- recreating tables"
ECHO "--------------------------------------------------------------------"
ECHO "starting -- applying seeds"
ECHO "--------------------------------------------------------------------"
npx knex seed:run --specific=roles_seed.js --env development
npx knex seed:run --specific=teams_seed.js --env development
npx knex seed:run --specific=users_seed.js --env development
npx knex seed:run --specific=teams_members_seed.js --env development
npx knex seed:run --specific=trainings_seed.js --env development
npx knex seed:run --specific=training_videos_seed.js --env development
npx knex seed:run --specific=training_scores_seed.js --env development
npx knex seed:run --specific=tournaments_seed.js --env development
npx knex seed:run --specific=tournaments_scores_seed.js --env development
npx knex seed:run --specific=announcements_seed.js --env development
ECHO "--------------------------------------------------------------------"
ECHO "finished -- applying seeds"
ECHO "--------------------------------------------------------------------"