# 타입

## 타입이란?

### 자료형으로서의 타입

ECMAScript 표준을 따르는 자바스크립트는 다음 7가지 데이터 타입이 존재한다.

- undefined
- null
- Boolean
- String
- Symbol
- Numeric (Number와 BigInt)
- Object

### 집합으로서의 타입

프로그래밍에서의 타입은 수학의 집합과 유사하다. <br>
타입은 다음 값이 가질 수 있는 유효한 범위의 집합을 의미한다.

```javascript
const double(n){
    return n*2
}

double(2); // 4
double("z"); // NaN
```

double함수의 의도는 숫자를 인자로 받을것이라고 기대하고 만든 함수이다.<br>
하지만 의도하지 않은 문자가 들어간다면 원하는 값을 얻지 못하게 된다.

```javascript
const double(n:number){
    return n*2
}

double(2); // 4
double("z"); // Error : Argument of type 'string' is not assignable to parameter of type 'number'(2345)
```

타입스크립트에서는 타입을 제한하여 컴파일러가 함수를 호출할 때 호환되는 인자로 호출했는지를 판단한다. <br>

### 정적 타입과 동적 타입

정적 타입 시스템에서는 모든 변수의 타입이 컴파일 단계에서 결정된다.  
동적 타입 시스템에서는 변수 타입이 런타임에서 결정된다.

- 정적 타입 언어
  - C, 자바, 타입스크립트 등
- 동적 타입 언어
  - 자바스크립트, 파이썬 등

> 컴파일과 런타임  
> 기계가 소스코드를 이해할 수 있도록 기계어로 변환되는 시점을 컴파일이라고 부름  
> 이후 변환된 파일이 메모리에 적재되어 실행되는 시점을 런타임이라고 부름

### 강타입과 약타입

**강타입**  
타입 규칙이 엄격해서 다른 타입끼리 연산하거나 대입할 때 반드시 명시적 변환(casting)이 필요함.  
예: Java, TypeScript

**약타입**  
타입 규칙이 느슨해서 서로 다른 타입끼리도 자동 변환을 허용함.  
예: JavaScript, PHP

**암묵적 변환**  
정의: 프로그래머가 명시적으로 변환하지 않아도, 언어 자체가 알아서 타입을 바꿔주는 것.

예시 (JavaScript):

```javascript
console.log(1 + "2"); // "12" (숫자 → 문자열)
console.log("5" * 2); // 10  (문자열 → 숫자)
console.log(true + 1); // 2   (불리언 → 숫자)
```

장점: 빠른 코딩 가능.  
단점: 예상치 못한 버그 발생 위험 ↑

### 컴파일 방식

일반적인 언어에서의 컴파일

- 사람이 이해할 수 있는 방식(C, Java, Javascript)으로 작성한 코드를 컴퓨터가 이해할 수 있는 기계어(바이너리)로 바꿔주는 과정

타입스크립트의 컴파일

- 타입스크립트를 자바스크립트로 바꿔주는 과정
- 자바스크립트의 컴파일타임에 런타임에러를 사전에 잡아내기 위한 것
- 타입스크립트를 컴파일하면 -> 자바스크립트 소스코드만 남음

---

## 타입스크립트의 타입 시스템

### 타입 애너테이션 방식

타입 애너테이션(type annotation)이란 변수나 상수 혹은 함수의 인자와 반환값에 타입을 명시적으로 선언해서 어떤 타입 값이 저장될 것인지를 컴파일러에 직접 알려주는 문법

예시

```javascript
let isDone: boolean = false;
let decimal: number = 6;
let color: string = "blue";
let list: number[] = [1, 2, 3];
let x: [string, number] = ["hi", 1]; // tuple
```

### 구조적 타이핑과 구조적 서브타이핑

구조적 타이핑이란 타입을 이름이나 선언이 아니라 구조(Shape) 로 판단하는 방식.  
즉, 객체가 특정 타입이 요구하는 프로퍼티와 메서드를 모두 갖고 있으면 그 타입으로 인정함.

구조적 서브 타이핑이란 더 많은 속성을 가진 타입은 적은 속성을 가진 타입의 서브타입이 되는 것을 의미한다.

