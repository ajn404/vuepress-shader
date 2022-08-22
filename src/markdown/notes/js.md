---

---

<style>
.tip-aqua{
    width:100%;
    color:aqua;
    line-height: 1.4;
    margin-bottom: 2em;
}
.no-wrap{
    overflow: hidden;
    white-space:nowrap;
    text-overflow: ellipsis;
}
</style>

[[toc]]

## 1. scope 范围

标准定义 ECMA2021 普遍性编程语言

## 2. conformance 一致性声明

::: tip 原文
A conforming implementation of ECMAScript must provide and support all the types, values, objects, properties,
functions, and program syntax and semantics described in this specification.
:::
ECMA 的一致性实现包括提供和实现所有的类型，值，对象，属性，函数，以及规范中描述的程序的语义和语法

::: tip 原文
A conforming implementation of ECMAScript may provide additional types, values, objects, properties, and functions
beyond those described in this specification.
:::

ECMA 的一致性实现可能提供超前本规范描述的新增的类型，值，对象，属性和函数。

## 3. Normative References 规范性参考

ECMA 402 ECMA 2015 international API specification ES6 国际化 API 规范 <br/>
ECMA 404 The JSON Data Interchange Format. JSON 数据交换格式

## 4. Overview 概述

::: tip 摘抄
ECMAScript is now a fully featured general-purpose programming language.
:::
ECMA 现在已经是一门功能齐全的通用型编程语言

### 4.1 Web Script

::: tip 原文
A web browser provides an ECMAScript host environment for client-side computation including, for instance, objects
that represent windows, menus, pop-ups, dialog boxes, text areas, anchors, frames, history, cookies, and
input/output. Further, the host environment provides a means to attach scripting code to events such as change of
focus, page and image loading, unloading, error and abort, selection, form submission, and mouse actions. Scripting
code appears within the HTML and the displayed page is a combination of user interface elements and fixed and
computed text and images. The scripting code is reactive to user interaction, and there is no need for a main program.<br/>
A web server provides a different host environment for server-side computation including objects representing
requests, clients, and files; and mechanisms to lock and share data. By using browser-side and server-side scripting
together, it is possible to distribute computation between the client and server while providing a customized user
interface for a Web-based application.<br/>

  <div class="tip-aqua">Each Web browser and server that supports ECMAScript supplies its own host environment, completing the
ECMAScript execution environment.</div>
:::
<div class="tip-aqua">每个支持ECMA的web浏览器和服务器都提供其自身的宿主环境，完成ECMA执行环境</div>

### 4.2 hosts and implementations

::: tip 原文
To aid integrating ECMAScript into host environments, this specification defers the definition of certain facilities (e.g.,
abstract operations), either in whole or in part, to a source outside of this specification. Editorially, this specification
distinguishes the following kinds of deferrals
:::
为了将 ECMA 整合到宿主环境，本规范推迟了部分整体和局部的争对本规范外的 Source 的功能(facilities)的定义(比如抽象操作)。社论上，本规范区分为以下几种"推迟"

