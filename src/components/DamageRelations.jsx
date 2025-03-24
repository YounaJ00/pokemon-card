import React, { useEffect } from 'react'

const DamageRelations = ({damages}) => {

    useEffect(() => {
      const arrayDamage = damages.map((damage) => 
        seperateObjectBetweenToAndForm(damage)) 

      if(arrayDamage.length === 2){
        // 합치는 부분
      } else {
        postDamageValue(arrayDamage[0].from);
      }

    }, [])

    const postDamageValue = (props) => {
       const result =  Object.entries(props)
            .reduce((acc, [keyName, value]) => {
                
                const key = keyName;

                const valueOfKeyName = {
                    double_damage: '2x',
                    half_damage: '1/2x',
                    no_damage: '0x'
                };

                
                return (acc = {[keyName]: value.map(i => ({
                    damageValue: valueOfKeyName[key],
                    ...i
                })),
                ...acc
            })

            }, {})

            console.log(result);
    }
    
    const seperateObjectBetweenToAndForm = (damage) => {
        const from = filterDamageRelations('_from', damage);
        const to = filterDamageRelations('_to', damage);
        return {from, to};
    }

    const filterDamageRelations = (valueFilter, damages) => {
        const result = Object.entries(damages)
        .filter(([keyName, value]) => {
            return keyName.includes(valueFilter);
        })
        .reduce((acc, [keyName, value]) => {
            const keyWithValueFilterRemove = keyName.replace(
                valueFilter,
                ''
            )
            return (acc = {[keyWithValueFilterRemove]: value, ...acc})
        },{})

        return result;
    }

  return (
    <div>DamageRelations</div>
  )
}

export default DamageRelations