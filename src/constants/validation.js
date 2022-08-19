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
      pattern: new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/),
    },
    value: "",
  },
}

export const VALIDATION_SHARE_MOVIE = {
  movieUrl: {
    name: "movieUrl",
    label: "LABEL_MOVIE_URL",
    rule: {
      required: true,
      pattern: new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'),
    },
    value: "",
  },
}
