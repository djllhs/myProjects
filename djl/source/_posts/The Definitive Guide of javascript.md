---
title: 《JavaScript权威指南》笔记   
tags: JavaScript
categories: JavaScript
---
阅读《javascript权威指南》一书做的简要笔记，js基础非常重要，在学习新技术的同时也不忘夯实基础。该书是javascript程序员的必备参考……内容组织得很好，而且非常详细，值得阅读
<!-- more -->

@(我的笔记)

## 一、词法结构
### 1. 字符集
*  区分大小写，关键字、变量、函数名和所有的标识符都必须采取一致的大小写形式。
*  空格、换行符和格式控制符， js一般会忽略空格和换行符，Unicode格式控制符可用在注释、字符串直接量和正则表达式直接量中，不能用在标识符（如变量名）中
*  Unicode转义序列，以\u为前缀，用法同上
### 2.注释

    // 这里是单行注释
    /*这里是一段注释*/ // 这里是另一段注释
    /*
     *这又是一段注释
     *这里的注释可以连写多行
     */

### 3.直接量
即程序中直接使用的数据值，如12,1.2，“hello world”等
### 4.标识符和保留字
1. 标识符
+ 必须以字母、下划线（_）或美元符号（$）开始
+ 数字不允许作为首字符

2. 保留字

		break     delete    function    return    typeof
		case      do        if          switch    var
		catch     else      in          this      void
		continue  false     instanceof  throw     while
		debugger  for       new         true      with
		default   finally   null        try


- ECMAScript5 关键字

			class  const  enum  export  extends  import  super

- 严格模式下的保留字

			implements let private public  yield  interface  package  protected static

- JavaScript预定义的全局变量和函数

			arguments           encodeURI             Infinity   Number         RegExp
			Array               encodeURIComponent    isFinite   Object         String
			Boolean             Error                 isNaN      parseFloat     SyntaxError
			Date                eval                  JSON       parseInt       TypeError
			decodeURI           EvalError             Math       RangeError     undefined
			decodeURIComponent  Function              NaN        ReferenceError URIError

3. 可选的分号

		// 第一个分号可省略
		a = 3;
		b = 4;

		// 第一个分号不能省略
		a = 3; b = 4;
