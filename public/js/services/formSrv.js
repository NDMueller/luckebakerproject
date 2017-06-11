angular.module('bakerApp').service('formSrv', function ($http) {
  this.postRecipe = function (titleIn, instructionsIn, descriptionIn,ingredientsIn) {
    console.log('got here,got code')
    return $http({
      method: "POST",
      url: "/recipes/submit",
      data: {
        title: titleIn,
        instructions: instructionsIn,
        description: descriptionIn,
        ingredients: ingredientsIn
      }
    });
  };
});
