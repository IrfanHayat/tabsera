import React from 'react'
import ShippingInformation from '../../pages/shipping_information'
import ShippingMethods from '../../pages/shipping_methods'
import CheckoutWizard from "../../container/CheckoutWizard";
function Index() {
    return (
        <>
            <CheckoutWizard activeStep={1} />
            <ShippingInformation />
            <ShippingMethods />
        </>
    )
}

export default Index