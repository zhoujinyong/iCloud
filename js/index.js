$(function () {
    var app = angular.module("reminder", [])
    app.controller('mainCtrl', ['$scope', function ($scope) {
        $scope.colorList = [
            {
                id: 1000, title: "默认", theme: "orange",
                todos: [{id: 1, title: "回家", state: 1}, {id: 2, title: "吃饭", state: 0}, {
                    id: 3,
                    title: "爬山",
                    state: 1
                }, {id: 4, title: "看书", state: 0}]
            },
            {id: 1001, title: "新列表1", theme: "pink", todos: []},
            {id: 1002, title: "新列表2", theme: "brown", todos: []},
            {id: 1003, title: "新列表3", theme: "yellow", todos: []},
            {id: 1004, title: "新列表4", theme: "blue", todos: []},
            {id: 1005, title: "新列表5", theme: "green", todos: []},
            {id: 1006, title: "新列表6", theme: "purple", todos: []}
        ];
        $scope.circle = [
            {id: 1000, theme: "orange"},
            {id: 1001, theme: "pink"},
            {id: 1002, theme: "brown"},
            {id: 1003, theme: "yellow"},
            {id: 1004, theme: "blue"},
            {id: 1005, theme: "green"},
            {id: 1006, theme: "purple"}

        ]
        // $(document).on("mousedown",false)

        $scope.add = function () {
            var max = -Infinity
            $scope.colorList.forEach(function (v, i) {
                if (v.id > max) {
                    max = v.id
                }
            })
            max = max + 1
            $scope.colorList.push({
                id: max,
                title: "新列表" + ($scope.colorList.length),
                theme: $scope.colorList[$scope.colorList.length % 7].theme,
                todos: []
            })
        }
        $scope.current = $scope.colorList[0]
        $(document).on("keyup", function (e) {
            if (e.keyCode === 46) {
                var id = parseInt(($(".list-group")).find("li.active").attr("id"))
                $scope.$apply(function () {
                    $scope.colorList = $scope.colorList.filter(function (v, i) {
                        return v.id !== id
                    })
                    // $scope.current.theme = $scope.colorList[0].theme
                    $scope.current = $scope.colorList[0]
                })
            }


        })

        $scope.setcurrent = function (v) {
            $scope.current = v
        }
        $scope.del = function (id) {
            $scope.current.todos = $scope.current.todos.filter(function (v, i) {
                return v.id !== id
            })
        }
        
        
        
//         $scope.count=function(){
//             var num=0
//             $scope.current.todos.forEach(function(v,i){
//                 if(v.state===1){
//                     num+=1
//                 }
//             })
//             console.log(num)
//         }
           
           
           
           
        $scope.cancel = function () {
            $(".choose").toggleClass("active")
        }
        $(".list").on("click", "li", function () {
            $(".list").find("li").removeClass("active")
            $(this).addClass("active")
        })
        $(".new-item").on("click", function () {
            var input = $(this).find("input")
            // var val = input.val()
            $(document).on("keyup", function (e) {
                
                if (e.keyCode === 13) {
                	var newval = input.focus().val()
                    if (newval !== "") {
                        $scope.$apply(function () {
                            $scope.current.todos.push({
                                id: $scope.current.todos.length + 1,
                                title: newval,
                                state: 0
                            })
                        })

                    }
                    console.log($scope.current.todos)
                    input.val("")
                }
            })

        })
        $scope.shouqi = function () {
            $(".complete .caret").toggleClass("active")
            $(".complete-list").slideToggle()
        }
        $scope.delall = function () {
            $scope.current.todos = $scope.current.todos.filter(function (v, i) {
                return v.state !== 1
            })
            console.log($scope.current.todos)
        }


    }])
    app.directive("colorList", function () {
        return {
            restrict: "AE",
            transclude: true,
            template: '<ul class="list-group" ng-transclude></ul>',
            replace: true,
            link: function (scope, el) {
                // $(document).on("mousedown",false)
                // $(el).on("mousedown","li", false)
                $(el).on("dblclick", "li", function () {
                    console.log($(this))
                    // $(this).stopPropagation()
                    $(this).find(".r span").addClass("active")
                    var input = $(this).find(".r input")
                    
                    input.toggleClass("active")
                    input.focus()
                    input.val(input.val())
                })
                $(el).on("blur", "li", function () {
                    $(this).find(".r input").removeClass("active")
                    $(this).find(".r span").toggleClass("active")
                })
                $(el).on("click", "li", function () {
                    $(".list-group li").removeClass("active")
                    $(this).addClass("active")
                })
            }
        }
    })
    app.directive("colorClick", function () {
        return {
            restrict: "AE",
            transclude: true,
            template: '<div class="color" ng-transclude></div>',
            replace: true,
            link: function ($scope, el) {
                // console.log($(".wrap"))
                // $(el).find(".wrap").eq(0).addClass("active")
                $scope.change = function (t, $index) {
                    $scope.current.theme = t.theme
                    $(el).find(".wrap").removeClass("active")
                    $(el).find(".wrap").eq($index).toggleClass("active")
                    
                    
                    
//                  $scope.delete = function (id) {
//                      if (t.id === 1000) {
//                          alert("系统默认不可以删掉哦!")
//                          return;
//                      } else {
//                          $scope.colorList = $scope.colorList.filter(function (v, i) {
//                              return v.id !== id;
//                          })
//                          $scope.current.theme = $scope.circle[0].theme
//                      }
//                  }
                    
                    
                    
                    
                    
                }
                 $scope.delete = function (id) {
                        
                            $scope.colorList = $scope.colorList.filter(function (v, i) {
                                return v.id !== id;
                            })
                            $scope.current.theme = $scope.circle[0].theme
                      
                    }

           

            }
        }
    })
    app.directive("inputClick", function () {
        return {
            restrict: "AE",
            transclude: true,
            template: '<ul ng-transclude></ul>',
            replace: true,
            link: function ($scope, el) {
                $(el).on("click", "li", function () {
                    $(el).find("li").removeClass("active")
                    $(this).toggleClass("active")
                })
                $(el).on("click", "li input", function () {
                    var old = $(this).focus().val()
                    $(document).on("keyup", function (e) {
                        
                        if (e.keyCode === 13) {
                        	var newval = $(this).focus().val()
                            if (oldval !== newval) {
                                $scope.colorList.todos.push({
                                    id: $scope.colorList.todos.length,
                                    title: newval,
                                    state: 0
                                })
                            }
                        }
                    })
                })
                $(el).on("click", "li input", function (){

                })

            }
        }
    })
    // app.directive("todoClick", function () {
    //     return {
    //         restrict: "AE",
    //         transclude: true,
    //         template: '<ul ng-transclude></ul>',
    //         replace: true,
    //         link: function ($scope, el) {
    //             $(el).on("click", "li", function () {
    //                 $(el).find("li").removeClass("active")
    //                 $(this).toggleClass("active")
    //             })
    //             $(el).on("click", "li input", function () {
    //                 var newval = $(this).focus().val()
    //                 $(document).on("keyup", function (e) {
    //                     if (e.keyCode === 13) {
    //                         if (oldval !== newval) {
    //                             $scope.colorList.todos.push({
    //                                 id: $scope.colorList.todos.length,
    //                                 title: newval,
    //                                 state: 0
    //                             })
    //                         }
    //                     }
    //                 })
    //             })
    //
    //         }
    //     }
    // })


})