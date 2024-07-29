export const delieveryOptions = [{
    id: '1',
    delieveryDays : 7,
    priceCents: 0
},{
    id: '2',
    delieveryDays: 3,
    priceCents: 499
},{
    id: '3',
    delieveryDays: 1,
    priceCents: 999
}]

export function getDelieveryOption(delieveryOptionId){
    let delieveryOption;

    delieveryOptions.forEach((option) => {
  
  if(option.id === delieveryOptionId){
    delieveryOption = option
  }
    })

    return delieveryOption || delieveryOptions[0]
}