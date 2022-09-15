import React, { useMemo, useState } from 'react'
import countryToCurrency from 'country-to-currency';

function Currency({ amount }) {
    let [countryCurrency, setCountryCurrency] = useState(null)


    useMemo(() => {
        fetch('https://extreme-ip-lookup.com/json/?key=9SApWc9vbGqdGyUvmevu')
            .then(res => res.json())
            .then(response => {
                console.log(response)
                let country = countryToCurrency[response.countryCode]
                setCountryCurrency(country);
            })
            .catch((data, status) => {
                console.log('Request failed:', data);
            });
    }, [])

    return (
        <div>{countryCurrency}  {amount}</div>
    )
}

export default Currency