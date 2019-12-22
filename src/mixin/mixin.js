export default {
    computed: {
        onChatUser() {
            return this.users[this.$route.params.otheruserid].name
        }
    }
}