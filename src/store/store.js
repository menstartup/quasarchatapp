import { firebaseAuth, firebaseDb } from '../boot/firebase'

const state = {

}
const mutations = {

}
const actions = {
    register({}, payload) {
        firebaseAuth.createUserWithEmailAndPassword(payload.email, payload.password)
        .then(res => {
            console.log(res, 'register successfully')
        })
            .catch(error => {
                console.log(error)
        });
    }
}
const getters = {

}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}