```javascript
interface Point {
  x: number;
  y: number;
}

let p1 = { x: 10, y: 20 };
let p2 = { x: 10, y: 20, z: 30 };

function printPoint(p: Point) {
  console.log(p.x, p.y);
}

printPoint(p1); // OK
printPoint(p2); // OK (z는 추가 속성이지만 x,y가 있으므로 Point 구조를 만족)
```

위는 구조적 서브타이핑의 예시이다.  
p2는 Point라는 이름으로 선언된 적 없지만, x와 y를 가지고 있으므로 Point 타입으로 취급됨.

서로 다른 타입간의 호환성은 오로지 타입 내부의 구조에 의해 결정된다. 타입 A가 타입 B의 서브타입이라면 A 타입의 인스턴스는 B 타입이 필요한 곳에 언제든지 위치할 수 있다.

### 자바스크립트를 닮은 타입스크립트

자바는 명목적 타이핑을 채택했다.  
예시

```java
class Cat {
    String name;
        public void hit(){}
}

class Arrow {
    String name;
        public void hit(){}
}

public class Main {
    public static void main(String[] args){
        // error : incompatible types: Cat cannot be converted to Arrow
        Arrow cat = new Cat();
        // error : incompatible types: Arrow cannot be converted to Cat
        Cat arrow = new Arrow();
    }
}
```

위처럼 Cat과 Arrow에 동일하게 name과 hit메서드가 존재하여 구조적으로는 동일하지만 각 클래스로 생성한 인스턴스는 서로 호환되지 않는다.

하지만 타입스크립트는 구조적 타이핑을 사용한다. 자바스크립트가 덕 타이핑(duck typing)을 기반으로 하는데, 덕 타이핑은 어떤 함수의 매개변수값이 올바르게 주어진다면 그 값이 어떻게 만들어졌는지 신경쓰지 않고 사용한다는 개념이다.

그 덕분에 타입스크립트는 유연한 타이핑이 가능해져서 쉬운 사용성과 안정성을 모두 가져가며 편리성을 높였다.

### 구조적 타이핑의 결과 (맹점)

```javascript
interface Cube {
  width: number;
  height: number;
  depth: number;
}

function addLines(c: Cube) {
  let total = 0;
  for (const axis of Object.keys(c)) {
    // Element implicitly has an 'any' type
    // because expression of type 'string' can't be used to index type 'Cube'
    // No index signature with a parameter of type 'string'
    // was found on type 'Cube'
    const length = c[axis];
    total += length;
  }
}
```

addLines() 함수의 매개변수 c는 Cube 타입으로 선언되어있고, 모든 필드의 number를 더하는 함수이다.

얼핏 보면 그럴듯해보이지만 구조적타이핑에서는 Cube의 width, height, depth 이외에 다른 속성이 더 있을 수 있기 때문에 c[axis]의 타입이 string일 수도 있어서 에러가 발생한다.

이러한 한계를 극복하고자 타입스크립트에 명목적 타이핑 언어의 특징을 가미한 식별할 수 있는 유니온(Discriminated Unions)같은 방법이 생겨났다.

```javascript
function addLines(c: Cube) {
  let total = 0;
  for (const axis of Object.keys(c) as (keyof Cube)[]) {
    // 이렇게 하면 keyof Cube = "width" | "height" | "depth"
    const length = c[axis]; // 이제 number로 안전하게 인식
    total += length;
  }
  return total;
}
```

### 타입스크립트의 점진적 타입 확인

```javascript
function add(x,y){
    return x+y;
}

// 위 코드는 아래와 같이 암시적 타입 변환이 일어남
function add(x:any, y:any):any;
```

타입스크립트에서는 필요에 따라 타입을 생략할 수도 있고 타입을 점진적으로 추가할 수도 있다.

> 타입스크립트에서 any타입은 모든 타입의 종류를 포함하는 가장 상위타입으로 어떤 타입 값이든 할당할 수 있다.  
> 따라서 타입스크립트로 코드를 작성할 때 정확한 타이핑을 위해 tsconfig의 noImplicitAny 옵션을 true로 설정하는게 좋다.

### 값 vs 타입

값(Value): 프로그램 실행 시점에 메모리에 존재하는 실제 데이터.  
→ 예: 10, "hello", [1,2,3]

타입(Type): 값이 어떤 구조와 의미를 가져야 하는지 나타내는 설명서.  
→ 예: number, string, `Array<number>`

값과 타입 모두로 해석되는 것도 존재한다.

#### class

