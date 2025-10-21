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

