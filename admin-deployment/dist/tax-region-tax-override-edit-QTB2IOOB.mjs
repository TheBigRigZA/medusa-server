import {
  TargetForm,
  TargetItem,
  TaxRateRuleReferenceSchema,
  createTaxRulePayload
} from "./chunk-B63VOSZH.mjs";
import {
  TaxRateRuleReferenceType
} from "./chunk-V3MOBCDF.mjs";
import "./chunk-KKFEMHQJ.mjs";
import "./chunk-ITD4DT6X.mjs";
import "./chunk-QMRGIWOP.mjs";
import "./chunk-2WZUO66T.mjs";
import "./chunk-I3VB6NM2.mjs";
import "./chunk-ZJRFL6ZN.mjs";
import "./chunk-DFA6WGYO.mjs";
import "./chunk-I5HYE2RW.mjs";
import "./chunk-RIV7FKGN.mjs";
import "./chunk-TDK3JDOB.mjs";
import "./chunk-FHSC5X62.mjs";
import "./chunk-XR4GEMGR.mjs";
import "./chunk-WRSGHGAT.mjs";
import "./chunk-MOSRJHJ3.mjs";
import "./chunk-J72NEP54.mjs";
import "./chunk-OMC5JCQH.mjs";
import {
  PercentageInput
} from "./chunk-YRY2CZ6I.mjs";
import "./chunk-ON6JXYAB.mjs";
import "./chunk-XMAWMECC.mjs";
import "./chunk-SJ3E4T6B.mjs";
import "./chunk-NNBHHXXN.mjs";
import "./chunk-IR5DHEKS.mjs";
import "./chunk-7DXVXBSA.mjs";
import "./chunk-PDWBYQOW.mjs";
import "./chunk-MSDRGCRR.mjs";
import "./chunk-G3QXMPRB.mjs";
import "./chunk-PCFUZKDS.mjs";
import "./chunk-IQBAUTU5.mjs";
import "./chunk-ADOCJB6L.mjs";
import "./chunk-LQTHYS2Z.mjs";
import "./chunk-P3UUX2T6.mjs";
import "./chunk-B2JT2FOA.mjs";
import "./chunk-YEDAFXMB.mjs";
import "./chunk-AOFGTNG6.mjs";
import "./chunk-EMIHDNB7.mjs";
import "./chunk-MWVM4TYO.mjs";
import "./chunk-GW6TVOAA.mjs";
import "./chunk-CBSCX7RE.mjs";
import "./chunk-LT4MVCA7.mjs";
import "./chunk-A2UMBW3V.mjs";
import "./chunk-W7625H47.mjs";
import "./chunk-DLZWPHHO.mjs";
import "./chunk-LSEYENCI.mjs";
import "./chunk-FVK4ZYYM.mjs";
import "./chunk-FZRIVT5D.mjs";
import "./chunk-GJUPECDU.mjs";
import "./chunk-M3VFKDXJ.mjs";
import "./chunk-C76H5USB.mjs";
import "./chunk-PFKKVLZX.mjs";
import {
  SwitchBox
} from "./chunk-D7H6ZNK4.mjs";
import "./chunk-IUCDCPJU.mjs";
import {
  KeyboundForm
} from "./chunk-6HTZNHPT.mjs";
import {
  RouteDrawer,
  StackedDrawer,
  useRouteModal,
  useStackedModal
} from "./chunk-4TC5YS65.mjs";
import "./chunk-DG7J63J2.mjs";
import "./chunk-MNXC6Q4F.mjs";
import "./chunk-LPEUYMRK.mjs";
import "./chunk-OC7BQLYI.mjs";
import "./chunk-67ORSRVT.mjs";
import {
  Form
} from "./chunk-OBQI23QM.mjs";
import {
  useProductTags
} from "./chunk-Z5UDPQIH.mjs";
import "./chunk-KOSCMAIC.mjs";
import {
  useTaxRate,
  useUpdateTaxRate
} from "./chunk-X6DSNTTX.mjs";
import "./chunk-I6E6CALJ.mjs";
import {
  useProductTypes
} from "./chunk-B4GODIOW.mjs";
import "./chunk-F6IJV2I2.mjs";
import "./chunk-QTCZFYFH.mjs";
import "./chunk-ENV6YVOM.mjs";
import "./chunk-PIR2H25N.mjs";
import "./chunk-RLY2SL5E.mjs";
import "./chunk-C5LYZZZ5.mjs";
import "./chunk-2ZKVRTBW.mjs";
import "./chunk-FO3VP56P.mjs";
import "./chunk-YS65UGPC.mjs";
import {
  useCustomerGroups
} from "./chunk-F6PXCY3N.mjs";
import {
  useCollections
} from "./chunk-3OHH43G6.mjs";
import "./chunk-G2H6MAK7.mjs";
import "./chunk-GRT22PE5.mjs";
import "./chunk-32IQRUVY.mjs";
import "./chunk-FNYASI54.mjs";
import "./chunk-FVC7M755.mjs";
import "./chunk-ZJ3OFMHB.mjs";
import "./chunk-PNU5HPGY.mjs";
import "./chunk-V2LANK5S.mjs";
import "./chunk-QZ6PT4QV.mjs";
import "./chunk-QL4XKIVL.mjs";
import {
  useProducts
} from "./chunk-6I62UDJA.mjs";
import "./chunk-FXYH54JP.mjs";
import "./chunk-774WSTCC.mjs";
import "./chunk-DEQUVHHE.mjs";
import "./chunk-RPUOO7AV.mjs";

