import React, { useEffect } from "react";
import { FormControl } from "@mui/material";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import { useSelector, useDispatch } from "react-redux";
import FormControlLabel from "@mui/material/FormControlLabel";
import { motion } from "framer-motion";
import { getFreeShipping } from "../../slice/freeShippingSlice";
import { getDeals } from "../../slice/dealsPromotionsSlice";
import { getDiscounts } from "../../slice/discountsSlice";
import styles from "../../styles/pagefilters.module.css";
import { useTranslation } from "react-i18next";
import { Box } from "@mui/material";
function PageFilter({
  value,
  setDealsData,
  setShowDeals,
  setDiscountData,
  showDiscounts,
  setShowDiscounts,
  setFreeShippingData,
  setShowFreeShipping,
  setShowProduct,
  setShowAllCategoryPro,
  setShowAllMerchantPro,
  setFilterData,
}) {
  let dispatch = useDispatch();
  let { t, i18n } = useTranslation();
  useEffect(() => {
    //  dispatch(getFeatureProduct());
    dispatch(getDiscounts());
    dispatch(getFreeShipping());
    dispatch(getDeals());
  }, []);
  const handleChange = async (event) => {

    if (event.target.value == "deals") {
      let deals = await dispatch(getDeals());

      setDealsData(deals.payload);
      setShowProduct(false);
      setShowDeals(true);

      setShowAllCategoryPro(false);
      setShowAllMerchantPro(false);
      setShowDiscounts(false);
      setShowFreeShipping(false);
      setFilterData([]);
    }
    if (event.target.value == "discounts") {
      let discounts = await dispatch(getDiscounts());

      setDiscountData(discounts.payload);
      setShowProduct(false);
      setShowDiscounts(true);

      setShowAllCategoryPro(false);
      setShowAllMerchantPro(false);
      setShowDeals(false);
      setShowFreeShipping(false);
      setFilterData([]);
    }

    if (event.target.value == "freeShipping") {
      let freeShipping = await dispatch(getFreeShipping());

      setFreeShippingData(freeShipping.payload);
      setShowProduct(true);
      setShowDiscounts(false);
      setShowFreeShipping(true);
      setShowAllCategoryPro(false);
      setShowAllMerchantPro(false);
      setShowDeals(false);

      setFilterData([]);
    } else if (
      event.target.value == "freeShipping" &&
      showDiscounts &&
      showProduct
    ) {
      setShowDiscounts(false);
    }

    if (event.target.value == "clear") {
      setShowProduct(false);
      setShowDeals(false);

      setShowAllCategoryPro(false);
      setShowAllMerchantPro(false);
      setShowDiscounts(false);
      setShowFreeShipping(false);
      setFilterData([]);
    }
    // if (event.target.name == 'freeShipping') {
    //   router.push('/is_free_shipping')
    // }
  };

  return (
    <Box className={styles.otherFiltersDiv}>
      <FormControl>
        <RadioGroup
          // row
          className={styles.pageFilters}
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={value}
        >
          {/* <motion.div className="animatable" whileTap={{ scale: 0.9 }}> */}
          <FormControlLabel
            value="deals"
            control={<Radio onChange={(e) => handleChange(e)} />}
            label={t("Filter.PageFilter.Bundles")}
          />
          {/* </motion.div> */}
          {/* <motion.div className="animatable" whileTap={{ scale: 0.9 }}> */}
          <FormControlLabel
            value="discounts"
            control={<Radio onChange={(e) => handleChange(e)} />}
            label={t("Filter.PageFilter.Discounts")}
          />
          {/* </motion.div> */}
          {/* <motion.div className="animatable" whileTap={{ scale: 0.9 }}> */}
          <FormControlLabel
            value="freeShipping"
            control={<Radio onChange={(e) => handleChange(e)} />}
            label={t("Filter.PageFilter.Free Shipping")}
          />
          {/* </motion.div> */}
          {/* <motion.div className="animatable" whileTap={{ scale: 0.9 }}> */}
          <FormControlLabel
            value="clear"
            control={<Radio onChange={(e) => handleChange(e)} />}
            label={t("Filter.PageFilter.clear")}
          />
          {/* </motion.div> */}
        </RadioGroup>
      </FormControl>
    </Box>
  );
}

export default PageFilter;