값 관점: 실행 중 new를 통해 생성되는 객체 인스턴스가 값.  
타입 관점: 그 클래스가 생성할 수 있는 객체들의 형태(프로퍼티·메서드 집합) 를 정의.

```javascript
class Person {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}
let p: Person = new Person("Kim");
// p는 값(인스턴스) / Person은 타입(인스턴스 구조) + 생성자라는 값
```

#### enum

값 관점: 실행 시 존재하는 상수 집합. (예: Direction.Up === 0)  
타입 관점: 그 상수들 중 하나만 올 수 있다는 제한된 타입 역할.

```javascript
enum Direction { Up, Down, Left, Right }
let d: Direction = Direction.Up;
// d는 값(0) / Direction은 타입 + 열거 상수 객체 값
```

### 타입을 확인하는 방법

#### typeof

typeof는 연산하기 전에 피연산자의 데이터 타입을 나타내는 문자열을 반환한다.

반환값 예시

- "undefined"
- "boolean"
- "number"
- "bigint"
- "string"
- "symbol"
- "function"
- "object"

```javascript
typeof 2022; // "number"
typeof "woowahan"; // "string"
typeof true; // "boolean"

// 참조형 데이터는 모두 object로 확인됨
typeof {}; // "object"
typeof {}; // "object"
typeof []; // "object"
typeof new Date(); // "object"
typeof /abc/; // "object" 정규표현식도 object이다!

// 호스트객체
// JS 엔진이 아닌, 실행 환경(브라우저, Node.js 등)이 제공하는 객체

//브라우저 제공 호스트객체
typeof window; // "object"
typeof document; // "object"
typeof alert; // "function" (브라우저가 제공하는 함수)

// Node 제공 호스트 객체
typeof process; // "object"
typeof require; // "function"
```

#### 값 위치에서의 typeof

값 위치에서의 typeof는 값의 종류를 문자열로 반환한다.

```javascript
interface Person {
  first: string;
  last: string;
}

const person: Person = { first: "zig", last: "song" };

function email(options: { person: Person, subject: string, body: string }) {}

console.log(typeof person); // "object"
console.log(typeof email); // "function"
```

#### 타입 위치에서의 typeof

타입 위치에서의 typeof는 해당 값의 타입을 추출한다.

```javascript
type T1 = typeof person; // Person
type T2 = typeof email; // (options: { person: Person; subject: string; body: string }) => void
```

---

## 원시 타입

### boolean

```javascript
const isEmpty: boolean = true;
const isLoading: boolean = true;

function isTextError(errorCode: ErrorCodeType): boolean {
  const errorAction = getErrorAction(errorCode);

  if (errorAction) {
    return errorAction.type === ERROR_TEXT;
  }
  return false;
}
```

위처럼 오직 true와 false값만 할당할 수 있는 타입이다.  
자바스크립트에는 Truthy한 값과 Falsy한 값이 존재하는데, 이 값은 boolean 원시값이 아니므로 타입스크립트에서도 boolean으로 취급되지 않는다.

### undefined

```javascript
let value: string;
console.log(value); // undefined (값이 할당되지 않음)

type Person = {
  name: string,
  job?: string,
};
```

정의되지 않았다는 의미의 타입으로 오직 undefined 값만 할당할 수 있다.  
초기화가 되지 않은 값을 의미하며 옵셔널로 지정된 곳에도 undefined를 할당할 수 있다.

### null

```javascript
let value: null | undefined;
console.log(value); // undefined (값이 할당되지 않음)

value = null;
console.log(value); // null (값이 null로 할당됨)
```

오직 null 만 할당할 수 있다.  
undefined와 null을 동등연산자(==)로 비교하면 서로 동등하다는 true가 나오는데, 엄연히 다른 원시값이다.

```javascript
type Person1 = {
  name: string,
  job?: string,
};

type Person2 = {
  name: string,
  job: string | null,
};
```

위 예시처럼 타입을 정의한 경우, Person1은 job이라는 속성이 있을수도 없을수도있다.  
하지만 Person2는 job속성이 존재하지만 그 값이 비어있을수도 있다는 것을 나타낸다.

### number

```javascript
const maxLength: number = 10;
const maxWidth: number = 120.3;
const maximum: number = +Infinity;
const notANumber: number = NaN;
```

