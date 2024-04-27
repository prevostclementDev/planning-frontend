import { defineStore } from 'pinia'
export const useRouting = defineStore('routing', () => {

  const url = {

    dashboard : '/',
    planningsList : '/plannings',
    connexion : '/se-connecter',
    codeVerification : '/verification-code',
    support : '/support',
    messagerie : '/messagerie',
    dataList : '/listes',
    documentation : '/documentation',
    createData : '/creer-des-donnees',
    planningSingle : (id) => `/planning/${id}`,
    listeSingle : (slug) => `/liste/${slug}`,
    params : '/parametre',

  }

  return { url }
})