::: tip defferrals
An `implementation` is an external source that further defines facilities enumerated in Annex D or those that are marked as implementation-defined or implementation-approximated. In informal use, an implementation refers to a concrete artefact, such as a particular web browser.<br/>
An `implementation-defined facility` is one defers its definition to an external source without further qualification.This specification does not make any recommendations for particular behaviours, and conforming implementations are free to choose any behaviour within the constraints put forth by this specification.<br/>
An `implementation-approximated facility` is one defers its definition to an external source while recommending an ideal behaviour. While conforming implementations are free to choose any behaviour within the constraints put forth by this specification, they are encouraged to strive to approximate the ideal. Some mathematical operations, such as Math.exp, are implementation-approximated.<br/>
A `host` is an external source that further defines facilities listed in Annex D but does not further define other implementation-defined or implementation-approximated facilities. In informal use, a host refers to the set of all implementations, such as the set of all web browsers, that interface with this specification in the same way via AnnexD. A host is often an external specification, such as WHATWG HTML (https://html.spec.whatwg.org/). In other words, facilities that are host-defined are often further defined in external specifications.<br/>
A `host hook` is an abstract operation that is defined in whole or in part by an external source. All host hooks must be listed in Annex D.<br/>
A `host-defined facility` is one defers its definition to an external source without further qualification and is listed in Annex D. Implementations that are not hosts may also provide definitions for host-defined facilities.<br/>
A `host environment` is a particular choice of definition for all host-defined facilities. A host environment typically includes objects or functions which allow obtaining input and providing output as host-defined properties of the global object
:::
implementation 执行
approximated 近似的<br/>
"近似执行"，一些数学的操作，比如 Math.exp，就是近似执行<br/>
informal 非正式的
facilities 实现<br/>

#### 4.2.1 HOST Hooks

- HostCallJobCallBack(callback,V,argumentList)
  let hosts restore state when invoking JavaScript callbacks from inside tasks
- HostEnqueuePromiseJob(job,realm)
  ...

### 4.3 ECMAScript Overview

::: tip 摘抄
ECMAScript is object-basic ... an ECMAScript program is a cluster of communicating objects<br/>

<div class="tip-aqua">
A primitive value is a member of one of the following built-in types: Undefined, Null, Boolean, Number, BigInt, String, and Symbol; an object is a member of the built-in type Object; and a function is a callable object. A function that is associated with an object via a property is called a method.
</div>
ECMAScript also defines a set of built-in operators. ECMAScript operators include various unary operations,
multiplicative operators, additive operators, bitwise shift operators, relational operators, equality operators, binary
4.3 ECMAScript Overview 49 bitwise operators, binary logical operators, assignment operators, and the comma operator.<br/>
:::

resemble 类似<br/>
ECMAScript syntax intentionally resembles Java Syntax

#### 4.3.1 Object

new Date(2009,11)

<p class="tip-aqua">{{new Date(2009,11)}}</p>
Date()
<p class="tip-aqua">{{Date()}}</p>

::: warning constructor
Invoking a constructor without using new has consequences that depend on the constructor
:::
调用构造函数而不使用 new 的结果取决于构造函数

::: tip about prototype chain
Every object created by a constructor has an implicit reference (called the object's prototype) to the value of its
constructor's "prototype" property. Furthermore, a prototype may have a non-null implicit reference to its prototype,
and so on; this is called the prototype chain.

<p class="tip-aqua"> When a reference is made to a property in an object, that reference is to the
property of that name in the first object in the prototype chain that contains a property of that name. 
</p>
In other words,first the object mentioned directly is examined for such a property; if that object contains the named property, that is
the property to which the reference refers; if that object does not contain the named property, the prototype for that
object is examined next; and so on.
:::
构造函数创建的对象与构造函数的prototype属性的值包含一种隐式引用（被称之为对象的原型）。
<p class="tip-aqua">
对一个对象属性的引用，其实就是引用原型链中包含该属性的第一个对象中该对象属性的名称
</p>

#### 4.3.2 the strict variant of ECMAScript

::: tip 解释
The strict variant of the language excludes some specific syntactic and semantic features of the regular ECMAScript language and modifies the detailed semantics of
some features.
:::

::: tip 规范
In addition,an implementation must support the combination of unrestricted and strict mode source text units into a single composite program.
:::
严格模式和非严格模式的单元测试都要通过

### 4.4 terms and definitions

#### 4.4.1 implementation-approximated

#### 4.4.2 implementation-defined

#### 4.4.3 host-defined

#### 4.4.4 type

#### 4.4.5 primitive type

#### 4.4.6 object

#### 4.4.7 constructor

#### 4.4.8 prototype

#### 4.4.9 ordinary object 普通对象

#### 4.4.10 exotic object 外来对象

不完全拥有所有对象的内置方法
::: tip 声明
Any object that is not an ordinary object is an exotic object.
:::

#### 4.4.11 standard object 标准对象

object whose semantics are defined by this specification

#### built-in object

object specified and supplied by an ECMAScript implementation

....

#### 4.4.31 Symbol value

primitive value that represents a unique, non-String Object property key

## 5. Notational Conventions 符号约定

...

## 6. ECMAScript Data Types and Values ECMA 数据类型和值

### 6.1 ECMAScript language types

Undefined,Null,Boolean,String,Symbol,Number,BigInt,Object

#### 6.1.1 the Undefined type

::: tip 原文
Any variable that has not been assigned a value has the value undefined.
:::

#### 6.1.2 the null type

just null

#### 6.1.3 the boolean type

#### 6.1.4 the string type

::: tip 摘抄
The String type is generally used to represent textual data in a running ECMAScript program, in which case each element in the String is treated as a UTF-16 code unit value.
:::

##### - the function String.prototypr.normalize can be used to explicitly normalize a String value.

参数<br/>
NFC — Normalization Form Canonical Composition.<br/>
NFD — Normalization Form Canonical Decomposition.<br/>
NFKC — Normalization Form Compatibility Composition.<br/>
NFKD — Normalization Form Compatibility Decomposition.<br/>

compatibility 兼容性 canonical规范性<br/>
composition合并 decomposition分解<br/>
<p class="tip-aqua">
'n\u0303'.normalize('NFC') === {{'n\u0303'.normalize('NFC')}}<br/>
'n\u0303'.normalize('NFD') === {{'n\u0303'.normalize('NFC')}}
</p>

##### 6.1.4.1 StringIndexOf

::: tip 解释
The abstract operation StringIndexOf takes arguments string (a String), searchValue (a String), and fromIndex (a nonnegative
integer). It performs the following steps when called:<br/>
1. Assert: Type(string) is String.<br/>
2. Assert: Type(searchValue) is String.<br/>
3. Assert: fromIndex is a non-negative integer.<br/>
4. Let len be the length of string.<br/>
5. If searchValue is the empty String and fromIndex ≤ len, return fromIndex.<br/>
6. Let searchLen be the length of searchValue.<br/>
7. For each integer i starting with fromIndex such that i ≤ len - searchLen, in ascending order, do<br/>
a. Let candidate be the substring of string from i to i + searchLen.<br/>
b. If candidate is the same sequence of code units as searchValue, return i.<br/>
8. Return -1.
:::


#### 6.1.5 the Symbol type
::: tip about
the Symbol type is the set of all non-String values that may be used as the key of Object property.
:::

##### 6.1.5.1 well-know symbol


| name | description  | value and purpose |
| --- | --- | --- |
|  @@asyncIterator     |       Symbol.asyncIterator        |        a method that returns the default [AsyncIterator](#async-iteration异步遍历) for an object . Called by the semantics of the for-await-of statement          |
| @@iterator |  Symbo.iterator |  a method that returns the default [Iterator](#iterator遍历器和for-of-循环) for an object.|

##### Iterator遍历器和for of 循环

- 为各种数据提供一个统一的、简便的访问接口
- 使得数据结构的成员能按照某种次序排列
- 创造新的遍历命令 for of 

遍历器，指针对象，next方法返回值的描述如下
``` ts
interface Iterable{
  [Symbol.iterator]():Iterator;
}


interface Iterator {
  next(value?:any):IterationResult;
}

interface Iterationresult {
  value:any,
  done:Boolean
}

```

```js
const obj = {
  [Symbol.iterator] : function(){
    return {
      next:function(){
        return{
          value:1,
          done:true
        }
      }
    }
  }
}
```
上述代码中,obj是可遍历的(iterable)，因为具有Symbol.iterator属性。执行这个属性会返回一个遍历器对象，这个v 对象的根本特征就是具有next方法。

原生具有Iterator接口的数据结构包含
- Array
- Map
- Set
- String
- TypedArray
- 函数的arguments对象
- NodeList对象

```js
const arr = []
for(let i = 0 ;i<10;i++){
  arr.push(i)
}

let iter = arr[Symbol.iterator]()

iter.next()
//{value: 0, done: false}
```
使用 for of 遍历
```js
for (let item of arr){
  console.log(item);
}
```
Obj对象没有部署Iterator接口，是因为对象属性的遍历先后顺序是不确定的，需要手动指定。
::: tip 调用iterator的场所
- 结构赋值
- 扩展运算...
- yield *
:::

> 注：for in 循环读取键名 ； for of 循环获取键值 如果要通过for of 获取数组的索引，可以借助数组实例的entries方法和keys方法

##### async iteration异步遍历

```js
async function * createAsyncIterable(asyncIterable){
  for(const elem of syncIterable){
    yeild elem;
  }
}
```

| name | description  | value and purpose |
| --- | --- | --- |
| @@hasInstance | Symbol.hasInstance| A method that determines if a constructor object recognizes an object as one of the constructor's instances.Called by the semantics of the instanceof operator. |
##### InstanceofOperator(V,target)
The abstract Operation InstanceofOperator takes arguments V and target.It implements the generic algorithn for detemining if V is an instance of target either by consulting target's @@hasInstance method or,if absebt,determining whether the value of target's "prototype" property is present in V's prototype chain.
- 如果Type 不是一个对象，报TyoeError exception
- Let instOfHandler be ? GetMethod(target , @@hasInstance)
- If instOfHandler is not undefined , then a. Return !ToBoolean(?Call(instOfHandler,target,《V》))
- If IsCallable(target) is false , 报TyoeError exception
- Return ? OrdinaryHasInstance(target,V)


| name | description  | value and purpose |
| --- | --- | --- |
| @@isConcatSpreadable | Symbol.isConcatSpreadable| 一个用于标识是否可以通过Array.prototype.concat进行扁平化处理的boolean值 ｜


##### Array.prototype.concat

| name | description  | value and purpose |
| --- | --- | --- |
| @@search | Symbol.search | String.protype.search |
| @@match | Symbol.match |  String.prototype.match |
| @@matchAll | Symbol.matchAll |  String.prototype.matchAll |


```js 
class caseInsensitiveSearch {
  constructor(value) {
    this.value = value.toLowerCase();
  }
  [Symbol.search](string) {
    return string.toLowerCase().indexOf(this.value);
  }
}
console.log('foobar'.search(new caseInsensitiveSearch('BaR')));
// 期望输出为3
```

#### 6.1.6 the Numeric type

~ 非 & 与 ^异或 ｜ 或 << 左移 >>右移 >>> 无符号右移

ECMAScript has two built-in types : Number and BigInt.
The following abstract operations are defined over these numeric types.
The "Result" column shows the return type, along with an indication if it is possible for some invocations of the operation to return an abrupt completion.

|  Operation |  Example source | Invoked by the Evaluation semantics of ... | Result |
|  --- | --- | --- | ---|
| 1 | -x | Unary - Operator | Number |

##### 6.1.6.1 the number type


[MDN Number](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number)
