import React, { useEffect } from 'react'

export default props =>{



        function tempoAleatorio(){
          const min = 1000;
          const max = 5000;
          return Math.floor(Math.random() * (max - min) + min)
        }
    
    
        /*
        // callback
        function espere(msg, tempo, callback){
          setTimeout(()=>{
            console.log(msg + " " + tempo);
            if(callback)
              callback();
          },tempo)
        }
        espere('mensagem 1', tempoAleatorio(), function(){
          espere('mensagem 2', tempoAleatorio(), function(){
            espere('mensagem 3', tempoAleatorio())
          })
        })*/
    
        
        // Promisse
        function espere(msg, tempo){
          return new Promise((resolve, reject) =>{
    
            if(msg === 'fim'){
              reject(false)
            }
    
            setTimeout(()=>{
              resolve(msg);
              console.log(`Mensagem resolvida é ${msg}`);
            },tempo)
          })
        }
    
        espere('frase 1', tempoAleatorio())
          .then(()=>{
            return espere('frase 2', tempoAleatorio())
          })
          .then(()=>{
            return espere('frase 3', tempoAleatorio())
          })
          .then(()=>{
            return espere('frase 4', tempoAleatorio())
          })
          .catch(e=>{
            console.log(e)
          })
          
    
          // async function espere(msg, tempo){
          //   await setTimeout(()=>{
          //     console.log(msg)
          //   },tempo)
          // }
    
          // espere('frase 1', tempoAleatorio())
    


    return null
    
}

