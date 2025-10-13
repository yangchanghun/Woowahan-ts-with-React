# 3장 고급 타입

#### 자바스크립트 자료형에 없는 타입스크립트만의 타입 시스템을 소개한다. 그리고 타입의 개념을 응용하여 좀 더 심화한 타입 검사를 수행하는 데 필요한 지식을 살펴본다.

---

## 타입스크립트만의 독자적 타입 시스템

<p>
    <img src="assets\20251013_101849__2025-10-13 101724.png" >
</p>

1. any

   - 모든 값을 오류 없이 받음
     (자바스크립트에서의 기본적인 사용 방식과 같으므로 타입을 명시하지 않은 것과 동일한 효과)
   - tsconfig. json 파일에서 nolm-plicitAny 옵션을 활성화하면 타입이 명시되지 않은 변수의 암묵적인 any 타입에 대한 경고를 발생
   - 개발 단계에서 임시로 값을 지정해야 할 경우
   - 어떤 값을 받아올지 또는 넘겨줄지 정할 수 없는 경우
   - 값을 예측할 수 없을 경우 (암묵적 사용)

2. unknown

   - 이 변수에 어떤 타입의 값이 들어올지 모르겠다
   - 모든 타입의 값이 할당 될 수 있으나, any 를 제외한 다른 타입으로 선언된 변수에는 할당할 수 없음
   - 런타임 시 에러 발생
   - 타입 검사를 강제하고 타입 식별이 되면 사용 가능

   ```ts
   let unknownvalue： unknown;

   unknownvalue = 100;
   unknownvalue = "hello world”;
   unknownvalue = () => console.logC'this is any type’);

   let someValuel： any = unknownvalue;
   let someValue2： number = unknownValue; // (X)
   let someValue3： string = unknownvalue; // (X)

   // 사용 가능 예시
   let value: unknown = "hello";

   // ✅ 타입 체크 후 사용 가능
   if (typeof value === "string") {
   console.log(value.toUpperCase()); // 이제 OK!
   }

   if (typeof value === "number") {
   console.log(value.toFixed(2));
   }
   ```

3. void

   - 아무런 값도 반환하지 않는다.
   - 주로 함수의 반환 타입으로 사용하며, 변수에서는 실용성이 낮다.

   ```ts
   // ✅ 반환값이 없는 함수
   function sayHello(): void {
     console.log("Hello!");
     // return 문이 없거나 return만 있음
   }

   function logMessage(msg: string): void {
     console.log(msg);
     return; // return만 있어도 OK
   }

   let result: void;

   result = undefined; // ✅ OK
   result = null; // ✅ OK (strictNullChecks 꺼진 경우)

   // ❌ 다른 값은 할당 불가
   result = 123; // 에러
   result = "hello"; // 에러

   // strictNullChecks: true (켜진 경우)
   result = undefined; // ✅ OK
   result = null; // ❌ 에러! Type 'null' is not assignable to type 'void'
   ```

   ```ts
   /** 1. 일반 타입에 null/undefined 할당 불가 */
   let name: string = "John";
   name = null; // ❌ 에러
   name = undefined; // ❌ 에러

   // null/undefined 허용하려면 명시적으로 표시
   let name2: string | null = "John";
   name2 = null; // ✅ OK

   /** 2. 함수 매개변수 */
   function greet(name: string) {
     console.log(name.toUpperCase());
   }

   // strictNullChecks: true
   greet(null); // ❌ 에러
   greet(undefined); // ❌ 에러

   /** 3. 선택적 속성 */
   interface User {
     name: string;
     age?: number; // age는 number | undefined
   }

   const user: User = { name: "John" };
   // strictNullChecks: true
   const age: number = user.age; // ❌ 에러 (undefined일 수 있음)
   ```

4. never

   - 일반적으로 함수와 관련하여 많이 사용, 타입 값을 반환할 수 없음
   - 마지막 에러를 던지는 작업, 무한히 함수가 실행되는 경우
   - 조건부 타입을 결정할 때 특정 조건을 만족하지 않는 경우에 타입 검사 목적으로 사용

