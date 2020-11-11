
import { constant as c} from './const-get.constant';
import axios from 'axios';
export function getData(data){
    console.log('===========>this is action')
    return (dispatch) =>{
        console.log('===========>this is action2')
        dispatch ({
            type: c.LOADING
        })
        let data = {
            method: 'get',
            url: `http://localhost:3000/users`, 
          }
       return axios(data)
            .then((res) => {
                    var obj = res.data;
                    var result = Object.keys(obj).map((key) => [obj[key]]);
                    console.log("hasil=============>"+result);
                    dispatch ({
                        type: c.SUCCESS,
                        payload: result
                    });
                }
            )
            .catch(error => {
                return dispatch({
                    type   : c.ERROR,
                    payload: error
                });
            });
        }
}


// export const getPeople = () => {
//     //IN order to use await your callback must be asynchronous using async keyword.
//     return async dispatch => {
//         //Then perform your asynchronous operations.
//         try {
//             //Have it first fetch data from our starwars url.
//             const starWarsPromise = await fetch('http://localhost:3000/users');
//             dispatch(fetchData(true));
//             //Then use the json method to get json data from api/
//             const people = await starWarsPromise.json();
//             console.log('people-----------', people);
//             //Now when the data is retrieved dispatch an action altering redux state.
//             dispatch(fetchDataFulfilled(people.results))
//           } catch(error) {
//             console.log('Getting People Error---------', error);
//             dispatch(fetchDataRejected(error))
//           }
//     }
// }