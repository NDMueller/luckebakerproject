CREATE TABLE IF NOT EXISTS recipes(
recipe_id SERIAL PRIMARY KEY,
title TEXT,
instructions TEXT,
description TEXT,
userID INTEGER
)