// src/routes/tax-regions/tax-region-tax-override-edit/tax-region-tax-override-edit.tsx
import { Heading as Heading2 } from "@medusajs/ui";
import { useTranslation as useTranslation2 } from "react-i18next";
import { useParams } from "react-router-dom";

// src/routes/tax-regions/tax-region-tax-override-edit/components/tax-region-tax-override-edit-form/tax-region-tax-override-edit-form.tsx
import { zodResolver } from "@hookform/resolvers/zod";
import { MagnifyingGlass } from "@medusajs/icons";
import {
  Button,
  Divider,
  Heading,
  Hint,
  Input,
  Label,
  Select,
  Text,
  clx,
  toast
} from "@medusajs/ui";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { jsx, jsxs } from "react/jsx-runtime";
var STACKED_MODAL_ID = "tr";
var getStackedModalId = (type) => `${STACKED_MODAL_ID}-${type}`;
var TaxRegionTaxRateEditSchema = z.object({
  name: z.string().min(1),
  code: z.string().min(1),
  rate: z.object({
    float: z.number().optional(),
    value: z.string().optional()
  }),
  is_combinable: z.boolean().optional(),
  enabled_rules: z.object({
    product: z.boolean(),
    product_type: z.boolean()
    // product_collection: z.boolean(),
    // product_tag: z.boolean(),
    // customer_group: z.boolean(),
  }),
  product: z.array(TaxRateRuleReferenceSchema).optional(),
  product_type: z.array(TaxRateRuleReferenceSchema).optional()
  // product_collection: z.array(TaxRateRuleReferenceSchema).optional(),
  // product_tag: z.array(TaxRateRuleReferenceSchema).optional(),
  // customer_group: z.array(TaxRateRuleReferenceSchema).optional(),
});
var TaxRegionTaxOverrideEditForm = ({
  taxRate,
  isCombinable = false,
  initialValues
}) => {
  const { t } = useTranslation();
  const { handleSuccess } = useRouteModal();
  const { setIsOpen } = useStackedModal();
  const form = useForm({
    defaultValues: {
      name: taxRate.name,
      code: taxRate.code,
      rate: {
        value: taxRate.rate?.toString() || ""
      },
      is_combinable: taxRate.is_combinable,
      enabled_rules: {
        product: initialValues.product.length > 0,
        product_type: initialValues.product_type.length > 0
        // customer_groups: initialValues.customer_group.length > 0,
        // product_collections:
        //   initialValues.product_collections.length > 0,
        // product_tags: initialValues.product_tag.length > 0,
      },
      product: initialValues.product,
      product_type: initialValues.product_type
      // product_collections: initialValues.product_collection,
      // product_tags: initialValues.product_tag,
      // customer_groups: initialValues.customer_group,
    },
    resolver: zodResolver(TaxRegionTaxRateEditSchema)
  });
  const { mutateAsync, isPending } = useUpdateTaxRate(taxRate.id);
  const handleSubmit = form.handleSubmit(async (values) => {
    const {
      product,
      product_type
      // customer_groups,
      // product_collections,
      // product_tags,
    } = values;
    const productRules = createTaxRulePayload({
      reference_type: "product" /* PRODUCT */,
      references: product || []
    });
    const productTypeRules = createTaxRulePayload({
      reference_type: "product_type" /* PRODUCT_TYPE */,
      references: product_type || []
    });
    const rules = [
      productRules,
      productTypeRules
      // customerGroupRules,
      // productCollectionRules,
      // productTagRules,
    ].filter((rule) => Boolean(rule)).flatMap((r) => r);
    await mutateAsync(
      {
        name: values.name,
        code: values.code || null,
        rate: values.rate?.float,
        is_combinable: values.is_combinable,
        rules
      },
      {
        onSuccess: () => {
          toast.success(t("taxRegions.taxRates.edit.successToast"));
          handleSuccess();
        },
        onError: (error) => {
          toast.error(error.message);
        }
      }
    );
  });
  const products = useFieldArray({
    control: form.control,
    name: "product"
  });
  const productTypes = useFieldArray({
    control: form.control,
    name: "product_type"
  });
  const getControls = (type) => {
    switch (type) {
      case "product" /* PRODUCT */:
        return products;
      case "product_type" /* PRODUCT_TYPE */:
        return productTypes;
    }
  };
  const referenceTypeOptions = [
    {
      value: "product" /* PRODUCT */,
      label: t("taxRegions.fields.targets.options.product")
    },
    {
      value: "product_type" /* PRODUCT_TYPE */,
      label: t("taxRegions.fields.targets.options.productType")
    }
    // {
    //   value: TaxRateRuleReferenceType.PRODUCT_COLLECTION,
    //   label: t("taxRegions.fields.targets.options.productCollection"),
    // },
    // {
    //   value: TaxRateRuleReferenceType.PRODUCT_TAG,
    //   label: t("taxRegions.fields.targets.options.productTag"),
    // },
    // {
    //   value: TaxRateRuleReferenceType.CUSTOMER_GROUP,
    //   label: t("taxRegions.fields.targets.options.customerGroup"),
    // },
  ];
  const searchPlaceholders = {
    ["product" /* PRODUCT */]: t(
      "taxRegions.fields.targets.placeholders.product"
    ),
    ["product_type" /* PRODUCT_TYPE */]: t(
      "taxRegions.fields.targets.placeholders.productType"
    )
    // [TaxRateRuleReferenceType.PRODUCT_COLLECTION]: t(
    //   "taxRegions.fields.targets.placeholders.productCollection"
    // ),
    // [TaxRateRuleReferenceType.PRODUCT_TAG]: t(
    //   "taxRegions.fields.targets.placeholders.productTag"
    // ),
    // [TaxRateRuleReferenceType.CUSTOMER_GROUP]: t(
    //   "taxRegions.fields.targets.placeholders.customerGroup"
    // ),
  };
  const getFieldHandler = (type) => {
    const { fields, remove, append } = getControls(type);
    const modalId = getStackedModalId(type);
    return (references) => {
      if (!references.length) {
        form.setValue(type, [], {
          shouldDirty: true
        });
        setIsOpen(modalId, false);
        return;
      }
      const newIds = references.map((reference) => reference.value);
      const fieldsToAdd = references.filter(
        (reference) => !fields.some((field) => field.value === reference.value)
      );
      for (const field of fields) {
        if (!newIds.includes(field.value)) {
          remove(fields.indexOf(field));
        }
      }
      append(fieldsToAdd);
      setIsOpen(modalId, false);
    };
  };
  const displayOrder = /* @__PURE__ */ new Set([
    "product" /* PRODUCT */
  ]);
  const disableRule = (type) => {
    form.setValue(type, [], {
      shouldDirty: true
    });
    form.setValue(`enabled_rules.${type}`, false, {
      shouldDirty: true
    });
    displayOrder.delete(type);
  };
  const enableRule = (type) => {
    form.setValue(`enabled_rules.${type}`, true, {
      shouldDirty: true
    });
    form.setValue(type, [], {
      shouldDirty: true
    });
    displayOrder.add(type);
  };
  const watchedEnabledRules = useWatch({
    control: form.control,
    name: "enabled_rules"
  });
  const addRule = () => {
    const firstDisabledRule = Object.keys(watchedEnabledRules).find(
      (key) => !watchedEnabledRules[key]
    );
    if (firstDisabledRule) {
      enableRule(firstDisabledRule);
    }
  };
  const visibleRuleTypes = referenceTypeOptions.filter((option) => watchedEnabledRules[option.value]).sort((a, b) => {
    const orderArray = Array.from(displayOrder);
    return orderArray.indexOf(a.value) - orderArray.indexOf(b.value);
  });
  const getAvailableRuleTypes = (type) => {
    return referenceTypeOptions.filter((option) => {
      return !visibleRuleTypes.some(
        (visibleOption) => visibleOption.value === option.value
      ) || option.value === type;
    });
  };
  const showAddButton = Object.values(watchedEnabledRules).some(
    (value) => !value
  );
  return /* @__PURE__ */ jsx(RouteDrawer.Form, { form, children: /* @__PURE__ */ jsxs(
    KeyboundForm,
    {
      className: "flex flex-1 flex-col overflow-hidden",
      onSubmit: handleSubmit,
      children: [
        /* @__PURE__ */ jsxs(RouteDrawer.Body, { className: "flex flex-1 flex-col gap-y-6 overflow-auto", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-y-4", children: [
            /* @__PURE__ */ jsx(
              Form.Field,
              {
                control: form.control,
                name: "name",
                render: ({ field }) => {
                  return /* @__PURE__ */ jsxs(Form.Item, { children: [
                    /* @__PURE__ */ jsx(Form.Label, { children: t("fields.name") }),
                    /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(Input, { ...field }) }),
                    /* @__PURE__ */ jsx(Form.ErrorMessage, {})
                  ] });
                }
              }
            ),
            /* @__PURE__ */ jsx(
              Form.Field,
              {
                control: form.control,
                name: "code",
                render: ({ field }) => {
                  return /* @__PURE__ */ jsxs(Form.Item, { children: [
                    /* @__PURE__ */ jsx(Form.Label, { children: t("taxRegions.fields.taxCode") }),
                    /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(Input, { ...field }) }),
                    /* @__PURE__ */ jsx(Form.ErrorMessage, {})
                  ] });
                }
              }
            ),
            /* @__PURE__ */ jsx(
              Form.Field,
              {
                control: form.control,
                name: "rate",
                render: ({ field: { value, onChange, ...field } }) => {
                  return /* @__PURE__ */ jsxs(Form.Item, { children: [
                    /* @__PURE__ */ jsx(Form.Label, { children: t("taxRegions.fields.taxRate") }),
                    /* @__PURE__ */ jsx(Form.Control, { children: /* @__PURE__ */ jsx(
                      PercentageInput,
                      {
                        ...field,
                        value: value?.value,
                        onValueChange: (value2, _name, values) => onChange({
                          value: value2,
                          float: values?.float
                        })
                      }
                    ) }),
                    /* @__PURE__ */ jsx(Form.ErrorMessage, {})
                  ] });
                }
              }
            )
          ] }),
          isCombinable && /* @__PURE__ */ jsx(
            SwitchBox,
            {
              control: form.control,
              name: "is_combinable",
              label: t("taxRegions.fields.isCombinable.label"),
              description: t("taxRegions.fields.isCombinable.hint")
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-y-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-x-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-x-1", children: [
                  /* @__PURE__ */ jsx(Label, { id: "tax_region_rules_label", htmlFor: "tax_region_rules", children: t("taxRegions.fields.targets.label") }),
                  /* @__PURE__ */ jsxs(
                    Text,
                    {
                      size: "small",
                      leading: "compact",
                      className: "text-ui-fg-muted",
                      children: [
                        "(",
                        t("fields.optional"),
                        ")"
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx(Hint, { id: "tax_region_rules_description", className: "text-pretty", children: t("taxRegions.fields.targets.hint") })
              ] }),
              showAddButton && /* @__PURE__ */ jsx(
                Button,
                {
                  onClick: addRule,
                  type: "button",
                  size: "small",
                  variant: "transparent",
                  className: "text-ui-fg-interactive hover:text-ui-fg-interactive-hover flex-shrink-0",
                  children: t("taxRegions.fields.targets.action")
                }
              )
            ] }),
            /* @__PURE__ */ jsx(
              "div",
              {
                id: "tax_region_rules",
                "aria-labelledby": "tax_region_rules_label",
                "aria-describedby": "tax_region_rules_description",
                role: "application",
                className: "flex flex-col gap-y-3",
                children: visibleRuleTypes.map((ruleType, index) => {
                  const type = ruleType.value;
                  const label = ruleType.label;
                  const isLast = index === visibleRuleTypes.length - 1;
                  const searchPlaceholder = searchPlaceholders[type];
                  const options = getAvailableRuleTypes(type);
                  const modalId = getStackedModalId(type);
                  const { fields, remove } = getControls(type);
                  const handler = getFieldHandler(type);
                  const handleChangeType = (value) => {
                    disableRule(type);
                    enableRule(value);
                  };
                  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
                    Form.Field,
                    {
                      control: form.control,
                      name: ruleType.value,
                      render: ({
                        field: { value: _value, onChange: _onChange, ...field }
                      }) => {
                        return /* @__PURE__ */ jsxs(Form.Item, { className: "space-y-0", children: [
                          /* @__PURE__ */ jsx(Form.Label, { className: "sr-only", children: label }),
                          /* @__PURE__ */ jsxs(
                            "div",
                            {
                              className: clx(
                                "bg-ui-bg-component shadow-elevation-card-rest transition-fg grid gap-1.5 rounded-xl py-1.5",
                                "aria-[invalid='true']:shadow-borders-error"
                              ),
                              role: "application",
                              ...field,
                              children: [
                                /* @__PURE__ */ jsxs("div", { className: "text-ui-fg-subtle grid gap-1.5 px-1.5 md:grid-cols-2", children: [
                                  isLast ? /* @__PURE__ */ jsxs(
                                    Select,
                                    {
                                      value: type,
                                      onValueChange: handleChangeType,
                                      children: [
                                        /* @__PURE__ */ jsx(Select.Trigger, { className: "bg-ui-bg-field-component hover:bg-ui-bg-field-component-hover", children: /* @__PURE__ */ jsx(Select.Value, {}) }),
                                        /* @__PURE__ */ jsx(Select.Content, { children: options.map((option) => {
                                          return /* @__PURE__ */ jsx(
                                            Select.Item,
                                            {
                                              value: option.value,
                                              children: option.label
                                            },
                                            option.value
                                          );
                                        }) })
                                      ]
                                    }
                                  ) : /* @__PURE__ */ jsx("div", { className: "bg-ui-bg-field shadow-borders-base txt-compact-small rounded-md px-2 py-1.5", children: label }),
                                  /* @__PURE__ */ jsx("div", { className: "bg-ui-bg-field shadow-borders-base txt-compact-small rounded-md px-2 py-1.5", children: t("taxRegions.fields.targets.operators.in") })
                                ] }),
                                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 px-1.5", children: [
                                  /* @__PURE__ */ jsxs(StackedDrawer, { id: modalId, children: [
                                    /* @__PURE__ */ jsx(StackedDrawer.Trigger, { asChild: true, children: /* @__PURE__ */ jsxs(
                                      "button",
                                      {
                                        type: "button",
                                        className: "bg-ui-bg-field-component hover:bg-ui-bg-field-component-hover shadow-borders-base txt-compact-small text-ui-fg-muted transition-fg focus-visible:shadow-borders-interactive-with-active flex flex-1 items-center gap-x-2 rounded-md px-2 py-1.5 outline-none",
                                        children: [
                                          /* @__PURE__ */ jsx(MagnifyingGlass, {}),
                                          searchPlaceholder
                                        ]
                                      }
                                    ) }),
                                    /* @__PURE__ */ jsx(StackedDrawer.Trigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "secondary", children: t("actions.browse") }) }),
                                    /* @__PURE__ */ jsxs(StackedDrawer.Content, { children: [
                                      /* @__PURE__ */ jsxs(StackedDrawer.Header, { children: [
                                        /* @__PURE__ */ jsx(StackedDrawer.Title, { asChild: true, children: /* @__PURE__ */ jsx(Heading, { children: t(
                                          "taxRegions.fields.targets.modal.header"
                                        ) }) }),
                                        /* @__PURE__ */ jsx(StackedDrawer.Description, { className: "sr-only", children: t("taxRegions.fields.targets.hint") })
                                      ] }),
                                      /* @__PURE__ */ jsx(
                                        TargetForm,
                                        {
                                          type: "drawer",
                                          referenceType: type,
                                          state: fields,
                                          setState: handler
                                        }
                                      )
                                    ] })
                                  ] }),
                                  /* @__PURE__ */ jsx(
                                    Button,
                                    {
                                      variant: "secondary",
                                      onClick: () => disableRule(type),
                                      type: "button",
                                      children: t("actions.delete")
                                    }
                                  )
                                ] }),
                                fields.length > 0 ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-y-1.5", children: [
                                  /* @__PURE__ */ jsx(Divider, { variant: "dashed" }),
                                  /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-y-1.5 px-1.5", children: fields.map((field2, index2) => {
                                    return /* @__PURE__ */ jsx(
                                      TargetItem,
                                      {
                                        index: index2,
                                        label: field2.label,
                                        onRemove: remove
                                      },
                                      field2.id
                                    );
                                  }) })
                                ] }) : null
                              ]
                            }
                          ),
                          /* @__PURE__ */ jsx(Form.ErrorMessage, { className: "mt-2" })
                        ] });
                      }
                    }
                  ) }, type);
                })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsx(RouteDrawer.Footer, { className: "shrink-0", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-x-2", children: [
          /* @__PURE__ */ jsx(RouteDrawer.Close, { asChild: true, children: /* @__PURE__ */ jsx(Button, { size: "small", variant: "secondary", children: t("actions.cancel") }) }),
          /* @__PURE__ */ jsx(Button, { size: "small", type: "submit", isLoading: isPending, children: t("actions.save") })
        ] }) })
      ]
    }
  ) });
};

