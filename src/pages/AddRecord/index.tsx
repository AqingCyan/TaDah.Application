import React, { useEffect, useMemo, useRef, useState } from 'react'
import dayjs from 'dayjs'
import { history } from 'umi'
import Toast from '@/components/Toast'
import Emoji from '@/components/Emoji'
import TopInfo from '@/components/TopInfo'
import useTheme from '@/hooks/useTheme'
import FormInput from '@/components/FormInput'
import { loadTagList, changeOrSetTag, handleAddRecord } from '@/services/tally'
import emojiData from '@emoji-mart/data'
import addIconGreen from '@/assets/addIconGreen.svg'
import addIconWhite from '@/assets/addIconWhite.svg'
import addIconPurple from '@/assets/addIconPurple.svg'
import s from './index.module.less'
import { tadah } from '@/utils/helpers'

enum AmountType {
  paid = 0,
  earning = 1,
}

const MAX_COUNT = 100

const AddRecord = () => {
  const timer = useRef<NodeJS.Timeout>()

  const { theme, inDark } = useTheme()

  const [emojis, setEmojis] = useState<string[]>([])

  const [tagList, setTagList] = useState<TALLY.TAG[]>([])
  const [amountType, setAmountType] = useState<AmountType>(1)
  const [amountCountFen, setAmountCountFen] = useState<number>(0)
  const [descContent, setDescCount] = useState<string>('')
  const [selectTagName, setSelectTagName] = useState<string>('')
  const [selectTagId, setSelectTagId] = useState<number>(0)
  const [hideAddText, setHideAddText] = useState<boolean>(false)
  const [showTagPicker, setShowTagPicker] = useState<boolean>(false)
  const [selectEmoji, setSelectEmoji] = useState<string>()
  const [editTagName, setEditTagName] = useState<string>('')
  const [shakeTag, setShakeTag] = useState<string | undefined>(undefined)
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

  useEffect(() => {
    loadTagList().then((res) => {
      if (res.data) {
        setTagList(res.data)
      }
    })
  }, [])

  const computeEmojiData = () => {
    const selectedList = Array.from(new Set(tagList.map((item) => item.emojiName)))
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

  useEffect(computeEmojiData, [tagList])

  const overBiggestAmount = useMemo(() => amountCountFen >= 99999999, [amountCountFen])
  const overMaxCount = useMemo(() => descContent.length >= 100, [descContent])
  const addIcon = useMemo(computeAddIcon, [theme, inDark])

  const handleAmountCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if (value === '') {
      setAmountCountFen(0)
      return
    }
    if (/^\d+(\.\d{1,2})?$/.test(value) && value.length <= 10) {
      setAmountCountFen(parseFloat(value) * 100)
    }
  }

  const handleCloseEditModalAndInitData = () => {
    if (editTagName && selectEmoji && editTagName.length <= 5) {
      changeOrSetTag(editTagName, selectEmoji, selectTagId).then((res) => {
        if (res.data) {
          loadTagList().then((res) => {
            if (res.data) {
              setTagList(res.data)
            }
          })
          setSelectTagId(0)
          setEditTagName('')
          setSelectEmoji('')
          setShowEdit(false)
        }
      })
    } else {
      Toast.show('名称不符合要求或未选择emoji')
    }
  }

  const handleEditAmountTag = (item: TALLY.TAG) => {
    setSelectTagId(item.tagId)
    setSelectTagName(item.tagName)
    setEditTagName(item.tagName)
    setSelectEmoji(item.emojiName)
  }

  const renderEmojiPicker = () => (
    <div className={s.emojiList} style={showTagPicker ? { opacity: 1 } : undefined}>
      <div className={s.tagName}>
        <input
          type="text"
          placeholder="请输入类目名（5字）"
          value={editTagName}
          onChange={(e) => setEditTagName(e.target.value.trim())}
        />
        <button
          onTouchStart={() => {
            if (showEdit) {
              handleCloseEditModalAndInitData()
            } else {
              if (selectTagName && selectEmoji && selectTagName.length <= 5) {
                // TODO tagId 这里简单处理一下
                changeOrSetTag(selectTagName, selectEmoji, selectTagId).then((res) => {
                  if (res.data) {
                    setHideAddText(false)
                    setTimeout(() => setShowTagPicker(false), 200)
                    loadTagList().then((res) => {
                      if (res.data) {
                        setTagList(res.data)
                      }
                    })
                  } else {
                    Toast.show('设置错误')
                  }
                })
              } else {
                Toast.show('没有选择emoji或设置名字或名字过长')
              }
            }
          }}
        >
          确定
        </button>
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
    <div className={s.pageContainer} onTouchStart={shakeTag ? () => setShakeTag(undefined) : undefined}>
      <div>
        <TopInfo text={dayjs().format('YYYY年MM月')} />
        <FormInput
          icon={<>¥</>}
          type="number"
          errorText="数额太大"
          placeholder="请输入金额"
          errorStatus={overBiggestAmount}
          onChange={handleAmountCountChange}
          value={amountCountFen <= 0 ? undefined : amountCountFen / 100}
        />
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
          {tagList.map((item) => (
            <div
              key={item.tagName}
              className={`${selectTagId === item.tagId ? s.selectedTag : s.defaultTag} ${
                shakeTag === item.tagName ? s.shakeTag : ''
              }`}
              onTouchStart={(e) => {
                e.stopPropagation()
                // 一直按着不放触发编辑状态
                timer.current = setTimeout(() => {
                  setShakeTag(item.tagName)
                  handleEditAmountTag(item)
                }, 500)
              }}
              onTouchEnd={() => {
                window.clearTimeout(timer.current)
                setSelectTagName(item.tagName)
                setSelectTagId(item.tagId)
              }}
            >
              <div className={s.emojiBox}>
                <Emoji size="1.5em" shortcodes={item.emojiName} />
              </div>
              <div className={s.tagHandlerBox}>
                <div>
                  <span>{item.tagName}</span>
                  <div>
                    <button onClick={() => setShowEdit(true)}>改</button>
                  </div>
                </div>
              </div>
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
        <button
          onClick={() => {
            if (selectTagId && descContent && amountCountFen) {
              handleAddRecord({
                tagId: selectTagId,
                description: descContent,
                year: dayjs().year(),
                month: dayjs().month() + 1,
                amountType,
                count: amountCountFen,
              }).then((res) => {
                if (res.data) {
                  history.push('/accountBook')
                  tadah()
                }
              })
            } else {
              Toast.show('您的信息未写完整')
            }
          }}
        >
          确定记账
        </button>
      </section>
      <section
        className={s.mask}
        style={showEdit ? { background: 'var(--mask-background)' } : { pointerEvents: 'none' }}
        onClick={handleCloseEditModalAndInitData}
      >
        <div
          className={s.editPicker}
          style={showEdit ? { opacity: 1 } : undefined}
          onClick={(e) => e.stopPropagation()}
        >
          <p>编辑/删除</p>
          {renderEmojiPicker()}
        </div>
      </section>
    </div>
  )
}

export default AddRecord
