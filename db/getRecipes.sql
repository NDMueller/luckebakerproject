select title, instructions, description, ingredients from recipes r
full join ingredients i on i.recipe_id = r.recipe_id
