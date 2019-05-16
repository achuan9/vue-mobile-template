import Cookies from 'js-cookie'

const Key = 'park-mobile-user'

export function getUserInfo() {
  const cookie = Cookies.get(Key) || '{}'
  return JSON.parse(cookie)
}

export function setUserInfo(token) {
  return Cookies.set(Key, token)
}

export function removeUserInfo() {
  return Cookies.remove(Key)
}
