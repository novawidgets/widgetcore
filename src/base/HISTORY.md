# Base Change History

@VERSION@

##1.0.2
Events:
1. 抽象出Class CustEvent，CustEvent提供preventDefault方法。
2. 事件处理函数现可通过ev.preventDefault或return false的方式，阻止后续处理函数的执行。
3. fix: 修复trigger方法逆序触发绑定事件为正序。
4. trigger方法不再支持链式操作，返回值改为Boolean类型。当所有处理函数都未调用ev.preventDefault(), 或return false时, trigger才会返回true。

Aspect:
1. fix: 修复before, after方法执行时this指针引用错误。
2. before机制修改为，当一个before function调用了ev.preventDefault，或return false时，会阻止原方法和在其后绑定的before function的执行。

Attribute:
1. 不再提供onChangeAttr, beforeMethod, _onChangeAttr, _beforeMethod等方法。
2. 增加change:*事件，可监听所有attribute的变化
3. fix: 实例化时，在初始化时不再会触发change:attrName事件
4. get方法支持获得非plain object的属性。如ins.get('arr.length')

##1.0.1
no change

##1.0.0
first release