* 以“（”、“[”、“/”、“+”或“-”开始，建议加上分号
* 在return、break和continue后的表达式之间不能有换行

## 二、类型、值和变量
数据类型： 原始类型和对象类型
原始类型： 数字、字符串、null、undefined
### 1. 数字
+ 整型直接量
	- 十进制，数字序列
	- 十六进制，以“0x”或“0X”为前缀，由0~9和a（A）~f（F）构成
+ 浮点型直接量
	- 含小数点，有整数和小数部分
	- 指数记数，实数后跟e或E，再跟正负号，再加一个整型的指数， 如 6.02e23
+ 算数运算，溢出、下溢或被零整除不报错
	- 溢出，值为Infinity（无穷大），或-Infinity（负无穷大）
	- 下溢，结果无限接近0，比js能表示的最小值还小。此时返回0或负零
	- 被零整除，返回Infinity或-Infinity。0/0 返回NaN

			Infinity                                       // 建一个可读/写的变量初始化为Infinity
			Number.POSITIVE_INFINITY                       // 同样的值，只读
			1 / 0                                          // 同样的值
			Number.MAX_VALUE + 1                           // Infinity

			Number.NEGATIVE_INFINITY                       // 负无穷大
			-Infinity
			-1 / 0
			-Number.MAX_VALUE - 1

			NaN                                            //将一个可读/写的变量初始化为NaN
			Number.NaN                                     // 同样的值，只读
			0 / 0                                          // NaN

			Numer.MIN_VALUE / 2                            // 发生下溢， 为0
			-Number.MIN_VALUE / 2                          // 负零
			-1 / Infiity                                   // 负零
			-0                     
 - NaN 和任何值都不等，包括本身。判断是否为NaN，使用 x != x，true则为NaN，反之亦然。isNaN（）函数
 - isFinite（），参数不为NaN，Infinity或-Infinity时为true
+ 二进制浮点数和四舍五入错误
二进制浮点数不能精确表示类似0.1这样简单的数字，计算结果也不精确

### 2. 文本
* 字符串直接量，即由单引号或双引号括起来的字符序列
	注： ECMAScript3中，字符串直接量必须写在一行中。
			ECMAScript5中，可拆分为数行，每行必须Yi反斜线（\）结束
* 转义字符

		\o                        //NULL字符
		\b                        //退格符
		\t                        //制表符
		\n                        //换行符
		\v                        //垂直制表符
		\f                        //换页符
		\r                        //回车符
		\"                        //双引号
		\'                        // 单引号或撇号
		\\                        // 反斜线

* 字符串的使用
	+ 字符串连接，+
	+ 字符串长度， length属性

### 3.  布尔值，true和false
undefined， null，0，-0，NaN，""  ---> false
所有其他值，包括所有对象（数组）---> true

### 4.  null和undefined
* null，描述“空值”，typeof null --> "object"
* undefined，表示值的空缺，未定义，变量没有初始化。 typeof undefined --> "undefined"
null == undefined but  null !== undefined

### 5. 不可变的原始值和可变的对象引用
* 原始值是不可更改的：任何方法都无法更改一个原始值
* 原始值的比较是值的比较
* 对象的比较是引用的比较，如比较两个认读的对象或者数组

		function equalArrays(a, b){
			if(a.length != b.length ) return false;
			for(var i = 0; i < a.length; i++)
				if(a[i] !== b[i]) return false;
			return true;
		}

### 6.类型转换
| 值              | 转换为字符串 | 数字| 布尔值 | 对象|
| -------------| ----------------: | :-----| :-------- | -----|
| undefined    | “undefined” | NaN | false | throws TypeError |
| null         | "null" | 0 | false | throws TypeError |
| true | "true" | 1 | | new Boolean(true)|
| false | "false" | 0 | | new Boolean(false)|
| ""(空字符串) | | 0 | false | new String("")|
| "1.2"(非空，数字) |  | 1.2 | true |  new String("1.2") |
| "one"(非空，非数字) | | NaN | true | new String("one") |
| 0 | "0" | | false | new Number(0) |
| -0 | "0" | | false |new Number(-0)|
| NaN | "NaN" |  | false | new Number(NaN) |
| Infinity | "Infinity" | | true | new Number(Infinity)|
| -Infinity | "-Infinity" | | true | new Number(-Infinity)|
| 1(无穷大，非零) | "1" | | true | new Number(1)|
| {} (任意对象) | 参考6.3 | 参考6.3 | true| |
| [] (任意数组) | "" | 0 | true| |
| [9] (1个数字元素) | "9" | 9 | true | |
| ['a'] (其他数组) | 使用join()方法| NaN | true | |
| function(){} (任意函数)| 参考6.3 | NaN | true| |

* 6.1. 转换和相等性 ，一个值转换为另一个值并不意味着两个值相等
* 6.2
	+ 显示类型转换，最简单的方法是使用Boolean()、Number()、String()或Object()函数。注：除了null或undefined之外的任何值都具有toString（）方法
	+ 隐式类型转换，如使用一元"+"，一元"!"。 Number类定义的toString（）可接受表示转换基数的可选参数，parseInt（）第二个可选参数也为转换基数
* 6.3 对象转换为原始值。
  + 对象转换布尔值：所有的对象都转换为true
  + 对象转换字符串和数字：
 对象到字符串，先toString(),若没有该方法则valueOf（）。否则抛出类型错误异常。
对象到数字，先valueOf(),若没有该方法则toString（），否则抛出类型错误异常。
	  - toString()，返回一个反映这个对象的字符串
		  * 数组类的toString()方法将每个数组元素转换为字符串，并在元素之间添加逗号后合并成结果字符串
		  * 函数类的toString()方法返回了这个函数的实现定义的表示方式，即该函数的JavaScript源代码字符串
		  * 日期类的toString()方法返回一个可读的日期和时间字符串
		  * RegExp类的toString()将其转换为表示正则表达式直接量的字符串

					 [1, 2, 3].toString()  // "1,2,3"
					 (function(x) { f(x); }).toString(); // "function(x){\n f(x); \n}"
					 /\d+/g.toString(); // "/\d+/g"
					 new Date(2010, 0, 1).toString(); // "Mon Jun 19 2017 00:00:00 GMT+0800 (中国标准时间)"
	  - valueOf()，返回对象本身，日期类返回1970.01.01以来的毫秒数

				var now = new Date()
				typeof(now + 1);  // "string", "+"将日期转换为字符串
				typeof(now - 1); // "number"， “-”使用对象到数字的转换
				now == now.toString(); // true， 隐式的和显示的字符串转换
				now > (now - 1); // true， “>” 将日期转换为数字
* 6.4 变量声明，使用关键字var来声明 ，一个var可声明多个变量，也可将变量的初始赋值和变量声明合写在一起。未赋值的初始值为undefined
* 6.5 变量作用域，全局变量拥有全局作用域，函数体内的变量是局部变量，函数参数也是局部变量，作用域为该函数。在函数体内，局部变量的优先级高于同名的全局变量
	* 函数作用域和声明提前。函数朱用语是指在函数内声明的所有变量在函数体内始终是可见的。声明提前是指变量在声明之前可以使用，实际上是变量被提前至函数体的顶部或者全局顶部进行声明，当然值为undefined

			var scope = 'global';
			function f(){
				console.log(scope); // undefined
				var scope = 'local';
				console.log(scope); // local
			}
	* 作为属性的变量，使用var声明的变量不能通过delete删除。在非严格模式给一个未声明的变量赋值，可以删除
	* 作用域链，是一个对象列表或者链表。在js的最顶层代码中，作用域链由一个全局对象组成。在不包含嵌套的函数体内，作用域链上有两个对象，第一个是定义函数参数和局部变量的对象，第二个是全局对象。在一个嵌套的函数体内，作用域链上至少有三个对象.

## 三、表达式和运算符
### 1.原始表达式，包含常量或直接量、关键字和变量
### 2.对象和数组的初始化表达式
1. 数组初始化表达式，通过一对方括号和其内由逗号隔开的列表构成的。数组直接量中的列表逗号之间的元素可以省略，则空位填充值undefined。结尾处可以留下单个逗号
2. 对象初始化表达式，也称“函数直接量”，
3. 由一对花括号和其内由的表达式（包含一个属性名和一个冒号作为前缀）组成

### 3.函数定义表达式
包含关键字function，然后是一对圆括号，括号内是一个以逗号分割的列表，列表包含0个或多个标识符（参数），最后跟花括号包含的代码块

	var square = function(x){
     	return x*x
	}

### 4.属性访问表达式
	expression.identifier
	expression[expression] //属性名称是一个保留字或者包含空格和标点符号或是一个数字，使用此方式

### 5.调用表达式
是一种调用（或者执行）函数或方法的语法表示

### 6.对象创建表达式
创建一个对象并调用一个函数（构造函数）初始化新对象的属性，多了一个关键字new

	new Object();
	new Point(2,3);

### 7.运算符概述

| 运算符      |     操作 |   A   |  N   | 类型 |
| :-------- | --------:| --------:| --------:| :------: |
| ++    |   前/后增量 |  R  | 1 | lval ---> num|
| --    |   前/后减量 |  R  | 1 | lval ---> num|
| -    |   求反 |  R  | 1 | num ---> num|
| +    |  转换为数字|  R  | 1 | num ---> num|
| ~    | 按位求反 |  R  | 1 | int ---> int |
| !    |   逻辑非 |  R  | 1 | bool ---> bool|
| delete    | 删除属性 |  R  | 1 | lval ---> bool|
| typeof    |  检测操作数类型 |  R  | 1 | any ---> str|
| void   |   返回undefined值 |  R  | 1 | any ---> undefined|
| *、/、% | 乘、除、求余 | L | 2 | num,num ---> num |
| +、- | 加、减 | L | 2 | num,num ---> num |
| + | 字符串连接 | L | 2 | str,str ---> str|
| << | 左移位 | L | 2 | int,int ---> int |
| >> | 有符号右移 | L | 2 | int,int ---> int |
| >>> | 无符号左移 | L | 2 | int,int ---> int |
| <、<=、>、>= | 比较数字顺序 | L | 2 | num,num ---> bool |
| <、<=、>、>= | 比较在字母表中的顺序 | L | 2 | str,str ---> bool |
| instanceof | 测试对象类 | L | 2 | obj,func ---> bool |
| in | 测试属性是否存在 | L | 2 | str,obj ---> bool |
| == | 判断相等 | L | 2 | any,any ---> bool|
| != | 判断不相等 | L | 2 | any,any ---> bool|
| === | 判断恒等 | L | 2 | any,any ---> bool|
| !== | 判断非恒等 | L | 2 | any,any ---> bool|
| & | 按位与 | L | 2 | int,int ---> int |
| ^ | 按位异或 | L | 2 | int,int ---> int |
| &brvbar; | 按位或 | L | 2 | int,int ---> int |
| && | 逻辑与 | L | 2 | any,any ---> any |
| &brvbar;&brvbar; | 逻辑或 | L | 2 | any,any ---> any |
| ?: | 条件运算符 | R | 3 | bool, any, any ---> any |
| =  | 变量赋值或属性对象赋值  | R | 2 | lval, any ---> any |
| *=, /=, %=, +=, -=, &=, ^=, &brvbar;=, <<=, >>=, >>>=  | 运算且赋值  | R | 2 | lval, any ---> any |
| , | 忽略第一个操作数,返回第二个操作数 | L | 2 | any,any ---> any |

注：属性访问表达式和调用表达式优先级高于表格所有运算，typeof优先级低于前者，高于后者

### 8.算数表达式
* "+"运算符，可以对两个数字做加法，也可以做字符串连接操作

        1 + 2   // 3 加法
        "1" + "2"  // "12",字符串连接
        "1" + 2  // "12"，数字转换为字符串后进行字符串连接
        1 + {}  // "1[object Object]",对象转换为字符串后进行字符串连接
        true + true // 2,布尔值转为字符串后相加
        2 + null  // 2, null转为0，相加
        2 + undefined // NaN, undefined转为NaN，相加

* 一元算术运算符 （+，-，++，--），作用于一个单独的操作数
    * 一元加（+），将操作数转为数字（或NaN）并返回
    * 一元减（-），将操作数转为数字，改变运算结果符号，并返回
    * 递增（++）,
        + 前增量，操作数在前，返回计算前的值.先赋值后计算
        + 后增量，操作数在后，返回计算后的值。先计算后赋值。

                var i = 1, j = ++i;  // i=2,j=2
                var i = 1, j = i++;  // i=2,j=1

    * 递减（--），同递增

* 位运算符
    - 按位与（&）,二者同为1，结果为1
    - 按位或（|），二者至少1个为1，结果为1
    - 按位异或（^），二者只有一个为1，结果为1
    - 按位非（~），操作数所有位取反
    - 左移（&lt;&lt;），将第一个操作数的所有二进制位左移，第二个操作数为移动的位数
    - 带符号右移（&gt;&gt;），将第一个操作数的所有二进制位右移，第二个操作数为移动的位数
    - 无符号右移（&gt;&gt;&gt;），同无符号右移，只是左边的最高位总是填补0

### 9.关系表达式
* 9.1相等和不等运算符
    * ===， 检测两个操作数是否严格相等，无类型转换，即值和类型均相等
        + 类型不同，不等
        + 都是null或者都是undefined，不等
        + 一个是NaN或者都是NaN，不等（NaN和任何值都不等，包括本身，x !== x ==> tue,为NaN）
        + 两个引用值指向不同的对象，不等
        
        + 都是布尔值true或都是布尔值false，相等
        + 都是数字且值相等，相等
        + 0 === -0
        + 都是字符串且所含的对应位上的16位数完全相等，相等
        + 两个人引用值指向同一个对象、数组或函数，相等

    * ==， 检测两个操作数是否相等，可以允许类型转换
        + null == undefined // true
    * !==, 不严格相等，严格相等求反
    * !=,不相等，相等求反

    注：对象的比较是引用的比较，对象和其本身是相等的，但和其他任何对象都不相等。

    若两个不同的对象具有相同数量的属性，相同的属性名和值，依然不相等。

    相应位置的数组元素是相等的，两个数组也是不相等的。

* 9.2比较运算符
    * 两个操作数要进行类型的转换
    * 字符串比较是区分大小写的，所有的大写的ASCII字母都“小于”小写的ASCII字母，如"Zoo"<"aardvaek"结果为true
    * 只有两个操作数都为字符串时才进行字符串的比较
    * 小于等于运算符相当于不大于，大于等于运算符相当于不小于。
    * 当其中一个操作数为NaN时，所有4个比较运算符均返回false

* 9.3 in运算符
    若右侧的对象拥有一个名为左操作数的属性名，返回true

            var point = {x: 1, y:2};
            "x" in point; // true
            "z" in point; // false
    
* 9.4 instanceof运算符
    若左侧的对象是右侧的实例，返回true，否则返回false。

	注意：所有的对象都是object的实例
### 10 逻辑表达式
* 10.1 逻辑与（&&），连接两个表达式
	* 两个值为真时结果为true，其他情况结果为false
	* 当左值为true时，才会执行右边的表达式，又称短路与

			x === 0 && y === 1;
			a == b && fn();

* 10.2 逻辑或（||）
	* 两个值至少有一个为真值时，返回结果为true，否则为false
	* 第一个操作数为true时，返回其值。否则返回第二个操作数的值（惯用设置默认值）

* 10.3 逻辑非（！）
	* 对值求反，返回结果为true或者false
	* !!（双重否定表肯定），返回等价的布尔值
### 11 赋值表达式（=）
* 返回值为右操作数的值,具有较低的优先级
* 带操作的赋值运算：+=,-=,*=,/=,%=,<<=,>>=,>>>=,&=,|=,^=
### 12 表达式计算
* 12.1 eval()
	* 只有一个参数，若为字符串，则当成js代码编译。否则直接返回该参数。
	* 使用了调用它的变量作用域环境。在顶层代码中调用，作用于全局

			eval("function f() {return x+1;}");
		
	* eval("return; ")是无意义的
* 12.2 全局eval()

		var geval = eval; // 别名
		var x = "global",
			y = "global";

		function f() {
			var x = "local";
			eval("x += 'changed';");
			return x;
		}

		function g() {
			var y = "local";
			geval("y += 'changed';");
			return y;
		}
		console.log(f(), x); // local changed global
		console.log(g(), y); // local globalchanged

### 13 其他运算符
* 13.1 条件运算符（?:）

		var a = 1;
		a = !a ? a-1 : a+1;
		// 等价
		if(!a)  a -= 1;
		else a += 1

* 13.2 typeof运算符
	
| x            | typeof x   |
|:-------------|:-----------:|
|undefined     | "undefined"|
| null		   | "object"   |
| true/false   | "boolean"  |
| 任意数字/NaN  | "number"   |
| 任意字符串    | "string"	|
| 任意函数      | "function" |
| 任意内置对象，非函数  | "object"   |
| 任意宿主对象  |由编译器各自实现的字符串|

* 13.3 delete运算符

	* 删除对象属性或者数组元素，设置为undefined，不是用来返回一个值的
	* 删除属性时，该属性将不存在。
	* 一些内置核心和客户端属性，var声明的变量，function语句定义的函数和函数参数，不能删除
	* 在ESCMScript5严格模式中，操作数非法，删除不可配置的属性，则抛出异常。

* 14.4 void运算符
	* 操作数为任意类型，忽略计算结果并返回undefined
	* 在操作数具有副作用的时候使用更好
* 14.5 逗号运算符（，）
	* 二元运算符，操作数为任意类型

			// 第二个逗号是逗号运算符
			for(var i=0,j=10; i<j; i++,j-->)
				console.log(i+j);
## 四、语句