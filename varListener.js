/**
 * varListener 1.0
 * Date: 2015-03-17
 * Update: 2015-03-17
 * (c) 2015-2015 Jojoman, http://weibo.com/1777714675
 *
 */


(function(){
    //-------------------------------------------------------------------

    var down = false;
    var x,y,imgID,varLogBox;
    function dragImage(){
        event.preventDefault()
        imgID=varLogBox
        x = event.x - parseInt(imgID.style.left);
        y = event.y - parseInt(imgID.style.top);
        down=true;
    }
    function dragImageM(e){
        event.preventDefault()
        var touch=e.touches[0]
        imgID=varLogBox
        x = touch.clientX - parseInt(imgID.style.left);
        y = touch.clientY - parseInt(imgID.style.top);
        down=true;
    }
    function cancelDrag(){
        event.preventDefault()
        down=false; }
    function cancelDragM(){
        event.preventDefault()
        down=false; }

    function moveImage(){
        event.preventDefault()
        if(down){
            imgID.style.left  = event.x - x +'px';
            imgID.style.top   = event.y - y + 'px';
            event.returnValue = false;
        }
    }
    function moveImageM(e){
        event.preventDefault()
        var touch=e.touches[0]
        if(down){
            imgID.style.left  = touch.clientX - x +'px';
            imgID.style.top   = touch.clientY - y + 'px';
            event.returnValue = false;
        }
    }

    //-------------------------------------------------------------------

    function colorShow(e){
        e.style.color='red';
        setTimeout(function(){e.style.color='black'},3000)
    }

    //-------------------------------------------------------------------

    var varClass = {
        varcreate: function() {
            return function() {
                this.initialize.apply(this, arguments);
            }
        }
    }
    var variable=varClass.varcreate();

    var listener=[]
    //index=0
    function allEval(e){
        if(eval(e) instanceof Array){
            return "["+eval(e).join()+"]";
        }else{
            return eval(e)
        }
    }

    variable.prototype={
        initialize:function b(_variable,cb,pollingTime,showLog){
            //console.log(pollingTime)
            var variable = _variable.split(',')
            var mindex=[];
            for (var i in variable){
                mindex[i]=listener.length;
                listener[listener.length]=allEval(variable[i])
            }
            //-------------------------------------------------------------------

            if(showLog){
                if(!varLogBox) {
                    varLogBox = document.createElement("div");
                    document.body.appendChild(varLogBox)
                    varLogBox.id = 'varLogBox'
                    varLogBox.style.position = 'fixed';
                    varLogBox.style.backgroundColor = '#b5d592';
                    varLogBox.style.left = 0;
                    varLogBox.style.top = 0;
                    varLogBox.style.padding=3+'px';
                    varLogBox.style.zIndex=1001;
                    //varLogBox.innerHTML="asdasd"
                    varLogBox.onmousedown = dragImage;
                    varLogBox.ontouchstart = dragImageM;

                    document.onmousemove = moveImage;
                    varLogBox.ontouchmove = moveImageM;

                    document.onmouseup = cancelDrag;
                    varLogBox.ontouchend = cancelDragM;
                }
                if(variable.hasOwnProperty(i)) {
                    for (var i in variable) {
                        var varP=document.createElement('p');
                        varP.id=variable[i]
                        varP.innerHTML=variable[i]+"="+allEval(variable[i])
                        varLogBox.appendChild(varP)
                    }
                }
            }

            //-------------------------------------------------------------------


            function varChange(){
                var newVariable=_variable.split(',');
                for (var i in newVariable){
                    if(allEval(newVariable[i])!==listener[mindex[i]]){
                        if(newVariable.hasOwnProperty(i)) {
                            var res = {
                                varLog: newVariable[i] + "=" + allEval(newVariable[i]),
                                varName: newVariable[i],
                                varValue: eval(newVariable[i])
                            }
                            //------------------------------------------------------------------

                            if (varLogBox) {
                                document.getElementById(newVariable[i]).innerHTML=res.varLog;
                                colorShow(document.getElementById(newVariable[i]))
                            }

                            //------------------------------------------------------------------
                            if (typeof cb === 'function') {
                                cb(res)
                            } else {
                                alert(cb)
                            }
                            listener[mindex[i]] = allEval(newVariable[i])
                            //console.log(listener)
                        }
                    }
                }
                setTimeout(function(){
                    varChange()
                },pollingTime||500);
            }
            varChange()
        },
        showSelf:function(){
            alert("this vehicle is "+ this.type);
            return this
        }
    }
    var newVar=function(_var,cb,pollingtime,showLog){
        var b=new variable(_var,cb,pollingtime,showLog)
        return b
    }

    window.varListen=newVar
}());