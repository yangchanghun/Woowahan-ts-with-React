# 고급타입 (83p~ 118p)

> 타입스크립트는 자바스크립트 자료형에는 없는 독자적인 타입 시스템을 가지고 있다.

## any 타입

### 특징

- 모든 값을 오류 없이 받을 수 있음
- 타입스크립트의 정적 타이핑을 무력화시킴
- 타입 검사를 무색하게 만들어 잠재적으로 위험한 상황 초래 가능
- **가급적 사용을 피하는 것이 좋음**

### any 타입 경고 설정

`tsconfig.json`에서 `noImplicitAny` 옵션을 활성화하면 any 타입 사용 시 경고를 발생시킬 수 있다.

```json
{
  "compilerOptions": {
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
```

### any를 사용해야 하는 경우

1. 개발 단계에서 임시로 값을 지정할 때
2. 어떤 값을 받아올지 정할 수 없을 때
3. 값을 예측할 수 없을 때

**결론**: 타입이 정확하게 정해지지 않았을 때 임시로 사용하되, 남발하지 말고 정말 필요한 경우에만 사용하자.

---

## unknown 타입

### any와의 차이점

`any`와 유사하게 모든 타입의 값을 할당받을 수 있지만, **any를 제외한 다른 타입으로 할당이 불가능**하다.

| 구분                 | any                                | unknown                                |
| -------------------- | ---------------------------------- | -------------------------------------- |
| 값 할당받기          | 어떤 타입이든 any 타입에 할당 가능 | 어떤 타입이든 unknown 타입에 할당 가능 |
| 다른 타입에 할당하기 | 어떤 타입으로도 할당 가능          | any를 제외한 다른 타입으로 할당 불가능 |
| 타입 검사            | 불필요 (위험)                      | 필수 (안전)                            |

### 코드 예시

```ts
let unknownValue: unknown;

// ✅ 모든 타입의 값을 할당 가능
unknownValue = 100;
unknownValue = "hello world";
unknownValue = () => console.log("this is unknown type");

// ✅ any 타입으로는 할당 가능
let someValue1: any = unknownValue;

// ❌ 다른 타입으로는 할당 불가능
let someValue: number = unknownValue; // 에러 발생
```

### unknown은 왜 필요할까?

**핵심 개념**:

> unknown 타입은 어떤 값이든 올 수 있음을 의미하면서도, 동시에 개발자에게 **엄격한 타입 검사를 강제**하는 의도를 담고 있다.

**특징**:

- unknown 타입은 어떤 타입이 할당되어 있는지 알 수 없기 때문에 값을 가져오거나 내부 속성에 접근할 수 없음
- 변수 할당 시에는 컴파일러가 경고하지 않지만, 실행 시 에러가 발생할 수 있음

**요약**:

- `unknown`: "뭐가 올지 모르니까 안전하게 처리하세요" (타입 검사 강제)
- `any`: "뭐가 와도 막 써도 됩니다" (타입 검사 무시)

### 사용 권장 사항

데이터 구조를 파악하기 힘들 때는 **any 타입 대신 unknown 타입을 사용하는 것이 권장**된다.

---

## void 타입

### 개념

함수가 **아무런 값도 반환하지 않을 때** 사용하는 타입이다.

### 코드 예시

```ts
function modalOpen(type: ModalType): void {
  feedbackSlice.action.createModal(type);
  // 반환값 없음
}
```

### JavaScript vs TypeScript

- **JavaScript**: 명시적 반환문이 없으면 `undefined` 반환
- **TypeScript**: `void` 타입 사용 (undefined와는 다른 개념)

### 특징

**1. 함수뿐만 아니라 변수에도 할당 가능**

```ts
let voidValue: void;
voidValue = undefined; // ✅ 가능
voidValue = null; // ⚠️ strictNullChecks에 따라 다름
```

단, 함수가 아닌 값에 void를 사용하는 것은 대부분 무의미하다.

**2. 할당 가능한 값**

- `undefined`: 항상 할당 가능 ✅
- `null`: `strictNullChecks` 옵션이 **비활성화**된 경우에만 가능

**3. 명시적 타입 선언**

일반적으로 void는 명시하지 않아도 된다. 타입스크립트 컴파일러가 **자동으로 추론**해주기 때문이다.

```ts
// void를 명시하지 않아도 자동 추론됨
function doSomething() {
  // 반환 타입: void
  console.log("작업 수행");
}
```

### 권장 사항

- 변수에 void를 사용하기보다는 명시적으로 `undefined` 또는 `null` 타입을 직접 사용하는 것이 더 바람직하다.
- 함수의 반환 타입은 컴파일러가 자동 추론해주므로, 굳이 void를 명시할 필요는 없지만 명시적으로 표현하고 싶다면 사용할 수 있다.
