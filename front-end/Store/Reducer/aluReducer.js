// Store/Reducer/favoriteReducer.js
import React, { useState } from 'react'
import PostBookToList from '../../Request/PostBookToList'
import GetListAlu from '../../Request/GetListAlu'
import DeleteBookFromList from '../../Request/DeleteBookFromList'



const initialState = {aluLivres: []} // il faudrait ici que j'initialise la liste à partir d'un get.

// window.localStorage
// useContext

export default function toggleAlu(state = initialState, action) {
    let nextState
    switch (action.type) {
      case 'TOGGLE_ALU':
        console.log('id du livre à ajouter : ' + action.value)
        console.log('liste : ' + state.aluLivres)
        const aluLivreIndex = state.aluLivres.findIndex((item) => item === action.value)
        console.log('Index2 : ' + aluLivreIndex)
        if (aluLivreIndex !== -1){
          nextState = {
            ...state,
            aluLivres: state.aluLivres.filter( (item, index) => index !== aluLivreIndex)
          }
          console.log('index different de -1')
          DeleteBookFromList(action.value, "Deja%lu", token=action.TOKEN)
        }
        else {
          console.log('je dois ajouter ca à la liste ' + action.value)
          nextState = {
            ...state,
            aluLivres: [...state.aluLivres, action.value]
          }
          console.log("token : " + action.TOKEN)
          PostBookToList(action.value, "Deja%lu", token=action.TOKEN)
          console.log('index = -1')
        }
        console.log('liste : ' + state.aluLivres)
        console.log('')
        return nextState || state
    default:
      return state
    }
  }