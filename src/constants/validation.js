export const VALIDATION_LOGIN = {
  username: {
    name: "username",
    label: "LABEL_USERNAME",
    rule: {
      required: true,
    },
    value: "",
  },
  password: {
    name: "password",
    label: "LABEL_PASSWORD",
    rule: {
      required: true,
      pattern: new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
    },
    value: "",
  },
}
