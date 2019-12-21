import { firebaseAuth, firebaseDb } from '../boot/firebase'

const state = {
    userInfo: {}
}
const mutations = {
    setUserDetail(state, payload) {
        state.userInfo = payload
    }
}
const actions = {
    register({}, payload) {
        firebaseAuth.createUserWithEmailAndPassword(payload.email, payload.password)
        .then(res => {
            console.log(res, 'register successfull')
            let userId = firebaseAuth.currentUser.uid
            console.log(userId, 'userId')
            firebaseDb.ref('users/' + userId).set(
                {
                    name: payload.name,
                    email: payload.email,
                    online: true
                }
            )
        })
            .catch(error => {
                console.log(error)
        })
    },
    login({commit}, payload) {
        firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password)
        .then(res => {
            console.log(res, 'login successfull')
        })
        .catch(error => {
            console.log(error)
        })
    },
    handleAuthStageChanged({commit, dispatch, state}) {
        firebaseAuth.onAuthStateChanged(user => {
            if(user) {
                console.log('user loged in')
                let userId = firebaseAuth.currentUser.uid
                firebaseDb.ref('users/' + userId).once('value', snapshot => {
                    console.log(snapshot, 'snapshot')
                    let userDetail = snapshot.val()
                    console.log(userDetail, 'userDetail')
                commit('setUserDetail', {
                    name: userDetail.name,
                    email: userDetail.email,
                    online: userDetail.online,
                })
                this.$router.push('/')
             })

            } else {
                console.log('user loged out')
                commit('setUserDetail', {})
                this.$router.replace('/Auth')
                dispatch('onUpdateUser', {
                    userId: 
                })
            }
        })
    },
    signOut({}) {
        firebaseAuth.signOut().then(res => {
            console.log(res,'sign out successfull')
        }).catch(error => {
            console.log(error, 'error logout')
        })
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