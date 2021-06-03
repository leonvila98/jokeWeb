const axios = require('axios').default;
const URL_NORMAL = 'https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Pun,Spooky,Christmas?blacklistFlags=nsfw,religious,political,racist,sexist,explicit'
const URL_NSFW = 'https://v2.jokeapi.dev/joke/Any?type=twopart'

export function getNormalJoke(parts){
    return function(dispatch) {
        if(parts==='two'){
            return axios.get(URL_NORMAL + '&type=twopart')
                .then(json => {
                    dispatch({ type: "GET_NORMAL_JOKE", payload: json });
                })
                .catch((err)=>{console.log(err)});
        } else if(parts==='one'){
            return axios.get(URL_NORMAL + '&type=single')
                .then(json => {
                    dispatch({ type: "GET_NORMAL_JOKE", payload: json });
                })
                .catch((err)=>{console.log(err)});
        } else {
            return axios.get(URL_NORMAL)
                .then(json => {
                    dispatch({ type: "GET_NORMAL_JOKE", payload: json });
                })
                .catch((err)=>{console.log(err)});
        }
    };
}
export function getNsfwJoke(){
    return function(dispatch) {
        return axios.get(URL_NSFW)
            .then(json => {
                dispatch({ type: "GET_NSFW_JOKE", payload: json });
            })
            .catch((err)=>{console.log(err)});
    };
}