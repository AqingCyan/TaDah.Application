import React, { useMemo, useState } from 'react'
import Emoji from '@/components/Emoji'
import emojiData from '@emoji-mart/data'
import addIcon from '@/assets/addIcon.svg'
import s from './index.module.less'

enum AmountType {
  paid = 0,
  earning = 1,
}

const MAX_COUNT = 100

const mockTagList = [
  { emoji: '+1', name: '工作开销' },
  { emoji: 'grinning', name: '开心的事情' },
  { emoji: 'auto_rickshaw', name: '打工花费' },
  { emoji: 'canoe', name: '划船' },
]

const AddRecord = () => {
  const [amountType, setAmountType] = useState<AmountType>(1)
  const [amountCountFen, setAmountCountFen] = useState<number>(0)
  const [descContent, setDescCount] = useState<string>('')
  const [selectTagName, setSelectTagName] = useState<string>('工作开销')
  const [hideAddText, setHideAddText] = useState<boolean>(false)
  const [showTagPicker, setShowTagPicker] = useState<boolean>(false)
  const [selectEmoji, setSelectEmoji] = useState<string>()

  const overBiggestAmount = useMemo(() => amountCountFen >= 2147483647300, [amountCountFen])
  const overMaxCount = useMemo(() => descContent.length >= 100, [descContent])

  const handleAmountCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if (value === '') {
      setAmountCountFen(0)
      return
    }
    if (/^\d+(\.\d{1,2})?$/.test(value) && value.length <= 12) {
      setAmountCountFen(parseFloat(value) * 100)
    }
  }

  return (
    <div className={s.pageContainer}>
      <section className={overBiggestAmount ? s.inputMoneyError : s.inputMoney}>
        <span className={s.icon}>¥</span>
        <input
          type="number"
          placeholder="请输入金额"
          onChange={handleAmountCountChange}
          value={amountCountFen <= 0 ? undefined : amountCountFen / 100}
        />
        <span className={s.error}>数额太大</span>
      </section>
      <section className={s.amountType}>
        <div
          className={amountType === AmountType.paid ? s.notSelect : undefined}
          onTouchStart={() => setAmountType(AmountType.earning)}
        >
          收入项
        </div>
        <div
          className={amountType === AmountType.earning ? s.notSelect : undefined}
          onTouchStart={() => setAmountType(AmountType.paid)}
        >
          支出项
        </div>
      </section>

      <section className={overMaxCount ? s.describeError : s.describe}>
        <textarea
          placeholder="请输入记帐描述"
          value={descContent}
          onChange={(e) => {
            if (e.target.value.length <= MAX_COUNT) {
              setDescCount(e.target.value)
            }
          }}
        />
        <span className={s.count}>{descContent.length}/100</span>
      </section>

      <section className={s.amountTag}>
        {mockTagList.map((item) => (
          <div
            key={item.name}
            className={selectTagName === item.name ? s.selectedTag : s.defaultTag}
            onTouchStart={() => setSelectTagName(item.name)}
          >
            <div>
              <Emoji size="1.5em" shortcodes={item.emoji} />
            </div>
            <span>{item.name}</span>
          </div>
        ))}
      </section>
      <section className={hideAddText ? `${s.addNewTag} ${s.openTagPicker}` : s.addNewTag}>
        {!showTagPicker ? (
          <div
            className={s.addText}
            style={hideAddText ? { opacity: 0 } : undefined}
            onTouchStart={() => {
              setHideAddText(true)
              setTimeout(() => setShowTagPicker(true), 200)
            }}
          >
            <img src={addIcon} alt="addIcon" />
            添加类目
          </div>
        ) : null}
        {hideAddText ? (
          <div className={s.emojiList} style={showTagPicker ? { opacity: 1 } : undefined}>
            <div className={s.tagName}>
              <input type="text" placeholder="请输入类目名（5字）" />
              <button
                onTouchStart={() => {
                  setHideAddText(false)
                  setTimeout(() => setShowTagPicker(false), 200)
                }}
              >
                确定
              </button>
            </div>
            <div className={s.emojiBox}>
              {Array.from(new Set(emojiData.categories.map((item) => item.emojis.map((ele) => ele)).flat())).map(
                (emoji) => (
                  <div
                    className={selectEmoji === emoji ? s.selectedEmoji : s.emoji}
                    onTouchStart={() => setSelectEmoji(emoji)}
                  >
                    <Emoji shortcodes={emoji} size="1.5em" />
                  </div>
                ),
              )}
            </div>
          </div>
        ) : null}
      </section>
    </div>
  )
}

export default AddRecord
