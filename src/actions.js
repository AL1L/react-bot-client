
export const setChannelDraft = (channel, text) => ({
  type: 'SET_CHANNEL_DRAFT',
  id: channel.id,
  text
})

export const toggleMemberList = (channel, text) => ({
  type: 'TOGGLE_MEMBER_LIST'
})