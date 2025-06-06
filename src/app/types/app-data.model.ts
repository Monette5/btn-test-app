export enum ShippingUnitOfMeasure {
    NUM_OF_ITEMS = 'NUM_OF_ITEMS',
    WEIGHT_IN_KG = 'WEIGHT_IN_KG',
    WEIGHT_IN_LB = 'WEIGHT_IN_LB'
  }
  
  export enum ShippingMethodType {
    STANDARD = 'STANDARD',
    EXPRESS = 'EXPRESS' 
  }
  
  export interface ShippingCosts {
    first: number;
    second: number;
    thirdAndUp: number;
  }
  
  export interface ShippingAppData {
  shippingMethods: {
    code: string;
    title: string;
    type: ShippingMethodType;
    unitOfMeasure: ShippingUnitOfMeasure;
    costs: ShippingCosts;
    logistics: {
      deliveryTime: string;
    };
   }[];
  }