// src/routes/tax-regions/tax-region-tax-override-edit/tax-region-tax-override-edit.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var TaxRegionTaxOverrideEdit = () => {
  const { t } = useTranslation2();
  const { tax_rate_id } = useParams();
  const { tax_rate, isPending, isError, error } = useTaxRate(tax_rate_id);
  const { initialValues, isPending: isInitializing } = useDefaultRulesValues(tax_rate);
  const ready = !isPending && !!tax_rate && !isInitializing && !!initialValues;
  if (isError) {
    throw error;
  }
  return /* @__PURE__ */ jsxs2(RouteDrawer, { children: [
    /* @__PURE__ */ jsxs2(RouteDrawer.Header, { children: [
      /* @__PURE__ */ jsx2(RouteDrawer.Title, { asChild: true, children: /* @__PURE__ */ jsx2(Heading2, { children: t("taxRegions.taxOverrides.edit.header") }) }),
      /* @__PURE__ */ jsx2(RouteDrawer.Description, { className: "sr-only", children: t("taxRegions.taxOverrides.edit.hint") })
    ] }),
    ready && /* @__PURE__ */ jsx2(
      TaxRegionTaxOverrideEditForm,
      {
        taxRate: tax_rate,
        isCombinable: true,
        initialValues
      }
    )
  ] });
};
var useDefaultRulesValues = (taxRate) => {
  const rules = taxRate?.rules || [];
  const idsByReferenceType = {
    ["product" /* PRODUCT */]: [],
    [TaxRateRuleReferenceType.PRODUCT_COLLECTION]: [],
    [TaxRateRuleReferenceType.PRODUCT_TAG]: [],
    ["product_type" /* PRODUCT_TYPE */]: [],
    [TaxRateRuleReferenceType.CUSTOMER_GROUP]: []
  };
  rules.forEach((rule) => {
    const reference = rule.reference;
    idsByReferenceType[reference]?.push(rule.reference_id);
  });
  const queries = [
    {
      ids: idsByReferenceType["product" /* PRODUCT */],
      hook: useProducts,
      key: "product" /* PRODUCT */,
      getResult: (result) => result.products.map((product) => ({
        label: product.title,
        value: product.id
      }))
    },
    {
      ids: idsByReferenceType[TaxRateRuleReferenceType.PRODUCT_COLLECTION],
      hook: useCollections,
      key: TaxRateRuleReferenceType.PRODUCT_COLLECTION,
      getResult: (result) => result.collections.map((collection) => ({
        label: collection.title,
        value: collection.id
      }))
    },
    {
      ids: idsByReferenceType[TaxRateRuleReferenceType.PRODUCT_TAG],
      hook: useProductTags,
      key: TaxRateRuleReferenceType.PRODUCT_TAG,
      getResult: (result) => result.tags.map((tag) => ({
        label: tag.value,
        value: tag.id
      }))
    },
    {
      ids: idsByReferenceType["product_type" /* PRODUCT_TYPE */],
      hook: useProductTypes,
      key: "product_type" /* PRODUCT_TYPE */,
      getResult: (result) => result.product_types.map((productType) => ({
        label: productType.value,
        value: productType.id
      }))
    },
    {
      ids: idsByReferenceType[TaxRateRuleReferenceType.CUSTOMER_GROUP],
      hook: useCustomerGroups,
      key: TaxRateRuleReferenceType.CUSTOMER_GROUP,
      getResult: (result) => result.customer_groups.map((customerGroup) => ({
        label: customerGroup.name,
        value: customerGroup.id
      }))
    }
  ];
  const queryResults = queries.map(({ ids, hook }) => {
    const enabled = ids.length > 0;
    return {
      result: hook({ id: ids, limit: ids.length }, { enabled }),
      enabled
    };
  });
  if (!taxRate) {
    return { isPending: true };
  }
  const isPending = queryResults.some(
    ({ result, enabled }) => enabled && result.isPending
  );
  if (isPending) {
    return { isPending };
  }
  queryResults.forEach(({ result, enabled }) => {
    if (enabled && result.isError) {
      throw result.error;
    }
  });
  const initialRulesValues = queries.reduce(
    (acc, { key, getResult }, index) => ({
      ...acc,
      [key]: queryResults[index].enabled ? getResult(queryResults[index].result) : []
    }),
    {}
  );
  return { initialValues: initialRulesValues, isPending: false };
};
export {
  TaxRegionTaxOverrideEdit as Component
};
