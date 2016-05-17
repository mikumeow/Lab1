
angular.module('myApp',['ui.bootstrap']).controller('getDate',function($scope){     //日期选择器
    $scope.today = function(){
        $scope.dt = new Date(); //接收当天日期
    };
    $scope.today(); // 运行today方法
    $scope.todayFormat = dt.getFullYear()+'年'+dt.getMonth()+'月'+dt.getDate()+'日 星期'+dt.getDay();

})

angular.module("myApp", ['ui.bootstrap']).filter('searchFor', function(){     //搜索条目

    return function(arr, searchString){

        if(!searchString){
            return arr;
        }

        var result = [];
        // searchString = searchString.toLowerCase();

        angular.forEach(arr, function(item){
            var timeStr = item.date.getFullYear()+'年'+item.date.getMonth()+'月'+item.date.getDate()+'日 星期'+item.date.getDay();
            if(item.todoText.indexOf(searchString) !== -1 || timeStr.indexOf(searchString) !== -1){
                result.push(item);
            }

        });

        return result;
    };

});
// angular.module("myApp", ['ui.bootstrap']).filter('searchDate', function(){     //搜索条目

//     return function(arr, searchString){
//         var date = new Date();
//         tmpDate=[date.getFullYear,date.getMonth,date.getDate];
//         angular.forEach(arr, function(item){
//             var testDate = [item.date.getFullYear(),item.date.getMonth(),item.date.getDay()];
//             if(tmpDate.toString() == testDate.toString()){
//                 result.push(item);
//             }

//         });

//         return result;
//     };

// });


function textAreaCtrl($scope)           //添加、删除条目相关
{
    $scope.todoList=[{                  //预置三个note条目
            date:new Date(),
            todoText:"赶紧交LAB", 
            del:false},{
            date:new Date(),
            todoText:"再不交LAB", 
            del:false},{
            date:new Date(),
            todoText:"要被TA杀掉了", 
            del:false}];

    $scope.checkText = function () {    //字数控制
        if ($scope.todoInput.length > 100) {
            $scope.todoInput = $scope.todoInput.substr(0, 100);
        }
        else{
            $scope.warnMessage = $scope.todoInput.length + "/100";
        }
    };

    $scope.addNote = function() {       //点击按钮添加条目
        var date2 = new Date();
        if($scope.dt == null){
            $scope.warnMessage = "请选定日期";
        }
        else if($scope.dt - date2<-86400000){
            $scope.warnMessage = "请选择今天或更迟的日期";
        }
        else {
            if($scope.todoInput == null){
                $scope.warnMessage = "请输入内容";
            }
            else if($scope.todoInput.length<=0){
                $scope.warnMessage = "请输入内容";
            }
            else{
                $scope.todoList.push({
                        date:$scope.dt,
                        todoText:$scope.todoInput, 
                        del:false});
                $scope.todoInput = "";
                console.log($scope.todoList);
                $scope.warnMessage = "添加提醒成功";
            }
        }
    };
    $scope.remove = function() {        //删除条目
        var oldList = $scope.todoList;
        $scope.todoList = [];
        angular.forEach(oldList, function(x) {
            if (!x.del) $scope.todoList.push(x);
        });
    };
};

// var app = angular.module('myApp',[]);
// app.controller('')