자바스크립트의 숫자에 해당하는 모든 원시 값을 할당할 수 있다.  
자바스크립트의 숫자는 정수, 부동소수점수를 구분하지 않는다.  
NaN과 Infinity또한 number타입이다.

### bigInt

```javascript
const bitNumber1: bigint = BigInt(999999999999);
const bitNumber2: bigint = 999999999999n;
```

ES2020에서 새롭게 도입된 데이터 타입으로 타입스크립트 3.2 버전부터 사용가능하다.  
이전 자바스크립트는 가장 큰 수인 Number.MAX_SAFE_INTEGER(2^53-1)를 넘어가는 값을 처리할 수 없었는데 bigInt를 사용하면 이보다 큰 수를 처리할 수 있다.

bigInt와 number는 서로 연산할 수 없고, 비교는 가능하다.

```javascript
// ✅ bigInt 사용법
// 숫자 뒤에 n을 붙임
const a = 123n;

// BigInt() 생성자 사용
const b = BigInt(123);

// 문자열로도 가능 (안전하게 큰 수 표현)
const c = BigInt("9007199254740993000000000");

// ✅ bigInt 연산방법
const x = 100n;
const y = 20n;

console.log(x + y); // 120n
console.log(x - y); // 80n
console.log(x * y); // 2000n
console.log(x / y); // 5n   (소수점 버림)
console.log(x % y); // 0n

// ✅ number와 비교 가능
console.log(10n > 5); // true
console.log(10n === 10); // false (타입 다름)
console.log(10n == 10); // true  (값만 비교)
console.log(10n < Infinity); // true
```

### string

```javascript
const receiverName: string = "KG";
const receiverPhoneNumber: string = "010-0000-0000";
const letterContent: string = `안녕, 내 이름은 ${senderName}이야.`;
```

