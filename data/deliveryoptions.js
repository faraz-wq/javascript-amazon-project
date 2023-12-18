export const deliveryoptions = [{
    id: '1',
    deliverydays: 7,
    priceCents: 0
},{
    id:'2',
    deliverydays: 3,
    priceCents: 499
},{
    id:'3',
    deliverydays: 1,
    priceCents: 999
}];

export function getdeliveryoption(deliveryOptionId){
    let deliveryoption;

    deliveryoptions.forEach((option) => {
        if (option.id === deliveryOptionId) {
            deliveryoption = option;
        }
    });

    return deliveryoption;

}