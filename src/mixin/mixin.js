export default {
    computed: {
        onChatUser() {
            return this.$store.users[this.$route.params.otheruserid].name
        }
    }
}