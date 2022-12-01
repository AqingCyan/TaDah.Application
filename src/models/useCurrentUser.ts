import { atom } from 'jotai'

export const currentUserAtom = atom<USER.UserInfo | null>(null)
