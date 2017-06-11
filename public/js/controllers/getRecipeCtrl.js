angular.module('bakerApp').controller('getRecipeCtrl',($scope,getRecipeSrv)=>{

  $scope.getRecipePlease =()=>{
    getRecipeSrv.getRecipePlease().then((response)=>{
      console.log(response.data)
      $scope.recipes=response.data
    })
  }
  $scope.getRecipePlease()
})
