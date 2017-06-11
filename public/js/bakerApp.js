angular.module('bakerApp',['ui.router'])

.config( ($stateProvider,$urlRouterProvider)=>{
  $stateProvider.state('home', {
    url: '/',
    templateUrl: './views/home.html'
  }).state('recipes', {
    url: '/recipes',
    controller: "getRecipeCtrl",
    templateUrl: './views/recipes.html'
  }).state('about', {
    url: '/about',
    templateUrl: './views/about.html'
  }).state('recipeForm', {
    url: '/recipes/submit',
    controller: "formCtrl",
    templateUrl: './views/forms.html'

  })
  .state('gallery', {
    url: '/gallery',
    templateUrl: './views/gallery.html'
  });
  
  $urlRouterProvider.otherwise('/');
})
