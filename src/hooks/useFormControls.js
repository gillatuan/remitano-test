import { isArray, isEmpty } from "lodash"
import { useCallback, useState } from "react"

import { useTranslation } from "react-i18next"

export const useFormControls = (initialFormValues, validateFields) => {
  const { t } = useTranslation()

  // We'll update "values" as the form updates
  const [values, setValues] = useState(initialFormValues || {})

  // set state for validated fields
  const [validatedFields, setValidatedFields] = useState(validateFields)

  // "errors" is used to check the form for errors
  const [errors, setErrors] = useState({})

  const [isValid, setIsValid] = useState(false)
  /* useEffect(() => {
    formIsValid()
  }, []) */

  const checkValidation = (getKey, getValue, fields, isMulti, key, parentKey) => {
    if (!fields[getKey]) {
      return
    }

    if (isMulti && parentKey && key) {
      errors[parentKey][key] = {}
      errors[parentKey][key][getKey] = ""
      if (fields[getKey].rule.required) {
        if (!getValue) {
          errors[parentKey][key][getKey] = `${t("ERROR_REQUIRED", {
            fieldLabel: t(fields[getKey].label),
          })}`
        }
      }
      if (fields[getKey].rule.email) {
        if (getValue) {
          const re = /\S+@\S+\.\S+/
          const isEmail = re.test(getValue)

          if (!isEmail) {
            errors[parentKey][key][getKey] = `${t("ERROR_MATCH_ITEM", {
              fieldLabel: t(fields[getKey].label),
            })}`
          }
        }
      }
      if (fields[getKey].rule.minLength) {
        if (getValue.length < fields[getKey].rule.minLength) {
          errors[parentKey][key][getKey] = `${t("ERROR_MINLENGTH", {
            fieldLabel: t(fields[getKey].label),
            fieldValue: fields[getKey].rule.minLength,
          })}`
        }
      }
      if (fields[getKey].rule.maxLength) {
        if (getValue.length > fields[getKey].rule.maxLength) {
          errors[parentKey][key][getKey] = `${t("ERROR_MAXLENGTH", {
            fieldLabel: t(fields[getKey].label),
            fieldValue: fields[getKey].rule.maxLength,
          })}`
        }
      }
      if (fields[getKey].name === "phone") {
        if (getValue) {
          // eslint-disable-next-line prefer-regex-literals
          const pattern = new RegExp(/^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4,5}$/)
          const isPhone = pattern.test(getValue)

          if (!isPhone) {
            errors[parentKey][key][getKey] = `${t("ERROR_MATCH_ITEM", {
              fieldLabel: t(fields[getKey].label),
            })}`
          }
        }
      }

      // eslint-disable-next-line consistent-return
      return errors[parentKey][key]
    }
    errors[getKey] = null
    if (fields[getKey].rule.required) {
      if (!getValue) {
        errors[getKey] = `${t("ERROR_REQUIRED", {
          fieldLabel: t(fields[getKey].label),
        })}`

        // eslint-disable-next-line consistent-return
        return errors
      }
    }
    if (fields[getKey].rule.email) {
      if (getValue) {
        const re = /\S+@\S+\.\S+/
        const isEmail = re.test(getValue)

        if (!isEmail) {
          errors[getKey] = `${t("ERROR_MATCH_ITEM", {
            fieldLabel: t(fields[getKey].label),
          })}`

          // eslint-disable-next-line consistent-return
          return errors
        }
      }
    }
    if (fields[getKey].rule.minLength) {
      if (getValue.length < fields[getKey].rule.minLength) {
        errors[getKey] = `${t("ERROR_MINLENGTH", {
          fieldLabel: t(fields[getKey].label),
          fieldValue: fields[getKey].rule.minLength,
        })}`

        // eslint-disable-next-line consistent-return
        return errors
      }
    }
    if (fields[getKey].rule.maxLength) {
      if (getValue.length > fields[getKey].rule.maxLength) {
        errors[getKey] = `${t("ERROR_MINLENGTH", {
          fieldLabel: t(fields[getKey].label),
          fieldValue: fields[getKey].rule.maxLength,
        })}`

        // eslint-disable-next-line consistent-return
        return errors
      }
    }
    /* if (fields[getKey].name === 'phone_number') {
        if (getValue) {
          const pattern = new RegExp(/^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4,5}$/)
          const isPhone = pattern.test(getValue)
  
          if (!isPhone) {
            errors[getKey] = `${t('ERROR_MATCH_ITEM', { fieldLabel: t(fields[getKey].label) })}`
          }
        }
      } */

    // eslint-disable-next-line consistent-return
    return errors
  }
  const setValidateField = (getKey, getValue) => {
    if (!isArray(getValue)) {
      return checkValidation(getKey, getValue, validatedFields)
    }

    errors[`${getKey}`] = []
    validatedFields[getKey]?.value.forEach((item, k) => {
      errors[`${getKey}`][k] = null
      let arrError = {}
      const getListChildKeys = Object.keys(item)
      getListChildKeys.forEach((child) => {
        const getFieldValue = (getValue && getValue[k] && getValue[k][child]) || ""
        const getError = checkValidation(child, getFieldValue, item, true, k, getKey)
        if (!isEmpty(getError)) {
          arrError = {
            ...arrError,
            ...getError,
          }
        }
      })

      if (!isEmpty(arrError)) {
        errors[`${getKey}`][k] = arrError
      } else {
        errors[`${getKey}`][k] = null
      }
    })

    return errors
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const validate = useCallback((fieldValues = values) => {
    // this function will check if the form values are valid

    const getKey = Object.keys(fieldValues)
    const getValue = Object.values(fieldValues)
    let temp
    getKey.forEach((key, k) => {
      temp = setValidateField(key, getValue[k])
      setErrors((v) => {
        return {
          ...v,
          ...temp,
        }
      })
    })

    return temp
  })

  const handleInputValue = useCallback(
    (fieldName, fieldValue) => {
      // this function will be triggered by the text field's onBlur and onChange events
      setValues((prev) => {
        return {
          ...prev,
          [fieldName]: fieldValue,
        }
      })

      validate({ [fieldName]: fieldValue })
    },
    [validate]
  )

  const handleListValue = useCallback(
    (listFields) => {
      setValues({
        ...values,
        ...listFields,
      })

      validate({ ...listFields })
    },
    [validate, values]
  )

  const handleAllValue = (listFields) => {
    setValues((prev) => {
      return {
        ...prev,
        ...listFields,
      }
    })
  }

  const handleReset = (data) => {
    setValues(data)
    setErrors({})
  }
  const handleResetValidationFields = (fields) => {
    setValidatedFields(fields)
    setErrors({})
  }

  const handleValidateForm = (data = values) => {
    const arrKeys = Object.keys(data)

    let getErrors = {}
    arrKeys.forEach((key) => {
      if (validatedFields[key]) {
        const error = setValidateField(key, data[key])
        if (!isEmpty(error[key])) {
          getErrors = {
            ...getErrors,
            ...error,
          }
        }
      }
    })
    setErrors(getErrors)

    return getErrors
  }

  const formIsValid = () => {
    // this function will check if the form values and return a boolean value
    let valid = true
    const getErrors = validate()

    if (getErrors) {
      const arrKeys = Object.keys(getErrors)
      arrKeys.forEach((key) => {
        if (errors[key] && !isArray(errors[key])) {
          valid = false

          return
        }
        if (isArray(errors[key])) {
          errors[key].forEach((item) => {
            Object.keys(errors[key][0]).forEach((fieldName) => {
              if (item[fieldName]) {
                valid = false
              }
            })
          })
        }
      })
    }
    setIsValid(valid)

    return valid
  }

  async function handleFormSubmit() {
    // this function will be triggered by the submit event
    /* const isValid =
      Object.values(errors).every((x) => x === '') && formIsValid()
    if (isValid) {
      return form(values, handleSuccess, handleError)
    }

    return errors */
  }

  return {
    errors,
    isValid,
    values,
    formIsValid,
    handleAllValue,
    handleInputValue,
    handleFormSubmit,
    handleListValue,
    handleReset,
    handleResetValidationFields,
    handleValidateForm,
  }
}
