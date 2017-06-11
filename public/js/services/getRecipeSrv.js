angular.module('bakerApp').service('getRecipeSrv',function($http){

this.getRecipePlease = ()=>{
  return $http({
    method:'GET',
    url:'/recipes'
  })
}
})
