import {
  getLinkedFields
} from "./chunk-J2YTAFBQ.mjs";

// src/routes/products/product-detail/constants.ts
var PRODUCT_DETAIL_FIELDS = getLinkedFields(
  "product",
  "*categories,*shipping_profile,-variants"
);

export {
  PRODUCT_DETAIL_FIELDS
};
