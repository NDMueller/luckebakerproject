var app = require('../index.js')
var db = app.get('db')


var exports = module.exports = {};

exports.addRecipe = (req, res) => {
  var recipes_id;
  db.add_recipes([req.body.title, req.body.instructions, req.body.description], (err, response) => {
    if (err) {
      console.log(err)
    };
    console.log(response);
    recipe_id = response[0].recipe_id;
    db.addIngredients([recipe_id, req.body.ingredients], (err, response) => {
      console.log('3' + recipes_id);
      if (err) {
        console.log(err)
      };
      console.log('Recipe Recieved')
      res.status(200).send('Recipes Recieved');

    })
  });
}

exports.getRecipes = function(req, res) {
  db.getRecipes(function (err, response) {
    if (err) {
      console.log(err)
    };
    console.log('Sending Recipes')
    res.status(200).send(response);
  });
}
// exports.createIngredient=(req,res)=>{
// db.create_ingredient([req.ingredients],(err,response)=>{
//   console.log('Ingredients Recieved')
//   res.status(200).send('Sending Ingredients')
// });
// }
