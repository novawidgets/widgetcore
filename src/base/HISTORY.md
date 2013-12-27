@VERSION@

1. 修复事件trigger逆序触发绑定事件。
2. 修复before, after方法执行时this指针错误。
3. 提出CustEvent，提供preventDefault
4. trigger不再支持链式操作。修改为返回Boolearn值。当所有事件处理函数都未调用ev.preventDefault()，或return false时，才返回True.
5. before机制修改，当一个绑定的before function返回为false时，在这个before function之后绑定的函数也会被阻止。
