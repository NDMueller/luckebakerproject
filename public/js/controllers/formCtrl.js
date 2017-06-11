angular.module('bakerApp').controller('formCtrl',function($scope,formSrv){
  console.log('GOT HERE!');


  $scope.test= "Hi Lloyd"
  $scope.hideModal=function(){
    $scope.show=false
  }
  $scope.postRecipe = function (title, instructions, description,ingredients) {
    console.log(title, instructions, description,ingredients);
    formSrv.postRecipe(title, instructions, description,ingredients).then(function (response) {
      // console.log(response);
      $scope.show=true;
      setTimeout(function(){
        $scope.show=false;
      },5000)
    });
  };
})
