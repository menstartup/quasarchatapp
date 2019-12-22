import { firebaseAuth, firebaseDb } from '../boot/firebase'
import Vue from 'vue'

let messageRef 

const state = {
    userInfo: {},
    users: {},
    allMessage: {},
    otherUser: {}
}
const mutations = {
    setUserDetail(state, payload) {
        state.userInfo = payload
    },
    setUsers(state, payload) {
        Vue.set(state.users, payload.userId, payload.allUsers)
    },
    updateUsers(state, payload) {
        Object.assign(state.users[payload.userId], payload.userDetail)
    },
    setMessage(state, payload) {
       Vue.set(state.allMessage, payload.messageId, payload.message)
    },
    deleteMessage(state) {
        state.allMessage = {}
    },
    setOtherUser(state, payload) {
        state.otherUser = payload
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
                let keyId = ''
                console.log(userId, 'userid')
                firebaseDb.ref('users/' + userId).once('value', snapshot => {
                    console.log(snapshot, 'snapshot')
                    keyId = snapshot.key
                    let userDetail = snapshot.val()
                    console.log(userDetail, 'userDetail')
                commit('setUserDetail', {
                    name: userDetail.name,
                    email: userDetail.email,
                    online: userDetail.online,
                    userId: keyId
                })
                dispatch('onUpdateUser', {
                    userId: state.userInfo.userId,
                    update: {
                        online: true
                    }
                })
                dispatch('firebaseGetUsers')
                this.$router.push('/').catch(err => {})
             })

            } else {
                console.log('user loged out')
                dispatch('onUpdateUser', {
                    userId: state.userInfo.userId,
                    update: {
                        online: false
                    }
                })
                commit('setUserDetail', {})
                this.$router.replace('/Auth').catch(err => {})
            }
        })
    },
    onUpdateUser({state}, payload) {
        console.log(state.userInfo.userId, 'update user online')
        if(payload.userId) {
            firebaseDb.ref('users/' + payload.userId).update(payload.update)
        }
    },  
    signOut({}) {
        firebaseAuth.signOut().then(res => {
            console.log(res,'sign out successfull')
        }).catch(error => {
            console.log(error, 'error logout')
        })
    },
    firebaseGetUsers({commit}) {
        firebaseDb.ref('users').on('child_added', snapshot => {
            console.log(snapshot, '12121212')
            let userId = snapshot.key
            let allUsers = snapshot.val()
            commit('setUsers', {
                userId,
                allUsers
            })
        }),
        firebaseDb.ref('users').on('child_changed', snapshot => {
            let userId = snapshot.key
            let userDetail = snapshot.val()
            commit('updateUsers', {
                userId,
                userDetail
            })
        })
    },
    getMessgaeFromFirebase({commit, state}, payload) {
        console.log('hahahahahahaha')
        let otherUserId = payload
        console.log(otherUserId, 'other user id store')
        messageRef = firebaseDb.ref('chat/' + state.userInfo.userId + '/' + otherUserId)
        messageRef.on('child_added', snapshot => {
            console.log(snapshot.val(), 'chat messageeeeeeeee')
            let messageId = snapshot.key
            let message = snapshot.val()
            commit('setMessage', {
                messageId,
                message
            })
        })
    },
    getClearMessageFromFirebase({commit}) {
        if(messageRef) {
            messageRef.off
            commit('deleteMessage')
        }
        
    },
    getOtherUser({commit, state}, payload) {
        let otherUser = {}
        Object.keys(state.users).forEach(key => {
            if(key === payload) {
                otherUser[key] = state.users[payload]
                commit('setOtherUser', otherUser)
            }
        })
    }
}
const getters = {
    getUsers(state) {
        let userFiltered = {}
         Object.keys(state.users).forEach(key => {
            // console.log(key, 'keyyyyyyyyyyyyy')
           if(key !== state.userInfo.userId) {
               userFiltered[key] = state.users[key]
           }
        })
        return userFiltered
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}