type Step1 ={
    b: string;
    c: string;
    z: string;
  }
  
  type Step2 ={
    a: string;
    b: string;
    c: string;
    x: string;
  }
  
  type CombinedType = Step1 & Step2
  
  function getStep(step: CombinedType) {
    return step.a;
  }