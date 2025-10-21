interface A {
  value: "A"; // 유닛 타입 (리터럴)
  answer: 1;
}

interface B {
  value: string; // string,number,void같은 타입은 유닛타입으로 적용되지 않음.
  answer: 2;
}
interface C {
  value: Error; // 인스턴스화가 가능한 타입.
  answer: 3;
}

type Unions = A | B | C;

function handle(param: Unions) {
  // 판별자가 value일 때

  param.answer; // 1 | 2 | 3

  // a는 리터럴타입이라 타입 좁히기가 가능.
  // 이는 string타입에 포함이 되므로 param은 A 또는 B타입으로 좁혀진다.
  if (param.value == "A") {
    param.answer; //1 | 2
  }
  // 예는 인스턴스화 되는 타입이라 좁히기가 불가능
  if (param.value instanceof Error) {
    param.answer; //1 | 2 | 3
  }
  // 판별자가 유닛 타입이므로 타입이 좁혀짐.
  if (param.answer == 1) {
    const msg = param.value.msg;
    param.value; // a;
  }
}