5. Array

   - 표기법

   ```ts
   // 대괄호 표기법(권장 사용법)
   let numbers: number[] = [1, 2, 3];
   let names: string[] = ["Alice", "Bob"];
   let booleans: boolean[] = [true, false];

   // 제네릭 표기법
   let numbers: Array<number> = [1, 2, 3];
   let names: Array<string> = ["Alice", "Bob"];
   let booleans: Array<boolean> = [true, false];
   ```

   - 유니온 타입

   ```ts
   // 숫자 또는 문자열을 담는 배열
   let mixed: (number | string)[] = [1, "hello", 2, "world"];

   // 또는
   let mixed2: Array<number | string> = [1, "hello", 2];
   ```

   - 튜플(Tuple): 고정된 길이와 각 위치마다 정해진 타입을 가지는 배열
   - React의 useState (대표적인 튜플 사례)
   - 런타임 에러 방지, 유지보수 편의성으로 사용

   ```ts
   // 타입과 개수가 정해짐
   let user: [string, number] = ["John", 25];
   //          ^^^^^^  ^^^^^^
   //          첫번째   두번째
   //          문자열   숫자

   // ✅ 정확히 2개, 정확히 이 타입들
   let user2: [string, number] = ["Jane", 30];

   // ❌ 에러들
   let user3: [string, number] = ["Bob"]; // 1개만? 안돼!
   let user4: [string, number] = ["Alice", 25, 3]; // 3개? 안돼!
   let user5: [string, number] = [25, "Tom"]; // 순서 바꿈? 안돼!

   const [count, setCount] = useState(0);
   //     값      값을 변경하는 함수
   ```

   - 각 값의 의미를 명확히 알고 싶을 때는 객체 사용

   ```ts
   // ❌ 튜플: 헷갈림
   let user: [string, number, string, boolean] = [
     "John",
     25,
     "john@email.com",
     true,
   ];

   // ✅ 객체: 명확함
   let user = {
     name: "John",
     age: 25,
     email: "john@email.com",
     isActive: true,
   };
   ```

   - 스프레드 연산자를 활용한 튜플

   ```ts
   // 일반 튜플: 딱 2개만
   let normal: [string, number] = ["John", 25];

   // 스프레드 튜플: 첫 2개는 고정, 나머지는 숫자 여러 개 OK
   let flexible: [string, number, ...number[]] = ["John", 25, 1, 2, 3, 4, 5];
   // 나머지는 숫자 배열처럼!

   //예시
   // 헤더 + 데이터
   type ScoreData = [string, ...number[]];
   const math: ScoreData = ["수학", 90, 85, 92, 88];
   // 이름 + 나이 + 취미
   type Person = [string, number, ...string[]];
   const person1: Person = ["John", 25, "축구", "영화", "독서"];
   const person1: Person = ["John", 25]; // 없어도 됨.

   // 첫 번째 인자는 문자열, 나머지는 숫자들
   function calculate(operation: string, ...numbers: number[]) {
     // ...
   }

   calculate("sum", 1, 2, 3, 4, 5);
   calculate("average", 10, 20);

   // API 응답 타입 [상태, 메시지, ...데이터들]
   type ApiResponse = [number, string, ...any[]];

   const success: ApiResponse = [200, "OK", { id: 1 }, { id: 2 }];
   const error: ApiResponse = [404, "Not Found"];
   ```

6. enum

   - 열거형을 정의할 수 있음. 열거형은 각 멤버를 갖고 있음
   - 주로 문자열 상수를 생성하는데 사용 (응집력있는 집합 구조체 생성, 사용자 입장에서도 간편하게 활용)

   ```ts
   // ✅ 상태를 enum으로 관리
   enum Status {
     Pending = "PENDING",
     Approved = "APPROVED",
     Rejected = "REJECTED",
   }

   // 사용
   let orderStatus: Status = Status.Approved;

   // ❌ enum 없이 문자열로 관리하면?
   let status = "APROVED"; // 오타! 😱
   ```

   - 숫자로만 이루어져 있거나 자동으로 추론한 열거형은 안전하지 않음

     - 아무 숫자나 할당 가능

   - 열거형은 타입 공간과 값 공간에서 모두 사용

   ```ts
   enum Color {
     Red = "RED",
     Blue = "BLUE",
     Green = "GREEN",
   }

   // 1️⃣ 타입 공간에서 사용 (타입 선언)
   function setColor(color: Color) {
     //                       ^^^^^
     //                       여기는 "타입"으로 사용
     console.log(color);
   }

   // 2️⃣ 값 공간에서 사용 (실제 값)
   setColor(Color.Red);
   //       ^^^^^^^^^
   //       여기는 "값"으로 사용
   ```

   - 타입스크립트 코드가 자바스크립트로 변환될 때 즉시 실행 함수 형식으로 변환
   - 일부 번들러에서 트리쉐이킹 과정 중 즉시 실행 함수로 변환된 값을 사용하지 않는 코드로 인식하지 못하는 경우가 발생할 수 있음
   - 불필요한 코드의 크기 증가

   ```ts
   // 가장 현대적이고 유연한 방법
   // ✅ as const 객체 사용 (추천!)
   export const Status = {
     Pending: "PENDING",
     Approved: "APPROVED",
     Rejected: "REJECTED",
   } as const;

   export type Status = (typeof Status)[keyof typeof Status];

   // 타입으로 사용
   let status: Status = Status.Pending;

   // 값으로도 사용 (순회 가능)
   Object.keys(Status); // ✅ OK
   Object.values(Status); // ✅ OK

   // 트리쉐이킹도 잘 됨!
   ```
