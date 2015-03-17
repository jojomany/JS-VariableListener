VariableListener WIKI
=====
<br>
Include/引用方式：
----
```
<script src="your direct/varListener.min.js"></script>
```
Include before the js file witch need to listen variable/在需要监听变量的js文件前引用<br>

Usage/使用方法：
----
```
var variable01;

varListen(
'variable01', //The variable need to be listened.Variables should be involved in `quotes`.This argument is required.
              //需要被监听的变量，变量需要用`引号`包围,必填参数。
             
function(res){ //Callback.Respose got 3 property: res.varLog ; res.varName ; res.varValue.This argument is required.
               //回调，返回值有3个方法：res.varLog ; res.varName ; res.varValue。必填参数。
              
    console.log(res.varLog) //res.varLog return a String: variableName = variableValue;
                            //res.varLog 返回一个字符串：变量名 = 变量数值;
                           
    console.log(res.varName) //res.varName return a String, the name of changed variable.
                             //res.varName 返回字符串：发生变化的变量名。
                            
    console.log(res.varValue) //res.Value return the value of changed variable.
                              //res.Value返回的是发生变化的变量值。
},
500, //This listen function based on polling.So this argument can set polling time.Optional, default: `500`ms;
     //本控件的功能基于对变量的轮询，可以通过该参数设置轮询时间。可选项，默认为`500`毫秒。
    
true //If this boolean argument been setted to true, a div whitch log variables'infos you setted before will be create to the body.
     //And the Div can be draged to anywhere.Suitable for mobiles. Optional, default: `false`.
     //如果此参数被设置为true，将会向body添加一个用来显示你所设定的变量信息的div,这个div是可以拖动的。适用于移动设备的测试。
     //可选项，默认为`false`。
)
```
This function can be repeated used to listen multiple variables.You can also set multiple variables in the first arguments,
split variables with `,`.

这个方法可以反复使用，也可以在同一个方法中的第一个参数中设置多个变量的监听。用`,`分隔变量。

Example/示例
---

```
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>varListener</title>
    <script src="varListener.js"></script>
</head>
<body>

<script >
    var variable01=1,
            variable02=[1,2,3],
            variable03="Hi~";

    varListen('variable01,variable02',function(res){
        console.log(res.varLog);
//        alert(res.varName+"Changed")
        console.log(res.varValue)
    })

    varListen('variable03,variable01',function(res){
        if(res.varName=='variable03') {
            eval(res.varName + "+='Thanks~'")
        }
    },1000,true)

</script>

<input type="button" value="ChangeV01" onclick="variable01+=1">
<input type="button" value="ChangeV02" onclick="variable02.push(0)">
<input type="button" value="ChangeV03" onclick="variable03+='!'">

</body>
</html>
```
![](http://file.digitaling.com/eImg/image/20150318/20150318014534_57142.png)