문자열을 할당할 수 있는 타입이다.  
공백도 string타입에 해당한다.  
백틱(`)으로 감싼 문자열 내부에 변숫값을 포함할 수 있는 템플릿 리터럴 문법도 있다.

### symbol

```javascript
const MOVIE_TITLE = Symbol("title");
const MUSIC_TITLE = Symbol("title");
console.log(MOVIE_TITLE === MUSIC_TITLE); // false

let SYMBOL: unique symbol = Symbol(); // A variable whose type is a 'unique symbol' type must be 'const'
```

ES2015에 도입된 데이터 타입으로 Symbol()함수를 사용하면 어떤 값과도 중복되지 않는 유일한 값을 생성할 수 있다.  
위에서 무비타이틀에도 title을, 뮤직타이틀에도 title이라는 동일한 문자열을 넘겨줬지만 두 변수는 같지 않다고 나온다.  
타입스크립트에서는 symbol 타입과 const에서만 사용할 수 있는 unique symbol 타입이라는 하위 타입도 존재한다.

## 객체 타입

### object

```javascript
// object 타입은 원시 타입을 제외한 모든 값과 호환된다.
let x: object;
x = {}; // OK
x = [1, 2, 3]; // OK
x = new RegExp("a"); // OK
x = () => {}; // OK
x = class {}; // OK

// 원시타입은 호환되지 않음
x = 123; // ❌
x = "hi"; // ❌
```

```javascript
function isObject(value: object) {
  return (
    Object.prototype.toString.call(value).replace(/\[|\]|\s|object/g, "") ===
    "Object"
  );
}

// 하지만 위처럼 순수 객체(plain object)만 판별해내는 함수로 걸러보면
isObject({}); // true
isObject({ name: "KG" }); // true
isObject([0, 1, 2]); // false
isObject(/abc/); // false
isObject(() => {}); // false
isObject(class {}); // false
```

### {}

중괄호 {} 는 자바스크립트에서 객체 리터럴 방식으로 객체를 생성할 때 사용한다.

```javascript
// 정상
const noticePopup: {
    title: string
    description: string
} = {
    title: "안녕하세요",
    description:"반가워요",
};

// SyntaxError
const noticePopup: {
    title: string
    description: string
} = {
    title: "안녕하세요",
    description: "반가워요",
    text: "이건 지정하지 않은 타입인데.." // text는 지정한 타입에 존재하지 않으므로 오류
}
```

#### 주의

{} 타입으로 지정된 객체는 완전히 비어있는 순수한 객체를 의미하는것이 이나다.  
자바스크립트 프로토타입 체이닝으로 Object 객체 래퍼에서 제공하는 속성에는 정상적으로 접근이 가능하기 때문이다.

#### 번외

{} 타입은 사실상 모든 non-nullish 값을 허용한다.  
순수 객체만 의미하는게 더더욱 아니라는것을 보여준다.

```javascript
let a: {};
a = 10; // OK
a = "hi"; // OK
a = {}; // OK
a = null; // ❌
a = undefined; // ❌
```

### array

타입스크립트에서는 배열을 array라는 별도 타입으로 다룬다.  
타입스크립트 배열 타입은 하나의 타입 값만 가질 수 있다는 점에서 자바스크립트 배열보다 조금 엄격하다.

타입스크립트에서 배열 타입을 선언하는 방식은 Array 키워드로 선언하거나 대괄호 [] 를 사용해서 선언하는 방법이 있다.

```javascript
const getCartList = async (cartId: number[]) => {
  const res = await CartApi.GET_CART_LIST(cartId);
  return res.getData();
};

getCartList([]); // 빈배열도 가능
getCartList([1001]); // 가능
getCartList([1001, 1002, 1003]); // 가능
getCartList(["hi", 123]); // 불가능, 'hi'는 string타입이므로 불가

// 튜플타입
const targetCodes: ["CATEGORY", "EXHIBITION"] = ["CATEGORY", "EXHIBITION"]; //가능

const targetCodes: ["CATEGORY", "EXHIBITION"] = [
  "CATEGORY",
  "EXHIBITION",
  "SALE",
]; //불가능
```

### type과 interface

타입스크립트에서 객체를 타이핑하기 위해 자주 사용하는 키워드로 type과 interface가 있다.

```javascript
type NoticePopupType = {
    title: string;
    description:string;
};

interface INoticePopup {
    title: string;
    description: string;
}

const noticePopup1: NoticePopupType = { ... }
const noticePopup2: INoticePopup = { ... }

// 이것은 다르게 정의했지만 구조적 타이핑의 원리로 서로 할당 가능
const a: NoticePopupType = { title: "hi", description: "yo" };
const b: INoticePopup   = a;  // ✅ 호환됨
```

### function

자바스크립트는 함수도 일종의 객체로 간주하지만 typeof 연산자로 함수 타입을 출력해보면 자바스크립트는 함수를 function이라는 별도 타입으로 분류한다.

```javascript
function add(a, b) {
  return a + b;
}

console.log(typeof add); // 'function'
```

타입스크립트에서도 함수를 별도 함수 타입으로 지정할 수 있다.  
함수 선언부에서 매개변수의 별도 타입을 지정하고, 반환하는 값이 있다면 반환 값에 대한 타이핑도 필요하다.

```javascript
function add(a: number, b: number): number {
  return a + b;
}
```

위 예시는 함수를 작성할 때 매개변수와 반환 값에 대한 타이핑을 하는 문법이다.  
함수 자체의 타입은 다음과 같이 호출 시그니처를 정의하는 방식을 사용하면 된다.

```javascript
type add = (a: number, b: number) => number;
```

호출 시그니처는 자바스크립트의 화살표 함수와 맥락이 유사하다.

---

## 새로 알게된 부분

### object vs {} vs Object

- object : 원시타입 제외 모든 값과 호환된다.
- {} : 사실상 null과 undefined를 제외한 모든 값이 허용된다.
- Object : 자바스크립트 내장 객체 래퍼 타입 (new Object()와 같은것)

### typeof null

typeof null === "object"는 역사적 버그이다.

- JS 초창기에는 값이 32비트 태그(tagged value)로 표현됐음
- 이때 객체는 내부적으로 000패턴으로 태깅되었는데, null도 0x00으로 표현돼서 같은 패턴을 가짐
- 그래서 typeof null이 "object"로 잘못 나오게 되었고, 나중에 수정하기에는 기존 코드와의 호환성 문제가 너무 커서 그대로 남기게 됨
- 그래서 실제로 null판별을 할때는 항상 value === null, value == null 등을 사용해서 직접 비교를 해야함

### enum

- 단순 타입의 개념이 아닌 런타임에 실제 값이 존재한다.
- enum은 컴파일 후 객체로 변환되므로 번들 크기문제 및 호환성 이슈가 있다.
- 그래서 요즘은 as const + 유니온 타입을 더 많이 권장한다고 한다.
