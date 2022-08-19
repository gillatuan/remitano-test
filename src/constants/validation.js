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
      pattern: new RegExp(
        /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/
      ),
    },
    value: "",
  },
}
