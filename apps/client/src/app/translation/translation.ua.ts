import { BlogModeUnion } from '../models/models'

const blog: Record<BlogModeUnion, string> = {
  add: 'Додавання',
  edit: 'Редагування'
}

export const translation = {
  auth: {
    login: 'Увійти',
    email: 'Email',
    pass: 'Пароль'
  },
  update: {
    btn: 'Оновити',
    header: 'В нас для тебе є чудова новина!',
    message: 'Є нова версія додатка',
    success: 'Успіх',
    successDetail: 'Зараз додаток перезавантажеться!<br/>А ти молодець 🤙',
    fail: 'Зрада',
    failDetail: 'Нажаль 😕<br />Зараз додаток перезавантажеться і це допоможе!',
    warn: 'Ти що?',
    warnDetail: 'Ми не можемо гарантувати тобі стабільність<br />якщо ти не будешь оновлюватись!'
  },
  nav: {
    board: 'Доска',
    blog
  },
  blogs: 'Статті',
  blogPageReport: 'На показі з {first} по {last}',
  blog: {
    add: 'Додати'
  }
}
