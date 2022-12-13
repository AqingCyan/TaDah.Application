declare namespace TALLY {
  type MONTH_DATA = {
    id: number
    month: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
    year: number
    target: number
    income: number
    currentSalary: number
    residueTarget: number
  }

  type TALLY_ITEM = {
    id: number
    count: number
    amountType: number
    description: string
    createTime: string
    updateTime: string
    delete: boolean
    amountTag: {
      tagId: number
      emojiName: string
      tagName: string
      updateTime: string
    }
  }

  type TAG = {
    emojiName: string
    tagId: number
    tagName: string
    updateTime: string
  }
}
