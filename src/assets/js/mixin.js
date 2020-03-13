import { mapGetters } from 'vuex'
export const isIphoneX = {
  computed: {
    ...mapGetters([
      'isIphoneX',
      'isLH'
    ])
  }
}
