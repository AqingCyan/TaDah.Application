import React, { useEffect, useMemo, useRef, useState } from 'react'
import Emoji from '@/components/Emoji'
import TopInfo from '@/components/TopInfo'
import emojiData from '@emoji-mart/data'
import useTheme from '@/hooks/useTheme'
import addIconGreen from '@/assets/addIconGreen.svg'
import addIconWhite from '@/assets/addIconWhite.svg'
import addIconPurple from '@/assets/addIconPurple.svg'
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
  const timer = useRef<NodeJS.Timeout>()

  const { theme, inDark } = useTheme()

  const [emojis, setEmojis] = useState<string[]>([])

  const [amountType, setAmountType] = useState<AmountType>(1)
  const [amountCountFen, setAmountCountFen] = useState<number>(0)
  const [descContent, setDescCount] = useState<string>('')
  const [selectTagName, setSelectTagName] = useState<string>('工作开销')
  const [hideAddText, setHideAddText] = useState<boolean>(false)
  const [showTagPicker, setShowTagPicker] = useState<boolean>(false)
  const [selectEmoji, setSelectEmoji] = useState<string>()
  const [editTagName, setEditTagName] = useState<string>('')
  const [showEdit, setShowEdit] = useState<boolean>(false)

  const computeAddIcon = () => {
    switch (theme) {
      case 'green':
        return inDark ? addIconWhite : addIconGreen
      case 'purple':
      default:
        return inDark ? addIconWhite : addIconPurple
    }
  }

  const computeEmojiData = () => {
    const selectedList = mockTagList.map((item) => item.emoji)
    const result = Array.from(
      new Set(
        emojiData.categories
          .map((item) => item.emojis.map((ele) => ele))
          .flat()
          .filter((item) => !selectedList.includes(item)),
      ),
    )
    setEmojis([...selectedList, ...result])
  }

  useEffect(computeEmojiData, [])

  const overBiggestAmount = useMemo(() => amountCountFen >= 2147483647300, [amountCountFen])
  const overMaxCount = useMemo(() => descContent.length >= 100, [descContent])
  const addIcon = useMemo(computeAddIcon, [theme, inDark])

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

  const renderEmojiPicker = (editStatus = false) => (
    <div className={s.emojiList} style={showTagPicker ? { opacity: 1 } : undefined}>
      <div className={s.tagName}>
        <input
          type="text"
          placeholder="请输入类目名（5字）"
          value={editTagName}
          onChange={(e) => setEditTagName(e.target.value)}
        />
        <button
          onTouchStart={() => {
            // TODO 相似，处理
            if (showEdit) {
              setEditTagName('')
              setSelectEmoji('')
              setShowEdit(false)
            } else {
              setHideAddText(false)
              setTimeout(() => setShowTagPicker(false), 200)
            }
          }}
        >
          确定
        </button>
        {editStatus ? (
          <button
            className={s.deleteButton}
            onTouchStart={() => {
              if (showEdit) {
                setEditTagName('')
                setSelectEmoji('')
                setShowEdit(false)
              } else {
                setHideAddText(false)
                setTimeout(() => setShowTagPicker(false), 200)
              }
            }}
          >
            删除
          </button>
        ) : null}
      </div>
      <div className={s.emojiBox}>
        {emojis.map((emoji) => (
          <div className={selectEmoji === emoji ? s.selectedEmoji : s.emoji} onTouchStart={() => setSelectEmoji(emoji)}>
            <Emoji shortcodes={emoji} size="1.5em" />
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className={s.pageContainer}>
      <div>
        <TopInfo date={Date.now()} />
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
              onTouchStart={() => {
                // 一直按着不放触发编辑状态
                timer.current = setTimeout(() => {
                  setShowEdit(true)
                  setSelectTagName(item.name)
                  setEditTagName(item.name)
                  setSelectEmoji(item.emoji)
                }, 500)
              }}
              onTouchEnd={() => {
                window.clearTimeout(timer.current)
                setSelectTagName(item.name)
              }}
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
          {hideAddText ? renderEmojiPicker() : null}
        </section>
      </div>
      <section className={s.submit}>
        <button>确定记账</button>
      </section>
      <section
        className={s.mask}
        style={showEdit ? { background: 'var(--mask-background)' } : { pointerEvents: 'none' }}
      >
        <div className={s.editPicker} style={showEdit ? { opacity: 1 } : undefined}>
          <p>编辑/删除</p>
          {renderEmojiPicker(true)}
        </div>
      </section>
    </div>
  )
}

export default AddRecord
