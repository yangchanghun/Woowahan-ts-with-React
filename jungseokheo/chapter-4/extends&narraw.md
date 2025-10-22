# Q1. 타입 확장하기에서 유니온 타입과 교차타입을 설명하는데 값을 기준으로 한다는 말이 뭐야? 수학적인 개념과는 반대인거야?

값 집합 관점에서 이해하기
1. 유니온 타입 (A | B)

가능한 값들이 더 많아짐 (집합의 합집합)
A 타입의 값 또는 B 타입의 값을 가질 수 있음
값의 선택지가 확장됨

```ts
typescripttype A = { name: string };
type B = { age: number };
type Union = A | B;

// 가능한 값들:
const u1: Union = { name: "Alice" }; // A만
const u2: Union = { age: 25 }; // B만
const u3: Union = { name: "Bob", age: 30 }; // 둘 다도 가능
```

2. 교차 타입 (A & B)

모든 속성을 만족해야 함 (집합의 교집합)
A 타입의 요구사항 그리고 B 타입의 요구사항을 모두 충족
더 엄격한 조건

```ts
typescripttype A = { name: string };
type B = { age: number };
type Intersection = A & B;

// 반드시 둘 다 필요:
const i: Intersection = { name: "Alice", age: 25 }; // OK
// const i2: Intersection = { name: "Bob" }; // Error!
```

왜 반대처럼 느껴질까?
수학에서 ∪(합집합)는 더 커지고, ∩(교집합)는 더 작아지죠. 타입스크립트도 값의 개수로 보면 동일합니다. 
하지만 기호(|, &)와 타입의 엄격함을 기준으로 생각하면 헷갈릴 수 있어요

| (유니온): 느슨함, 선택지가 많음
& (교차): 엄격함, 모든 조건을 만족해야 함

# Q2. extends를 사용했을 때 에러가 나는 이유와 & 로 바꿨을 때 never 가 되는 이유

1. extends를 사용했을 때 에러가 나는 이유
```ts
interface DeliveryTip {
  tip: number;
}

interface Filter extends DeliveryTip {
  tip: string; // ❌ Error!
}
```

extends는 "확장"의 의미입니다. 즉, Filter는 DeliveryTip의 모든 것을 물려받고 추가로 뭔가를 더하는 개념이에요.

DeliveryTip은 이미 tip: number라고 정의했어요
Filter가 extends로 상속받으면서 tip: string으로 재정의하려고 시도
이건 모순이죠! "tip은 number야" 라고 부모가 말했는데, 자식이 "아니야 string이야"라고 하는 격

비유: 부모가 "우리 집 강아지는 골든 리트리버야"라고 했는데, 자식이 "아니야 우리 집 강아지는 치와와야"라고 하면 모순이죠!

2. & 로 바꿨을 때 never 가 되는 이유

```ts
type Filter = DeliveryTip & { tip: string };
// Filter의 tip은 number & string = never
```

&는 "교차"의 의미입니다. 즉, 양쪽 조건을 동시에 만족해야 해요.

tip은 number 이면서 동시에 string이어야 함
하나의 값이 동시에 number이면서 string일 수는 없죠!
그래서 타입스크립트는 "이런 값은 존재할 수 없어" = never 타입

비유: "키가 180cm 이면서 동시에 160cm인 사람"을 찾으라는 것과 같아요. 불가능하죠!

* `extends`: 상속이므로 부모의 타입을 덮어쓸 수 없음 (호환되는 타입으로 좁히는 건 가능)
* `&`: 교차이므로 양쪽 조건을 모두 만족, number & string은 불가능해서 never

# Q3. is 연산자로 사용자 정의 타입 가드 만들어 활용..?

is 연산자를 사용해서 내가 직접 타입을 체크하는 함수를 만든다...

```ts
function 함수명(매개변수: 타입): 매개변수 is 특정타입 {
  // 타입 체크 로직
  return true 또는 false;
}
```

실제 예시

```ts
interface Dog {
  name: string;
  bark(): void;
}

interface Cat {
  name: string;
  meow(): void;
}

type Animal = Dog | Cat;

// 사용자 정의 타입 가드 만들기
function isDog(animal: Animal): animal is Dog {
  return (animal as Dog).bark !== undefined;
}

// 사용하기
function makeSound(animal: Animal) {
  if (isDog(animal)) {
    // 여기서 animal은 Dog 타입으로 취급됨
    animal.bark(); // ✅ OK
  } else {
    // 여기서 animal은 Cat 타입으로 취급됨
    animal.meow(); // ✅ OK
  }
}
```

* 왜 사용할까?

  * 복잡한 타입 체크 로직을 재사용 가능한 함수로 만들어서, TypeScript가 자동으로 타입을 좁혀주도록.

# Q4. 식별할 수 있는 유니온???? 뭔데... 그게..

**공통 속성을 이용해 타입을 쉽게 구분하는 패턴**
죽, 여러 타입 중 어떤 타입인지 **구분할 수 있는 표시(태그)** 를 달아두는 것

일반적인 유니온

```ts
interface Success {
  data: string;
}

interface Error {
  message: string;
}

type Result = Success | Error;

function handleResult(result: Result) {
  // data가 있는지 확인해야 Success인지 알 수 있음 (복잡!)
  if ('data' in result) {
    console.log(result.data);
  }
}

```

식별할 수 있는 유니온

1. 에러 정의하기

  ```ts
  // 여러 종류의 에러를 판별자로 구분
  interface NetworkError {
    type: 'network';
    code: number;
  }

  interface ValidationError {
    type: 'validation';
    field: string;
  }

  type AppError = NetworkError | ValidationError;
  ```

2. 식별할 수 있는 유니온

  * 위 처럼 공통된 속성 (`type`)으로 타입을 구분 가능한 유니온

3. 판별자(Discriminator) 선정
  
판별자 선택 기준

  * 모든 타입에 동일한 이름의 속성이 있어야 함.
  * 각 타입마다 고유한 값을 가져야 함.
  * 보통 `type`, `kind`, `status` 같은 이름 사용.

종합적인 내용

```ts
// 에러 정의 예시
type ApiError = 
  | { type: 'network'; code: number; message: string }
  | { type: 'validation'; field: string; error: string }
  | { type: 'auth'; reason: string };

function handleError(error: ApiError) {
  switch (error.type) {  // 판별자: type
    case 'network':
      return `네트워크 에러 ${error.code}: ${error.message}`;
    case 'validation':
      return `${error.field} 필드 검증 실패`;
    case 'auth':
      return `인증 실패: ${error.reason}`;
  }
}
```