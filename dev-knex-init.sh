#!/bin/bash

echo "--------------------------------------------------------------------"
echo "starting -- recreating tables"
echo "--------------------------------------------------------------------"
npx knex migrate:rollback --all
npx knex migrate:latest --env development
echo "--------------------------------------------------------------------"
echo "finished -- recreating tables"
echo "--------------------------------------------------------------------"
echo "starting -- applying seeds"
echo "--------------------------------------------------------------------"
npx knex seed:run --specific=roles_seed.js --env development
npx knex seed:run --specific=users_seed.js --env development
npx knex seed:run --specific=teams_seed.js --env development
npx knex seed:run --specific=teams_members_seed.js --env development
npx knex seed:run --specific=exercises_seed.js --env development
npx knex seed:run --specific=trainings_seed.js --env development
npx knex seed:run --specific=training_videos_seed.js --env development
npx knex seed:run --specific=training_scores_seed.js --env development
npx knex seed:run --specific=tournaments_seed.js --env development
npx knex seed:run --specific=tournaments_scores_seed.js --env development
npx knex seed:run --specific=announcements_seed.js --env development
echo "--------------------------------------------------------------------"
echo "finished -- applying seeds"
echo "--------------------------------------------------------------------"